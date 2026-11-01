import { parseBackup, type BackupFile } from '../../db/backup';
import { db } from '../../db/schema';
import { ErroAutorizacao, type DestinoSync } from './destino';

/**
 * Destino de sincronização no Google Drive: um arquivo só, comprimido, na
 * pasta oculta do app (`appDataFolder`) — não aparece no Drive da pessoa e
 * o app não enxerga nenhum outro arquivo dela. API REST v3 via `fetch`,
 * sem SDK.
 */

const NOME = 'nihongo-study-sync.json.gz';
const API = 'https://www.googleapis.com/drive/v3';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3';
const FILE_ID_KEY = 'driveFileId';

interface Metadados {
  id: string;
  version: string;
}

export function googleDrive(token: string): DestinoSync {
  async function chamar(url: string, init: RequestInit = {}): Promise<Response> {
    // `no-store`: o cache HTTP do navegador pode devolver o arquivo (ou a versão) de antes da última
    // gravação de outro aparelho — e o ciclo mesclaria dados velhos achando que está em dia.
    const res = await fetch(url, {
      ...init,
      cache: 'no-store',
      headers: { ...init.headers, Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) throw new ErroAutorizacao();
    if (!res.ok) throw new Error(`Google Drive respondeu ${res.status}.`);
    return res;
  }

  /** Metadados do arquivo (id em cache em `db.local`; procura pelo nome se não tiver). */
  async function metadados(): Promise<Metadados | null> {
    const cache = (await db.local.get(FILE_ID_KEY))?.value;
    if (typeof cache === 'string') {
      try {
        return await (await chamar(`${API}/files/${cache}?fields=id,version`)).json();
      } catch (err) {
        if (err instanceof ErroAutorizacao) throw err;
        await db.local.delete(FILE_ID_KEY); // apagado em outro aparelho — procura de novo
      }
    }
    const q = encodeURIComponent(`name = '${NOME}' and trashed = false`);
    const { files } = (await (
      await chamar(`${API}/files?spaces=appDataFolder&q=${q}&fields=files(id,version)&orderBy=createdTime`)
    ).json()) as { files: Metadados[] };
    // Dois aparelhos criando o arquivo ao mesmo tempo pode gerar duas cópias: vale sempre a mais antiga.
    const arquivo = files[0] ?? null;
    if (arquivo) await db.local.put({ key: FILE_ID_KEY, value: arquivo.id });
    return arquivo;
  }

  return {
    async versao() {
      return (await metadados())?.version ?? null;
    },

    async baixar() {
      const meta = await metadados();
      if (!meta) return null;
      const res = await chamar(`${API}/files/${meta.id}?alt=media`);
      const texto = await new Response(res.body!.pipeThrough(new DecompressionStream('gzip'))).text();
      return { backup: parseBackup(texto), versao: meta.version };
    },

    async subir(backup: BackupFile) {
      const conteudo = await new Response(
        new Blob([JSON.stringify(backup)]).stream().pipeThrough(new CompressionStream('gzip'))
      ).blob();
      const meta = await metadados();
      if (meta) {
        const res = await chamar(`${UPLOAD}/files/${meta.id}?uploadType=media&fields=id,version`, {
          method: 'PATCH',
          body: conteudo,
        });
        return ((await res.json()) as Metadados).version;
      }
      const corpo = new FormData();
      corpo.append(
        'metadata',
        new Blob([JSON.stringify({ name: NOME, parents: ['appDataFolder'] })], { type: 'application/json' })
      );
      corpo.append('file', conteudo);
      const criado = (await (
        await chamar(`${UPLOAD}/files?uploadType=multipart&fields=id,version`, { method: 'POST', body: corpo })
      ).json()) as Metadados;
      await db.local.put({ key: FILE_ID_KEY, value: criado.id });
      return criado.version;
    },

    async apagar() {
      const meta = await metadados();
      if (meta) await chamar(`${API}/files/${meta.id}`, { method: 'DELETE' });
      await db.local.delete(FILE_ID_KEY);
    },

    async conta() {
      const res = await chamar(`${API}/about?fields=user(emailAddress)`);
      return ((await res.json()) as { user?: { emailAddress?: string } }).user?.emailAddress;
    },
  };
}

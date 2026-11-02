import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { googleDrive } from './googleDrive';
import { ErroAutorizacao } from './destino';
import { limparBanco } from '../../test/banco';
import { umBackup, umCard } from '../../test/fabricas';

/**
 * Adaptador do Google Drive contra uma API falsa (o `fetch` responde como a
 * REST v3 do Drive): arquivo único e comprimido na pasta do app, versão,
 * id em cache, token vencido.
 */
interface Arquivo {
  id: string;
  version: number;
  conteudo: Uint8Array;
  criadoEm: number;
}

class DriveFalso {
  arquivos: Arquivo[] = [];
  tokenValido = 'tok';
  chamadas: string[] = [];

  async responder(url: string, init: RequestInit = {}): Promise<Response> {
    const metodo = init.method ?? 'GET';
    this.chamadas.push(`${metodo} ${url.replace(/^https:\/\/www\.googleapis\.com/, '')}`);
    if ((init.headers as Record<string, string>)?.Authorization !== `Bearer ${this.tokenValido}`) return new Response('', { status: 401 });
    const u = new URL(url);
    const meta = (a: Arquivo) => ({ id: a.id, version: String(a.version) });
    const porId = (id: string) => this.arquivos.find((a) => a.id === id);

    if (u.pathname === '/drive/v3/about') return Response.json({ user: { emailAddress: 'pessoa@exemplo.com' } });
    if (u.pathname === '/drive/v3/files' && metodo === 'GET') {
      expect(u.searchParams.get('spaces')).toBe('appDataFolder');
      return Response.json({ files: [...this.arquivos].sort((a, b) => a.criadoEm - b.criadoEm).map(meta) });
    }
    if (u.pathname === '/upload/drive/v3/files' && metodo === 'POST') {
      const form = init.body as FormData;
      const metadata = JSON.parse(await (form.get('metadata') as Blob).text());
      expect(metadata).toEqual({ name: 'nihongo-study-sync.json.gz', parents: ['appDataFolder'] });
      const novo = { id: `f${this.arquivos.length + 1}`, version: 1, conteudo: new Uint8Array(await (form.get('file') as Blob).arrayBuffer()), criadoEm: this.arquivos.length };
      this.arquivos.push(novo);
      return Response.json(meta(novo));
    }
    const id = u.pathname.split('/').pop()!;
    const arquivo = porId(id);
    if (!arquivo) return new Response('', { status: 404 });
    if (metodo === 'PATCH') {
      arquivo.conteudo = new Uint8Array(await (init.body as Blob).arrayBuffer());
      arquivo.version++;
      return Response.json(meta(arquivo));
    }
    if (metodo === 'DELETE') {
      this.arquivos = this.arquivos.filter((a) => a !== arquivo);
      return new Response(null, { status: 204 });
    }
    if (u.searchParams.get('alt') === 'media') return new Response(new Blob([arquivo.conteudo as BlobPart]));
    return Response.json(meta(arquivo));
  }
}

let drive: DriveFalso;

beforeEach(async () => {
  await limparBanco();
  drive = new DriveFalso();
  vi.stubGlobal('fetch', (url: string, init?: RequestInit) => drive.responder(url, init));
});
afterEach(() => vi.unstubAllGlobals());

describe('googleDrive', () => {
  it('sem arquivo: versão nula, baixar nada; subir cria o arquivo comprimido na pasta do app', async () => {
    const d = googleDrive('tok');
    expect(await d.versao()).toBeNull();
    expect(await d.baixar()).toBeNull();
    const backup = umBackup({ cards: [umCard({ front: 'ねこ' })] });
    expect(await d.subir(backup)).toBe('1');
    // gzip de verdade (começa com 1f 8b) e menor que o JSON
    expect([...drive.arquivos[0].conteudo.slice(0, 2)]).toEqual([0x1f, 0x8b]);
    expect(drive.arquivos[0].conteudo.length).toBeLessThan(JSON.stringify(backup).length);
    const baixado = await d.baixar();
    expect(baixado?.versao).toBe('1');
    expect(baixado?.backup.cards.map((c) => c.front)).toEqual(['ねこ']);
  });

  it('subir de novo atualiza o mesmo arquivo e sobe a versão', async () => {
    const d = googleDrive('tok');
    await d.subir(umBackup());
    expect(await d.subir(umBackup({ cards: [umCard()] }))).toBe('2');
    expect(drive.arquivos).toHaveLength(1);
  });

  it('guarda o id do arquivo e não procura de novo; se sumiu, procura', async () => {
    const d = googleDrive('tok');
    await d.subir(umBackup());
    drive.chamadas = [];
    await d.versao();
    expect(drive.chamadas.filter((c) => c.startsWith('GET /drive/v3/files?'))).toHaveLength(0);
    drive.arquivos = [];
    expect(await d.versao()).toBeNull();
    expect(await db.local.get('driveFileId')).toBeUndefined();
  });

  it('duas cópias (dois aparelhos criando juntos): vale a mais antiga', async () => {
    const d = googleDrive('tok');
    await d.subir(umBackup({ cards: [umCard({ front: 'antigo' })] }));
    await db.local.delete('driveFileId');
    drive.arquivos.push({ ...drive.arquivos[0], id: 'outro', criadoEm: 99 });
    expect((await d.baixar())?.backup.cards[0].front).toBe('antigo');
  });

  it('token vencido vira ErroAutorizacao; outro erro vira mensagem com o status', async () => {
    await expect(googleDrive('velho').versao()).rejects.toBeInstanceOf(ErroAutorizacao);
    vi.stubGlobal('fetch', async () => new Response('', { status: 503 }));
    await expect(googleDrive('tok').conta()).rejects.toThrow('Google Drive respondeu 503.');
  });

  it('apagar remove o arquivo e o id guardado; conta devolve o e-mail', async () => {
    const d = googleDrive('tok');
    await d.subir(umBackup());
    await d.apagar();
    expect(drive.arquivos).toHaveLength(0);
    expect(await db.local.get('driveFileId')).toBeUndefined();
    expect(await d.conta()).toBe('pessoa@exemplo.com');
  });
});

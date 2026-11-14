import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { canShareBackup, downloadBackup, shareBackup } from './arquivo';
import { umBackup, umCard } from '../../test/fabricas';

/**
 * O backup como arquivo do navegador: nome e conteúdo do arquivo baixado e
 * as regras do compartilhamento do sistema (JSON, senão .txt; cancelar não
 * é erro). `document`, `URL` e `navigator` simulados.
 */

const DIA_DO_BACKUP = new Date('2026-03-15T12:00:00Z').getTime();
const backup = umBackup({ exportedAt: DIA_DO_BACKUP, cards: [umCard({ front: 'ねこ' })] });

afterEach(() => vi.unstubAllGlobals());

describe('downloadBackup', () => {
  let link: { href: string; download: string; click: ReturnType<typeof vi.fn> };
  let arquivos: File[];
  let revogados: string[];

  beforeEach(() => {
    link = { href: '', download: '', click: vi.fn() };
    arquivos = [];
    revogados = [];
    vi.stubGlobal('document', { createElement: (tag: string) => (tag === 'a' ? link : undefined) });
    vi.stubGlobal('URL', {
      createObjectURL: (f: File) => (arquivos.push(f), 'blob:teste'),
      revokeObjectURL: (u: string) => revogados.push(u),
    });
  });

  it('baixa um .json com a data do backup no nome e o conteúdo completo, e libera o endereço temporário', async () => {
    downloadBackup(backup);
    expect(link.download).toBe('nihongo-study-2026-03-15.json');
    expect(link.href).toBe('blob:teste');
    expect(link.click).toHaveBeenCalledOnce();
    expect(revogados).toEqual(['blob:teste']);
    expect(arquivos[0].type).toBe('application/json');
    expect(JSON.parse(await arquivos[0].text())).toEqual(backup);
  });
});

describe('compartilhar', () => {
  function navegador(aceita: (f: File) => boolean, share: (dados: { files: File[]; title: string }) => Promise<void> = async () => {}) {
    const compartilhados: { files: File[]; title: string }[] = [];
    vi.stubGlobal('navigator', {
      canShare: ({ files }: { files: File[] }) => aceita(files[0]),
      share: async (dados: { files: File[]; title: string }) => {
        compartilhados.push(dados);
        await share(dados);
      },
    });
    return compartilhados;
  }

  it('navegador sem compartilhamento de arquivo: não oferece, e tentar é erro', async () => {
    vi.stubGlobal('navigator', {});
    expect(canShareBackup()).toBe(false);
    await expect(shareBackup(backup)).rejects.toThrow('Este navegador não compartilha arquivos.');
  });

  it('navegador que não aceita nenhum dos formatos: não oferece', () => {
    navegador(() => false);
    expect(canShareBackup()).toBe(false);
  });

  it('compartilha como .json quando o navegador aceita', async () => {
    const compartilhados = navegador(() => true);
    expect(canShareBackup()).toBe(true);
    expect(await shareBackup(backup)).toBe(true);
    expect(compartilhados[0].title).toBe('nihongo-study-2026-03-15.json');
    expect(JSON.parse(await compartilhados[0].files[0].text())).toEqual(backup);
  });

  it('se o navegador só aceita texto, vai como .txt com o mesmo conteúdo', async () => {
    const compartilhados = navegador((f) => f.type === 'text/plain');
    expect(canShareBackup()).toBe(true);
    await shareBackup(backup);
    expect(compartilhados[0].files[0].name).toBe('nihongo-study-2026-03-15.txt');
    expect(JSON.parse(await compartilhados[0].files[0].text())).toEqual(backup);
  });

  it('a pessoa cancelou: devolve false, sem erro', async () => {
    navegador(
      () => true,
      () => Promise.reject(Object.assign(new Error('cancelado'), { name: 'AbortError' }))
    );
    expect(await shareBackup(backup)).toBe(false);
  });

  it('outra falha do compartilhamento é repassada', async () => {
    navegador(
      () => true,
      () => Promise.reject(new Error('sem permissão'))
    );
    await expect(shareBackup(backup)).rejects.toThrow('sem permissão');
  });
});

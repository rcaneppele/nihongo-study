import { test as base, expect, type Page } from '@playwright/test';
import type { BackupE2E } from './dados';

/**
 * Fixtures dos testes ponta a ponta:
 * - todo teste falha se a página lançar erro não tratado (ou `console.error`);
 * - a fala (Web Speech) é trocada por uma gravação em `window.__falas` — o
 *   navegador headless não tem vozes, e o teste confere o que seria falado;
 * - `app` traz os passos comuns (abrir rota, preparar dados pelo próprio
 *   importar backup do app, ler o que foi falado).
 */

/** Erros conhecidos e inofensivos (ex.: recurso externo bloqueado no ambiente de teste). */
const ERROS_IGNORADOS = [/Failed to load resource/i];

function instalarFalaFalsa() {
  const falas: string[] = [];
  (window as unknown as { __falas: string[] }).__falas = falas;
  class Fala {
    text: string;
    lang = '';
    rate = 1;
    voice: unknown = null;
    onend: (() => void) | null = null;
    onstart: (() => void) | null = null;
    onerror: (() => void) | null = null;
    private ouvintes: Record<string, (() => void)[]> = {};
    constructor(text: string) {
      this.text = text;
    }
    addEventListener(tipo: string, f: () => void) {
      (this.ouvintes[tipo] ??= []).push(f);
    }
    removeEventListener() {}
    disparar(tipo: 'start' | 'end') {
      (tipo === 'end' ? this.onend : this.onstart)?.();
      for (const f of this.ouvintes[tipo] ?? []) f();
    }
  }
  const sintese = {
    speaking: false,
    pending: false,
    paused: false,
    getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true, default: true, voiceURI: 'teste' }],
    speak(u: Fala) {
      falas.push(u.text);
      u.disparar('start');
      setTimeout(() => u.disparar('end'), 20);
    },
    cancel() {},
    pause() {},
    resume() {},
    addEventListener() {},
    removeEventListener() {},
    onvoiceschanged: null,
  };
  Object.defineProperty(window, 'speechSynthesis', { value: sintese, configurable: true });
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: Fala, configurable: true });
}

export class App {
  constructor(readonly page: Page) {}

  /** Abre uma rota do app (sem a base `/nihongo-study/`). */
  async abrir(rota = '/') {
    await this.page.goto(rota.replace(/^\//, ''));
    await expect(this.page.locator('main')).toBeVisible();
  }

  /** Põe os dados no app pelo fluxo real: Configurações › Dados › Importar backup (Substituir). */
  async prepararDados(backup: BackupE2E) {
    await this.abrir('/config');
    await this.page.getByRole('button', { name: 'Substituir' }).click();
    this.page.once('dialog', (d) => d.accept());
    const escolher = this.page.waitForEvent('filechooser');
    await this.page.getByRole('button', { name: 'Importar backup' }).click();
    await (await escolher).setFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) });
    await expect(this.page.getByText(/Backup importado/)).toBeVisible();
  }

  falas(): Promise<string[]> {
    return this.page.evaluate(() => (window as unknown as { __falas: string[] }).__falas ?? []);
  }

  /** Conteúdo atual do banco (IndexedDB) — para conferir o que foi gravado, sem depender só da tela. */
  async lerTabela<T = Record<string, unknown>>(tabela: string): Promise<T[]> {
    return this.page.evaluate(
      (nome) =>
        new Promise<T[]>((resolve, reject) => {
          const req = indexedDB.open('nihongo-study');
          req.onerror = () => reject(req.error);
          req.onsuccess = () => {
            const tx = req.result.transaction(nome, 'readonly');
            const todos = tx.objectStore(nome).getAll();
            todos.onsuccess = () => {
              resolve(todos.result as T[]);
              req.result.close();
            };
            todos.onerror = () => reject(todos.error);
          };
        }),
      tabela
    );
  }
}

export const test = base.extend<{ app: App; errosDaPagina: string[] }>({
  errosDaPagina: [
    async ({ page }, use) => {
      const erros: string[] = [];
      page.on('pageerror', (e) => erros.push(`pageerror: ${e.message}`));
      page.on('console', (m) => {
        if (m.type() === 'error' && !ERROS_IGNORADOS.some((r) => r.test(m.text()))) erros.push(`console.error: ${m.text()}`);
      });
      await use(erros);
      expect(erros, 'erros na página durante o teste').toEqual([]);
    },
    { auto: true },
  ],
  app: async ({ page }, use) => {
    await page.addInitScript(instalarFalaFalsa);
    await use(new App(page));
  },
});

export { expect };

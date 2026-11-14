import { gunzipSync } from 'node:zlib';
import type { BrowserContext } from '@playwright/test';
import type { BackupE2E } from './dados';

/**
 * Google de mentira para o E2E da sincronização: a página de login (que só
 * devolve o navegador ao app com um token) e a API do Drive com um arquivo
 * só, guardado aqui no teste — vários contextos ligados ao mesmo
 * `DriveFalso` são vários aparelhos na mesma conta.
 *
 * A API é trocada dentro da página (`fetch` para `googleapis.com`), e não
 * com `page.route`, porque o corpo dos envios é um Blob/FormData que o
 * Playwright nem sempre entrega à rota.
 */

interface Pedido {
  url: string;
  metodo: string;
  auth?: string;
  corpo: string | null; // base64
}

interface Resposta {
  status: number;
  json?: unknown;
  corpo?: string; // base64
}

export class DriveFalso {
  arquivo: { id: string; version: number; conteudo: string } | null = null;
  /** Token que o "Google" entrega no login e que a API aceita. Trocar simula o acesso vencido. */
  token = 'token-e2e-1';
  /** Com `true`, a renovação silenciosa falha (o Google quer mostrar tela) — só o login com clique passa. */
  exigeInteracao = false;
  conta = 'aluna@exemplo.com';
  chamadas: string[] = [];

  /** O backup que está no Drive agora. */
  conteudo(): BackupE2E | null {
    if (!this.arquivo) return null;
    return JSON.parse(gunzipSync(Buffer.from(this.arquivo.conteudo, 'base64')).toString('utf8'));
  }

  private responder(p: Pedido): Resposta {
    const u = new URL(p.url);
    this.chamadas.push(`${p.metodo} ${u.host}${u.pathname}`);
    if (u.host === 'oauth2.googleapis.com') return { status: 200, json: {} };
    if (p.auth !== `Bearer ${this.token}`) return { status: 401, json: { error: { code: 401 } } };
    const meta = () => ({ id: this.arquivo!.id, version: String(this.arquivo!.version) });

    if (u.pathname === '/drive/v3/about') return { status: 200, json: { user: { emailAddress: this.conta } } };
    if (u.pathname === '/drive/v3/files') return { status: 200, json: { files: this.arquivo ? [meta()] : [] } };
    if (u.pathname === '/upload/drive/v3/files' && p.metodo === 'POST') {
      this.arquivo = { id: 'arquivo-1', version: 1, conteudo: p.corpo ?? '' };
      return { status: 200, json: meta() };
    }
    if (!this.arquivo || u.pathname.split('/').pop() !== this.arquivo.id) return { status: 404, json: {} };
    if (p.metodo === 'PATCH') {
      this.arquivo = { ...this.arquivo, version: this.arquivo.version + 1, conteudo: p.corpo ?? '' };
      return { status: 200, json: meta() };
    }
    if (p.metodo === 'DELETE') {
      this.arquivo = null;
      return { status: 204 };
    }
    if (u.searchParams.get('alt') === 'media') return { status: 200, corpo: this.arquivo.conteudo };
    return { status: 200, json: meta() };
  }

  /** Liga este "aparelho" (contexto do navegador) ao Google de mentira. */
  async ligar(contexto: BrowserContext): Promise<void> {
    // Login: a página do Google devolve o navegador ao app na hora, com o token (ou com erro, na renovação silenciosa).
    await contexto.route('https://accounts.google.com/**', (rota) => {
      const pedido = new URL(rota.request().url()).searchParams;
      const silencioso = pedido.get('prompt') === 'none';
      const resposta =
        silencioso && this.exigeInteracao
          ? new URLSearchParams({ error: 'interaction_required', state: pedido.get('state') ?? '' })
          : new URLSearchParams({ access_token: this.token, token_type: 'Bearer', expires_in: '3600', state: pedido.get('state') ?? '' });
      const volta = `${pedido.get('redirect_uri')}#${resposta}`;
      return rota.fulfill({ contentType: 'text/html', body: `<script>location.replace(${JSON.stringify(volta)})</script>` });
    });
    await contexto.exposeBinding('__driveFalso', (_origem, pedido: Pedido) => this.responder(pedido));
    await contexto.addInitScript(() => {
      const fetchReal = window.fetch.bind(window);
      const paraBase64 = async (b: Blob) => {
        const bytes = new Uint8Array(await b.arrayBuffer());
        let s = '';
        for (const x of bytes) s += String.fromCharCode(x);
        return btoa(s);
      };
      const deBase64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
      window.fetch = async (entrada, init = {}) => {
        const url = String(entrada instanceof Request ? entrada.url : entrada);
        if (!/^https:\/\/(www|oauth2)\.googleapis\.com\//.test(url)) return fetchReal(entrada, init);
        const corpo = init.body instanceof FormData ? init.body.get('file') : init.body;
        const pedido = {
          url,
          metodo: init.method ?? 'GET',
          auth: (init.headers as Record<string, string> | undefined)?.Authorization,
          corpo: corpo instanceof Blob ? await paraBase64(corpo) : null,
        };
        const r = await (window as unknown as { __driveFalso: (p: unknown) => Promise<{ status: number; json?: unknown; corpo?: string }> }).__driveFalso(pedido);
        if (r.corpo !== undefined) return new Response(deBase64(r.corpo), { status: r.status });
        if (r.status === 204) return new Response(null, { status: 204 });
        return new Response(JSON.stringify(r.json ?? {}), { status: r.status, headers: { 'Content-Type': 'application/json' } });
      };
    });
  }
}

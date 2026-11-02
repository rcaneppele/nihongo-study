import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { limparBanco } from '../../test/banco';
import { ArmazenamentoEmMemoria } from '../../test/aparelhos';

// O Client ID é lido do ambiente quando o módulo carrega.
vi.hoisted(() => vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'client-id-de-teste'));

const { entrarNoGoogle, esquecerToken, processarRetornoOAuth, revogarAcesso, tokenAtual } = await import('./googleAuth');

/**
 * Login com o Google por redirecionamento: o que sai daqui (endereço do
 * Google, `state` guardado) e o que se aceita na volta (só a resposta ao
 * pedido que este app fez). Endereço, histórico e `sessionStorage`
 * simulados; relógio falso.
 */

const ORIGEM = 'https://app.exemplo';
const BASE = import.meta.env.BASE_URL;
const MINUTO = 60 * 1000;

let destinos: string[];
let enderecos: string[];
let sessao: ArmazenamentoEmMemoria;
let local: { origin: string; pathname: string; search: string; hash: string; assign: (url: string) => void };

/** Sai pro Google estando em `rota` e devolve os parâmetros do endereço do Google. */
function sairPara(rota: string, silencioso = false, conta?: string): URLSearchParams {
  const [pathname, search = ''] = rota.split('?');
  local.pathname = BASE.slice(0, -1) + pathname;
  local.search = search ? `?${search}` : '';
  entrarNoGoogle(silencioso, conta);
  return new URL(destinos.at(-1)!).searchParams;
}

/** O Google devolve o navegador ao app com `resposta` no endereço. */
function voltarCom(resposta: Record<string, string>) {
  local.pathname = BASE;
  local.search = '';
  local.hash = `#${new URLSearchParams(resposta)}`;
}

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-11-02T10:00:00'));
  await limparBanco();
  destinos = [];
  enderecos = [];
  sessao = new ArmazenamentoEmMemoria();
  local = { origin: ORIGEM, pathname: BASE, search: '', hash: '', assign: (url) => void destinos.push(url) };
  vi.stubGlobal('location', local);
  vi.stubGlobal('sessionStorage', sessao);
  vi.stubGlobal('history', { replaceState: (_s: unknown, _t: string, url: string) => void enderecos.push(url) });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('entrarNoGoogle', () => {
  it('vai ao Google pedindo só a pasta do app, com escolha de conta e um state novo', () => {
    const params = sairPara('/config');
    expect(destinos[0]).toMatch(/^https:\/\/accounts\.google\.com\/o\/oauth2\/v2\/auth\?/);
    expect(Object.fromEntries(params)).toMatchObject({
      client_id: 'client-id-de-teste',
      redirect_uri: `${ORIGEM}${BASE}`,
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/drive.appdata',
      include_granted_scopes: 'true',
      prompt: 'select_account',
    });
    expect(params.get('state')).toMatch(/^[0-9a-f-]{36}$/);
    expect(params.has('login_hint')).toBe(false);
  });

  it('renovação silenciosa: sem tela, sugerindo a conta conectada', () => {
    const params = sairPara('/aprender', true, 'pessoa@exemplo.com');
    expect(params.get('prompt')).toBe('none');
    expect(params.get('login_hint')).toBe('pessoa@exemplo.com');
  });

  it('cada ida ao Google tem um state diferente', () => {
    const a = sairPara('/').get('state');
    const b = sairPara('/').get('state');
    expect(a).not.toBe(b);
  });
});

describe('processarRetornoOAuth', () => {
  it('endereço sem resposta do Google: nada a fazer', async () => {
    sairPara('/config'); // um login pendente não deve ser consumido por uma abertura normal
    local.hash = '#outra-coisa';
    expect(await processarRetornoOAuth()).toBeNull();
    expect(sessao.getItem('nihongo-study:oauth')).not.toBeNull();
    expect(enderecos).toEqual([]);
  });

  it('token com o state certo: guarda o token, limpa o endereço e volta pra tela de onde saiu', async () => {
    const state = sairPara('/config?aba=dados').get('state')!;
    voltarCom({ access_token: 'tok-1', expires_in: '1800', state });
    expect(await processarRetornoOAuth()).toEqual({ ok: true, silencioso: false });
    expect(enderecos).toEqual([`${BASE.slice(0, -1)}/config?aba=dados`]);
    expect(await db.local.get('googleToken')).toEqual({
      key: 'googleToken',
      value: { accessToken: 'tok-1', expiresAt: Date.now() + 30 * MINUTO },
    });
    expect(sessao.getItem('nihongo-study:oauth')).toBeNull();
  });

  it('sem `expires_in`, o token vale 1 hora', async () => {
    const state = sairPara('/').get('state')!;
    voltarCom({ access_token: 'tok-1', state });
    await processarRetornoOAuth();
    vi.setSystemTime(Date.now() + 57 * MINUTO);
    expect(await tokenAtual()).toBe('tok-1');
    vi.setSystemTime(Date.now() + MINUTO + 1);
    expect(await tokenAtual()).toBeNull();
  });

  it('volta silenciosa: o resultado diz que foi silenciosa', async () => {
    const state = sairPara('/aprender', true).get('state')!;
    voltarCom({ access_token: 'tok-1', state });
    expect(await processarRetornoOAuth()).toEqual({ ok: true, silencioso: true });
  });

  it('o Google recusou: devolve o código de erro e não guarda token', async () => {
    const state = sairPara('/', true).get('state')!;
    voltarCom({ error: 'interaction_required', state });
    expect(await processarRetornoOAuth()).toEqual({ ok: false, silencioso: true, erro: 'interaction_required' });
    expect(await tokenAtual()).toBeNull();
  });

  it('state diferente do que saiu daqui: ignora o token (não foi este app que pediu) e limpa o endereço', async () => {
    sairPara('/config');
    voltarCom({ access_token: 'tok-forjado', state: 'outro-state' });
    expect(await processarRetornoOAuth()).toBeNull();
    expect(await tokenAtual()).toBeNull();
    expect(enderecos).toEqual([BASE]);
  });

  it('resposta do Google sem nenhum login pendente aqui: ignora', async () => {
    voltarCom({ access_token: 'tok-forjado', state: 'qualquer' });
    expect(await processarRetornoOAuth()).toBeNull();
    expect(await tokenAtual()).toBeNull();
  });

  it('a mesma resposta não vale duas vezes', async () => {
    const state = sairPara('/').get('state')!;
    voltarCom({ access_token: 'tok-1', state });
    await processarRetornoOAuth();
    await esquecerToken();
    expect(await processarRetornoOAuth()).toBeNull();
    expect(await tokenAtual()).toBeNull();
  });
});

describe('tokenAtual', () => {
  async function tokenQueVenceEm(ms: number) {
    await db.local.put({ key: 'googleToken', value: { accessToken: 'tok', expiresAt: Date.now() + ms } });
  }

  it('sem token: null', async () => {
    expect(await tokenAtual()).toBeNull();
  });

  it('não usa um token que vence nos próximos 2 minutos (venceria no meio da sincronização)', async () => {
    await tokenQueVenceEm(2 * MINUTO + 1);
    expect(await tokenAtual()).toBe('tok');
    await tokenQueVenceEm(2 * MINUTO - 1);
    expect(await tokenAtual()).toBeNull();
  });
});

describe('revogarAcesso', () => {
  it('esquece o token e pede ao Google para revogar', async () => {
    const pedidos: { url: string; token: string | null }[] = [];
    vi.stubGlobal('fetch', async (url: string, init: { body: URLSearchParams }) => {
      pedidos.push({ url, token: init.body.get('token') });
      return new Response();
    });
    await db.local.put({ key: 'googleToken', value: { accessToken: 'tok', expiresAt: Date.now() + 60 * MINUTO } });
    await revogarAcesso();
    expect(await db.local.get('googleToken')).toBeUndefined();
    expect(pedidos).toEqual([{ url: 'https://oauth2.googleapis.com/revoke', token: 'tok' }]);
  });

  it('sem internet: esquece o token mesmo assim, sem erro', async () => {
    vi.stubGlobal('fetch', async () => Promise.reject(new TypeError('Failed to fetch')));
    await db.local.put({ key: 'googleToken', value: { accessToken: 'tok', expiresAt: Date.now() + 60 * MINUTO } });
    await expect(revogarAcesso()).resolves.toBeUndefined();
    expect(await db.local.get('googleToken')).toBeUndefined();
  });

  it('sem token válido: não chama o Google', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    await revogarAcesso();
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('sem Client ID (build sem sincronização)', () => {
  it('não há como ir ao Google', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', '');
    const semId = await import('./googleAuth');
    expect(semId.CLIENT_ID).toBeUndefined();
    expect(() => semId.entrarNoGoogle()).toThrow(/não configurada/);
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'client-id-de-teste');
  });
});

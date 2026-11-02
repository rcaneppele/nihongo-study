import { db } from '../../db/schema';

/**
 * Login com o Google feito à mão, por redirecionamento (fluxo de token do
 * OAuth 2.0 para apps no navegador) — sem o script do Google Identity
 * Services, que viria de CDN, e sem popup, que não volta pro app instalado
 * em alguns celulares (ver docs/proposta-sincronizacao.md).
 *
 * Sem servidor, o Google só entrega um token de ~1 hora, sem como renovar
 * em segundo plano. Renovar é passar de novo pela página do Google: se a
 * pessoa continua logada e já autorizou, ela volta na hora, sem tela
 * nenhuma (`prompt=none`).
 */

export const CLIENT_ID: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID || undefined;
/** Só a pasta oculta do app no Drive — o app não enxerga nenhum outro arquivo. */
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const TOKEN_KEY = 'googleToken';
const PENDENTE_KEY = 'nihongo-study:oauth'; // sessionStorage: o que esperar na volta do Google
/** Margem pra não usar um token que vence no meio da sincronização. */
const MARGEM_MS = 2 * 60 * 1000;

interface Token {
  accessToken: string;
  expiresAt: number;
}

interface LoginPendente {
  state: string;
  retorno: string; // caminho do app pra onde voltar
  silencioso: boolean;
}

/** Resultado da volta do Google, lido uma vez ao abrir o app (ver `processarRetornoOAuth`). */
export type RetornoOAuth = { ok: true; silencioso: boolean } | { ok: false; silencioso: boolean; erro: string } | null;

function redirectUri(): string {
  return `${location.origin}${import.meta.env.BASE_URL}`;
}

/**
 * Sai do app para a página do Google. `silencioso`: não mostra tela se der
 * pra evitar — falha (e volta com erro) se precisar de login ou
 * autorização. `conta`: o e-mail já conectado — sem ele, com mais de uma
 * conta Google no navegador, a renovação silenciosa falha (o Google não
 * sabe qual usar e pede pra escolher).
 */
export function entrarNoGoogle(silencioso = false, conta?: string): void {
  if (!CLIENT_ID) throw new Error('Sincronização com o Google não configurada nesta versão.');
  const pendente: LoginPendente = {
    state: crypto.randomUUID(),
    retorno: location.pathname + location.search,
    silencioso,
  };
  sessionStorage.setItem(PENDENTE_KEY, JSON.stringify(pendente));
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri(),
    response_type: 'token',
    scope: SCOPE,
    state: pendente.state,
    include_granted_scopes: 'true',
    prompt: silencioso ? 'none' : 'select_account',
  });
  if (conta) params.set('login_hint', conta);
  location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

/**
 * Lê a resposta do Google no endereço (`#access_token=…` ou `#error=…`),
 * guarda o token e limpa o endereço, voltando pra página de onde saiu.
 * Chamado em `main.tsx` antes do app montar.
 */
export async function processarRetornoOAuth(): Promise<RetornoOAuth> {
  const hash = new URLSearchParams(location.hash.slice(1));
  if (!hash.has('access_token') && !hash.has('error')) return null;
  const salvo = sessionStorage.getItem(PENDENTE_KEY);
  sessionStorage.removeItem(PENDENTE_KEY);
  const pendente: LoginPendente | null = salvo ? JSON.parse(salvo) : null;
  // Sem o `state` que saiu daqui, não foi este app que pediu — ignora.
  if (!pendente || hash.get('state') !== pendente.state) {
    history.replaceState(null, '', location.pathname + location.search);
    return null;
  }
  history.replaceState(null, '', pendente.retorno);

  const accessToken = hash.get('access_token');
  if (!accessToken) return { ok: false, silencioso: pendente.silencioso, erro: hash.get('error') ?? 'erro' };
  const expiresIn = Number(hash.get('expires_in') ?? 3600);
  const token: Token = { accessToken, expiresAt: Date.now() + expiresIn * 1000 };
  await db.local.put({ key: TOKEN_KEY, value: token });
  return { ok: true, silencioso: pendente.silencioso };
}

/** Token ainda válido, ou `null` se venceu (ou nunca houve). */
export async function tokenAtual(): Promise<string | null> {
  const token = (await db.local.get(TOKEN_KEY))?.value as Token | undefined;
  if (!token || token.expiresAt - MARGEM_MS < Date.now()) return null;
  return token.accessToken;
}

export async function esquecerToken(): Promise<void> {
  await db.local.delete(TOKEN_KEY);
}

/** Desconecta: revoga a autorização no Google (se der) e esquece o token. */
export async function revogarAcesso(): Promise<void> {
  const token = await tokenAtual();
  await esquecerToken();
  if (token) {
    await fetch('https://oauth2.googleapis.com/revoke', { method: 'POST', body: new URLSearchParams({ token }) }).catch(
      () => {}
    );
  }
}

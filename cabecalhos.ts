/**
 * Cabeçalhos de segurança do app — fonte única. O `vite.config.ts` gera o
 * `_headers` do Cloudflare Pages a partir daqui e usa os mesmos no
 * `vite preview`, que é o que o E2E abre: se uma regra quebrar o app, os
 * testes quebram antes do deploy.
 *
 * A Content-Security-Policy é a defesa principal do token do Google (que
 * fica no IndexedDB): mesmo que um dia algum conteúdo injetado chegue à
 * página, ele não roda script de fora nem manda dados para outro endereço.
 * Só entram aqui as origens que o app realmente usa — ao integrar um
 * serviço novo, a origem dele precisa ser liberada aqui.
 */

const CSP = [
  "default-src 'self'",
  // Sem 'unsafe-inline': o único script que era inline (tema antes do primeiro paint) virou public/tema.js.
  "script-src 'self'",
  // Estilos inline: a página estática de privacidade tem um <style>; estilo não executa código.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Google Drive (arquivo de sincronização) e revogação do acesso. O login é navegação, não passa por aqui.
  "connect-src 'self' https://www.googleapis.com https://oauth2.googleapis.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// Sem Cross-Origin-Opener-Policy de propósito: o app não abre nem é aberto por janelas de outra origem
// (o login do Google é redirecionamento), então o ganho seria marginal — e ele troca o processo da aba a
// cada navegação, o que derruba a emulação de tema do Playwright no Firefox (os testes deixariam de usar
// os mesmos cabeçalhos da produção).
export const CABECALHOS: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

/** Conteúdo do arquivo `_headers` do Cloudflare Pages. */
export function arquivoHeaders(): string {
  const linhas = Object.entries(CABECALHOS).map(([nome, valor]) => `  ${nome}: ${valor}`);
  return [
    '# Gerado por vite.config.ts a partir de cabecalhos.ts — não edite à mão.',
    '/*',
    ...linhas,
    '',
    // O leitor de PDF embutido do navegador é barrado por `object-src 'none'` em alguns navegadores.
    '/manual-do-usuario.pdf',
    '  ! Content-Security-Policy',
    '',
  ].join('\n');
}

/** Canais públicos do projeto — fonte única para a tela Sobre e para reportar erros. */
export const EMAIL_CONTATO = 'nihongostudyapp@gmail.com';
export const REPO_URL = 'https://github.com/rcaneppele/nihongo-study';
export const ISSUES_URL = `${REPO_URL}/issues`;
export const AVISOS_TERCEIROS_URL = `${REPO_URL}/blob/main/THIRD_PARTY_NOTICES.md`;

/** E-mail já preenchido para reportar um erro: a versão evita a primeira pergunta de todo relato. */
export function linkRelatarErro(versao: string): string {
  const assunto = `Erro no Nihongo Study (v${versao})`;
  const corpo = `O que aconteceu:\n\nEm qual tela ou lição:\n\nO que era o certo (se souber):\n\n---\nVersão do app: ${versao}`;
  return `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}

/**
 * Telas sem sessão de estudo em andamento (Início, hubs, Progresso,
 * Configurações, lista de lições): recarregar a página ali não perde nada.
 * Revisar fica de fora — a Revisão do dia roda dentro da própria rota —,
 * assim como as telas de treino, leitura e exercícios.
 *
 * Usado por tudo que recarrega ou sai da página sozinho: a renovação do
 * login do Google (`features/sync/motor.ts`) e a atualização do app
 * (`pwaUpdate.ts`).
 */
const TELA_SEM_SESSAO = /^\/(aprender|praticar(\/[^/]+)?|progresso|config|licoes)?\/?$/;

export function telaSemSessao(caminho: string = location.pathname): boolean {
  const rota = caminho.slice(import.meta.env.BASE_URL.length - 1);
  return TELA_SEM_SESSAO.test(rota);
}

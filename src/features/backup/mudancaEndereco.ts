/**
 * O app mudou para nihongostudy.app, mas o endereço antigo continua no ar: o
 * navegador guarda os dados por endereço, então o progresso de quem ainda não
 * migrou está lá e só sai pelo Google Drive ou por backup (ver `regras-negocio.md` §6).
 */
export const NOVO_ENDERECO = 'https://nihongostudy.app/';
const HOST_ANTIGO = 'rcaneppele.github.io';

export function estaNoEnderecoAntigo(host: string): boolean {
  return host === HOST_ANTIGO;
}

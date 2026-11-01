/**
 * Layout dos cards de destaque com ícone + texto + botão (Revisão do dia,
 * Próximo passo, Pontos fracos), num `flex flex-wrap`. O grupo ícone+texto
 * tem largura mínima: quando o texto é longo ou a tela é estreita, o botão
 * desce pra linha de baixo (ocupando a largura toda no celular) em vez de
 * espremer o texto numa coluna de uma palavra por linha.
 */
export const HERO_TEXTO = 'flex min-w-0 flex-1 basis-72 items-center gap-4';
export const HERO_BOTAO = 'btn-dark max-sm:w-full';

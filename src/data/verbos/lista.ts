import type { GrupoVerbo } from './conjugacao';

/**
 * Lista de referência da lição de verbos: os verbos que o sensei passou em
 * aula (fotos do quadro), mesma seleção e mesmo agrupamento. As traduções
 * seguem as do quadro; quando ele resume um uso que costuma gerar erro
 * (きえる, por exemplo), a tradução deixa o sentido explícito.
 *
 * `disfarcado`: termina em -iru/-eru, mas é Grupo 1.
 */
export interface VerboReferencia {
  dicionario: string;
  romaji: string;
  pt: string;
  grupo: GrupoVerbo;
  disfarcado?: boolean;
}

function grupo1(dicionario: string, romaji: string, pt: string, disfarcado?: boolean): VerboReferencia {
  return { dicionario, romaji, pt, grupo: 1, ...(disfarcado ? { disfarcado } : {}) };
}

function grupo2(dicionario: string, romaji: string, pt: string): VerboReferencia {
  return { dicionario, romaji, pt, grupo: 2 };
}

/** Grupo 1 organizado pela terminação, que é o que decide a forma て. */
export const VERBOS_GRUPO_1: VerboReferencia[] = [
  grupo1('あう', 'au', 'encontrar (alguém)'),
  grupo1('かう', 'kau', 'comprar'),
  grupo1('いう', 'iu', 'dizer'),
  grupo1('かく', 'kaku', 'escrever'),
  grupo1('きく', 'kiku', 'ouvir; perguntar'),
  grupo1('いく', 'iku', 'ir'),
  grupo1('およぐ', 'oyogu', 'nadar'),
  grupo1('はなす', 'hanasu', 'falar, conversar'),
  grupo1('ころす', 'korosu', 'matar'),
  grupo1('まつ', 'matsu', 'esperar'),
  grupo1('もつ', 'motsu', 'segurar; possuir'),
  grupo1('しぬ', 'shinu', 'morrer'),
  grupo1('あそぶ', 'asobu', 'brincar, divertir-se'),
  grupo1('のむ', 'nomu', 'beber'),
  grupo1('よむ', 'yomu', 'ler'),
  grupo1('やすむ', 'yasumu', 'descansar; faltar (à aula, ao trabalho)'),
  grupo1('かえる', 'kaeru', 'voltar', true),
  grupo1('はいる', 'hairu', 'entrar', true),
  grupo1('はしる', 'hashiru', 'correr', true),
  grupo1('ある', 'aru', 'existir, haver (coisas)'),
  grupo1('わかる', 'wakaru', 'entender'),
  grupo1('つくる', 'tsukuru', 'preparar, produzir'),
  grupo1('とる', 'toru', 'pegar; tirar; tomar'),
  grupo1('おわる', 'owaru', 'terminar'),
  grupo1('のる', 'noru', 'subir, embarcar (em veículo)'),
];

export const VERBOS_GRUPO_2: VerboReferencia[] = [
  grupo2('たべる', 'taberu', 'comer'),
  grupo2('みる', 'miru', 'ver, assistir'),
  grupo2('おきる', 'okiru', 'acordar, levantar-se'),
  grupo2('ねる', 'neru', 'dormir'),
  grupo2('いる', 'iru', 'existir, estar (pessoas e animais)'),
  grupo2('おりる', 'oriru', 'descer, desembarcar'),
  grupo2('あける', 'akeru', 'abrir'),
  grupo2('しめる', 'shimeru', 'fechar'),
  grupo2('おしえる', 'oshieru', 'ensinar, informar'),
  grupo2('わすれる', 'wasureru', 'esquecer'),
  grupo2('でる', 'deru', 'sair'),
  grupo2('いれる', 'ireru', 'colocar (dentro de algo)'),
  grupo2('つける', 'tsukeru', 'ligar, acender'),
  grupo2('きえる', 'kieru', 'apagar-se, desaparecer'),
  grupo2('あびる', 'abiru', 'tomar (banho de chuveiro)'),
  grupo2('できる', 'dekiru', 'poder, conseguir'),
  grupo2('つかれる', 'tsukareru', 'cansar-se'),
];

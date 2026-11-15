import { kanaParaRomaji } from '../lib/romaji';

/**
 * Confere se um romaji escrito à mão corresponde ao kana ao lado — para os
 * testes de integridade do conteúdo (um kana a mais ou a menos numa frase
 * de exemplo passa despercebido na revisão, mas não aqui).
 *
 * Compara sem espaços nem pontuação e aceita o que muda entre a escrita e
 * a fala: partículas は ("wa"), へ ("e") e を ("o").
 */

const PONTUACAO = /[\s。、！？!?「」『』…・〜～（）()[\]／/,.:;"'“”‘’＿_→—–-]/g;

/** `null` quando não dá para conferir (kanji, números ou letras latinas no texto japonês). */
export function romajiConfere(japones: string, romaji: string): boolean | null {
  const kana = japones.replace(PONTUACAO, '');
  if (!/^[ぁ-ゖァ-ヺー]+$/.test(kana)) return null;
  // Uma sílaba por vez, para as partículas poderem ter duas leituras.
  const padrao = [...kana]
    .map((c, i, todos) => {
      if ('ゃゅょぁぃぅぇぉャュョァィゥェォ'.includes(c) || c === 'ー') return ''; // já entrou com o kana anterior
      let unidade = c;
      for (let j = i + 1; j < todos.length && ('ゃゅょぁぃぅぇぉャュョァィゥェォ'.includes(todos[j]) || todos[j] === 'ー'); j++) unidade += todos[j];
      if (c === 'っ' || c === 'ッ') return '[a-z]';
      const letras = kanaParaRomaji(unidade).replace("'", '');
      if (unidade === 'は') return '(?:ha|wa)';
      if (unidade === 'へ') return '(?:he|e)';
      if (unidade === 'を') return '(?:o|wo)';
      return letras;
    })
    .join('');
  return new RegExp(`^${padrao}$`).test(romaji.toLowerCase().replace(PONTUACAO, ''));
}

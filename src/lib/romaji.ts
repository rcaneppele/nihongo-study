/**
 * Kana → romaji, para mostrar a leitura em letras latinas de uma palavra
 * que só temos em kana (o aluno ainda está aprendendo a ler kana).
 *
 * Segue a convenção das lições (docs/padrao-licoes.md), que é a de quem
 * digita japonês: cada kana vira sempre as mesmas letras, sem mácron —
 * vogal longa por extenso ("dou", "imouto"), `ー` repetindo a vogal
 * ("koohii"), `っ` dobrando a consoante seguinte ("kitte", "acchi"). Assim o
 * romaji mostra exatamente quais kana a palavra tem. `ん` antes de vogal
 * ganha apóstrofo ("kin'en"), pra não ser lido como な/に/ぬ/ね/の. O que não
 * é kana passa direto.
 */

const BASE: Record<string, string> = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ゔ: 'vu',
};

const PEQUENO_Y: Record<string, string> = { ゃ: 'a', ゅ: 'u', ょ: 'o' };
const PEQUENA_VOGAL: Record<string, string> = { ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o' };
/** Kana + vogal pequena dos empréstimos (ファ, ティ, ウィ…): a consoante que fica antes da vogal. */
const ANTES_DA_VOGAL: Record<string, string> = {
  ふ: 'f', て: 't', で: 'd', う: 'w', ゔ: 'v', し: 'sh', ち: 'ch', じ: 'j', つ: 'ts', と: 't', ど: 'd',
};

/** Katakana → hiragana (os dois blocos têm o mesmo desenho, 0x60 de distância). */
function emHiragana(c: string): string {
  const codigo = c.charCodeAt(0);
  return codigo >= 0x30a1 && codigo <= 0x30f6 ? String.fromCharCode(codigo - 0x60) : c;
}

export function kanaParaRomaji(kana: string): string {
  const chars = [...kana].map(emHiragana);
  let saida = '';
  let dobrar = false; // um `っ` esperando a consoante seguinte

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const proximo = chars[i + 1];

    if (c === 'っ') {
      dobrar = true;
      continue;
    }
    if (c === 'ー') {
      const ultima = saida.at(-1) ?? '';
      if ('aiueo'.includes(ultima)) saida += ultima;
      continue;
    }

    let silaba = BASE[c];
    if (silaba === undefined) {
      // Não é kana (pontuação, ～, espaço, latim): passa direto.
      saida += c;
      dobrar = false;
      continue;
    }

    if (proximo && PEQUENO_Y[proximo] && silaba.endsWith('i')) {
      const inicio = silaba.slice(0, -1);
      silaba = (/^(sh|ch|j)$/.test(inicio) ? inicio : `${inicio}y`) + PEQUENO_Y[proximo];
      i++;
    } else if (proximo && PEQUENA_VOGAL[proximo] && ANTES_DA_VOGAL[c]) {
      silaba = ANTES_DA_VOGAL[c] + PEQUENA_VOGAL[proximo];
      i++;
    } else if (c === 'ん' && proximo && /^[aiueo]/.test(BASE[proximo] ?? '')) {
      silaba = "n'"; // かんい "kan'i", não "kani"
    }

    if (dobrar) {
      saida += silaba[0];
      dobrar = false;
    }
    saida += silaba;
  }
  return saida;
}

const KANA = /^[ぁ-ゖァ-ヺー]+$/;

/** O texto é só kana (hiragana, katakana e `ー`)? */
export function soKana(texto: string): boolean {
  return KANA.test(texto);
}

/** O texto tem algum kanji? */
export function temKanji(texto: string): boolean {
  return /[\u4e00-\u9fff々]/.test(texto);
}

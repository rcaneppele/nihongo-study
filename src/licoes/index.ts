import type { ComponentType } from 'react';
import type { QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';
import type { FraseEstruturada } from '../data/quiz/types';

export interface LicaoMeta {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  tags: string[];
}

export interface LicaoEntry {
  meta: LicaoMeta;
  Component: ComponentType;
  quiz?: QuizLicao;
  /** Grupos nomeados de ditado, selecionáveis separadamente no Kakitori — ver `GrupoKakitori`.
   * Lições sem `kakitori` simplesmente não aparecem no Kakitori (ver `data/kakitori/gerador.ts`). */
  kakitori?: GrupoKakitori[];
  /** Frases extras do "Diga em japonês" (além das `quiz.frases`) — ver `src/features/diga/`. */
  diga?: FraseEstruturada[];
}

import Kana, { meta as metaKana, quiz as quizKana } from './kana';
import KoSoADo, { meta as metaKoSoADo, quiz as quizKoSoADo, kakitori as kakitoriKoSoADo, diga as digaKoSoADo } from './kosoado';
import Particulas, { meta as metaParticulas, quiz as quizParticulas, diga as digaParticulas } from './particulas';
import Familia, { meta as metaFamilia, quiz as quizFamilia, kakitori as kakitoriFamilia, diga as digaFamilia } from './familia';
import Apresentacao, {
  meta as metaApresentacao,
  quiz as quizApresentacao,
  kakitori as kakitoriApresentacao,
  diga as digaApresentacao,
} from './apresentacao';
import Aisatsu, { meta as metaAisatsu, quiz as quizAisatsu, kakitori as kakitoriAisatsu, diga as digaAisatsu } from './aisatsu';
import Sufixos, { meta as metaSufixos, quiz as quizSufixos, kakitori as kakitoriSufixos, diga as digaSufixos } from './sufixos';
import Pronomes, { meta as metaPronomes, quiz as quizPronomes, kakitori as kakitoriPronomes, diga as digaPronomes } from './pronomes';
import Verbos, { meta as metaVerbos, quiz as quizVerbos, diga as digaVerbos } from './verbos';
import Desu, { meta as metaDesu, quiz as quizDesu, diga as digaDesu } from './desu';
import Seikatsu, { meta as metaSeikatsu, quiz as quizSeikatsu, kakitori as kakitoriSeikatsu, diga as digaSeikatsu } from './seikatsu';
import Kanji, { meta as metaKanji, quiz as quizKanji, kakitori as kakitoriKanji, diga as digaKanji } from './kanji';

export const LICOES: LicaoEntry[] = [
  { meta: metaKana, Component: Kana, quiz: quizKana },
  { meta: metaAisatsu, Component: Aisatsu, quiz: quizAisatsu, kakitori: kakitoriAisatsu, diga: digaAisatsu },
  { meta: metaDesu, Component: Desu, quiz: quizDesu, diga: digaDesu },
  { meta: metaApresentacao, Component: Apresentacao, quiz: quizApresentacao, kakitori: kakitoriApresentacao, diga: digaApresentacao },
  { meta: metaSufixos, Component: Sufixos, quiz: quizSufixos, kakitori: kakitoriSufixos, diga: digaSufixos },
  { meta: metaKoSoADo, Component: KoSoADo, quiz: quizKoSoADo, kakitori: kakitoriKoSoADo, diga: digaKoSoADo },
  { meta: metaPronomes, Component: Pronomes, quiz: quizPronomes, kakitori: kakitoriPronomes, diga: digaPronomes },
  { meta: metaFamilia, Component: Familia, quiz: quizFamilia, kakitori: kakitoriFamilia, diga: digaFamilia },
  { meta: metaParticulas, Component: Particulas, quiz: quizParticulas, diga: digaParticulas },
  { meta: metaVerbos, Component: Verbos, quiz: quizVerbos, diga: digaVerbos },
  { meta: metaSeikatsu, Component: Seikatsu, quiz: quizSeikatsu, kakitori: kakitoriSeikatsu, diga: digaSeikatsu },
  { meta: metaKanji, Component: Kanji, quiz: quizKanji, kakitori: kakitoriKanji, diga: digaKanji },
];

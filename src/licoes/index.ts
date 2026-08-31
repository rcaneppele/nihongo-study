import type { ComponentType } from 'react';
import type { QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';

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
}

import Kana, { meta as metaKana, quiz as quizKana } from './kana';
import KoSoADo, { meta as metaKoSoADo, quiz as quizKoSoADo, kakitori as kakitoriKoSoADo } from './kosoado';
import Particulas, { meta as metaParticulas, quiz as quizParticulas } from './particulas';
import Familia, { meta as metaFamilia, quiz as quizFamilia, kakitori as kakitoriFamilia } from './familia';
import Apresentacao, {
  meta as metaApresentacao,
  quiz as quizApresentacao,
  kakitori as kakitoriApresentacao,
} from './apresentacao';
import Aisatsu, { meta as metaAisatsu, quiz as quizAisatsu, kakitori as kakitoriAisatsu } from './aisatsu';
import Sufixos, { meta as metaSufixos, quiz as quizSufixos, kakitori as kakitoriSufixos } from './sufixos';
import Pronomes, { meta as metaPronomes, quiz as quizPronomes, kakitori as kakitoriPronomes } from './pronomes';
import Verbos, { meta as metaVerbos, quiz as quizVerbos } from './verbos';
import Desu, { meta as metaDesu, quiz as quizDesu } from './desu';
import Kanji, { meta as metaKanji, quiz as quizKanji, kakitori as kakitoriKanji } from './kanji';

export const LICOES: LicaoEntry[] = [
  { meta: metaKana, Component: Kana, quiz: quizKana },
  { meta: metaApresentacao, Component: Apresentacao, quiz: quizApresentacao, kakitori: kakitoriApresentacao },
  { meta: metaAisatsu, Component: Aisatsu, quiz: quizAisatsu, kakitori: kakitoriAisatsu },
  { meta: metaSufixos, Component: Sufixos, quiz: quizSufixos, kakitori: kakitoriSufixos },
  { meta: metaPronomes, Component: Pronomes, quiz: quizPronomes, kakitori: kakitoriPronomes },
  { meta: metaFamilia, Component: Familia, quiz: quizFamilia, kakitori: kakitoriFamilia },
  { meta: metaKoSoADo, Component: KoSoADo, quiz: quizKoSoADo, kakitori: kakitoriKoSoADo },
  { meta: metaParticulas, Component: Particulas, quiz: quizParticulas },
  { meta: metaVerbos, Component: Verbos, quiz: quizVerbos },
  { meta: metaDesu, Component: Desu, quiz: quizDesu },
  { meta: metaKanji, Component: Kanji, quiz: quizKanji, kakitori: kakitoriKanji },
];

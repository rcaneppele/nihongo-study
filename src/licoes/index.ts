import type { ComponentType } from 'react';
import type { QuizLicao } from '../data/quiz/types';

export interface LicaoMeta {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  tags: string[];
  /** Habilita o botão "Ouvir lição" (narração via Web Speech API). Piloto: só `desu` por ora. */
  audio?: boolean;
}

export interface LicaoEntry {
  meta: LicaoMeta;
  Component: ComponentType;
  quiz?: QuizLicao;
}

import Kana, { meta as metaKana, quiz as quizKana } from './kana';
import KoSoADo, { meta as metaKoSoADo, quiz as quizKoSoADo } from './kosoado';
import Particulas, { meta as metaParticulas, quiz as quizParticulas } from './particulas';
import Familia, { meta as metaFamilia, quiz as quizFamilia } from './familia';
import Apresentacao, { meta as metaApresentacao, quiz as quizApresentacao } from './apresentacao';
import Aisatsu, { meta as metaAisatsu, quiz as quizAisatsu } from './aisatsu';
import Sufixos, { meta as metaSufixos, quiz as quizSufixos } from './sufixos';
import Pronomes, { meta as metaPronomes, quiz as quizPronomes } from './pronomes';
import Verbos, { meta as metaVerbos, quiz as quizVerbos } from './verbos';
import Desu, { meta as metaDesu, quiz as quizDesu } from './desu';

export const LICOES: LicaoEntry[] = [
  { meta: metaKana, Component: Kana, quiz: quizKana },
  { meta: metaApresentacao, Component: Apresentacao, quiz: quizApresentacao },
  { meta: metaAisatsu, Component: Aisatsu, quiz: quizAisatsu },
  { meta: metaSufixos, Component: Sufixos, quiz: quizSufixos },
  { meta: metaPronomes, Component: Pronomes, quiz: quizPronomes },
  { meta: metaFamilia, Component: Familia, quiz: quizFamilia },
  { meta: metaKoSoADo, Component: KoSoADo, quiz: quizKoSoADo },
  { meta: metaParticulas, Component: Particulas, quiz: quizParticulas },
  { meta: metaVerbos, Component: Verbos, quiz: quizVerbos },
  { meta: metaDesu, Component: Desu, quiz: quizDesu },
];

import type { ComponentType } from 'react';

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
}

import KoSoADo, { meta as metaKoSoADo } from './kosoado';
import Particulas, { meta as metaParticulas } from './particulas';
import Familia, { meta as metaFamilia } from './familia';
import Apresentacao, { meta as metaApresentacao } from './apresentacao';
import Sufixos, { meta as metaSufixos } from './sufixos';
import Pronomes, { meta as metaPronomes } from './pronomes';
import Verbos, { meta as metaVerbos } from './verbos';

export const LICOES: LicaoEntry[] = [
  { meta: metaApresentacao, Component: Apresentacao },
  { meta: metaSufixos, Component: Sufixos },
  { meta: metaPronomes, Component: Pronomes },
  { meta: metaFamilia, Component: Familia },
  { meta: metaKoSoADo, Component: KoSoADo },
  { meta: metaParticulas, Component: Particulas },
  { meta: metaVerbos, Component: Verbos },
];

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';

/**
 * Aviso para instalar o app no iPhone/iPad: no Safari, site não instalado
 * pode ter os dados apagados depois de alguns dias sem uso; instalado na tela
 * inicial, não (ver `regras-negocio.md` §6). Dispensar vale só para este
 * aparelho (`db.local`).
 */
const DISPENSADO_KEY = 'avisoInstalacaoDispensado';
const OUTROS_NAVEGADORES_IOS = /CriOS|FxiOS|EdgiOS|OPiOS/;

export interface AmbienteNavegador {
  userAgent: string;
  maxTouchPoints: number;
  /** Aberto como app instalado. */
  instalado: boolean;
}

export function ehSafariDoIos({ userAgent, maxTouchPoints }: Pick<AmbienteNavegador, 'userAgent' | 'maxTouchPoints'>): boolean {
  // O iPad se apresenta como Mac; o que entrega é a tela de toque.
  const ios = /iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
  return ios && /Safari/.test(userAgent) && !OUTROS_NAVEGADORES_IOS.test(userAgent);
}

export function deveAvisarInstalacao(ambiente: AmbienteNavegador, dispensado: boolean): boolean {
  return !dispensado && !ambiente.instalado && ehSafariDoIos(ambiente);
}

function ambienteAtual(): AmbienteNavegador {
  return {
    userAgent: navigator.userAgent,
    maxTouchPoints: navigator.maxTouchPoints,
    instalado:
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true,
  };
}

export function useAvisoInstalacao(): boolean {
  const dispensado = useLiveQuery(async () => (await db.local.get(DISPENSADO_KEY))?.value === true, []);
  return dispensado === false && deveAvisarInstalacao(ambienteAtual(), false);
}

export function dispensarAvisoInstalacao() {
  return db.local.put({ key: DISPENSADO_KEY, value: true });
}

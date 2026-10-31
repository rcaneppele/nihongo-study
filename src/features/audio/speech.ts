// Pronúncia via Web Speech API do navegador (sem backend).
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';

let voicesCache: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) voicesCache = voices;
  return voicesCache;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Quando há mais de uma voz japonesa, prioriza lang exato, depois a voz
// marcada como padrão pelo navegador/SO, depois vozes locais (funcionam
// offline, alinhado ao princípio offline-first do app).
function pickBestJapaneseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const japanese = voices.filter((v) => v.lang.startsWith('ja'));
  if (japanese.length === 0) return undefined;

  function score(v: SpeechSynthesisVoice) {
    let s = 0;
    if (v.lang === 'ja-JP') s += 10;
    if (v.default) s += 3;
    if (v.localService) s += 1;
    return s;
  }

  return japanese.reduce((best, v) => (score(v) > score(best) ? v : best));
}

/**
 * Velocidade da fala, escolhida pelo usuário na tela de leitura e válida pra
 * todo áudio do app (AudioButton, kakitori, leitura). Persistida em db.meta
 * (entra no backup); fica em cache neste módulo pra `speakJapanese` não
 * precisar ler o banco a cada clique.
 */
export type SpeechSpeed = 'slow' | 'normal';

const RATES: Record<SpeechSpeed, number> = { slow: 0.65, normal: 0.9 };
const SPEED_META_KEY = 'speechSpeed';
let currentSpeed: SpeechSpeed = 'normal';

db.meta.get(SPEED_META_KEY).then((entry) => {
  if (entry?.value === 'slow' || entry?.value === 'normal') currentSpeed = entry.value;
});

export function useSpeechSpeed(): SpeechSpeed {
  const entry = useLiveQuery(() => db.meta.get(SPEED_META_KEY), []);
  return entry?.value === 'slow' ? 'slow' : 'normal';
}

export function setSpeechSpeed(speed: SpeechSpeed) {
  currentSpeed = speed;
  return db.meta.put({ key: SPEED_META_KEY, value: speed });
}

// Cada fala nova (ou stopSpeaking) incrementa a geração — quem estava
// esperando uma fala terminar (o "ouvir texto inteiro" da leitura) sabe
// assim que foi interrompido por outra fala e para, em vez de seguir pra
// próxima linha por cima dela.
let generation = 0;
// Referência viva da fala atual: no Chrome, um utterance sem referência pode
// ser coletado pelo GC antes do fim, e o `onend` nunca dispara.
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function currentSpeechGeneration(): number {
  return generation;
}

export function stopSpeaking() {
  generation++;
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}

function startUtterance(text: string): SpeechSynthesisUtterance {
  // Cancela fala em andamento para evitar sobreposição em cliques rápidos.
  generation++;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = RATES[currentSpeed];

  const voice = pickBestJapaneseVoice(loadVoices());
  if (voice) utterance.voice = voice;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function speakJapanese(text: string) {
  if (!isSpeechSupported() || !text.trim()) return;
  startUtterance(text);
}

/**
 * Fala e espera terminar. Resolve com `completed: false` se a fala foi
 * interrompida (outra fala começou, stopSpeaking, erro) — e com a geração
 * dela, pra quem chama conferir depois se nada novo começou enquanto
 * esperava (ex.: na pausa do shadowing).
 */
export function speakJapaneseAndWait(text: string): Promise<{ completed: boolean; generation: number }> {
  if (!isSpeechSupported() || !text.trim()) return Promise.resolve({ completed: false, generation });
  const utterance = startUtterance(text);
  const myGeneration = generation;
  return new Promise((resolve) => {
    const finish = (ok: boolean) => {
      if (currentUtterance === utterance) currentUtterance = null;
      resolve({ completed: ok && generation === myGeneration, generation: myGeneration });
    };
    utterance.onend = () => finish(true);
    utterance.onerror = () => finish(false);
  });
}

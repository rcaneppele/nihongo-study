// Pronúncia via Web Speech API do navegador (sem backend, funciona offline com vozes locais).
export type SpeechLang = 'ja' | 'pt';

let voicesCache: SpeechSynthesisVoice[] = [];

export function loadVoices(): SpeechSynthesisVoice[] {
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

// Quando há mais de uma voz para o idioma, prioriza lang exato, depois a voz
// marcada como padrão pelo navegador/SO, depois vozes locais (funcionam
// offline, alinhado ao princípio offline-first do app).
export function pickBestVoice(
  voices: SpeechSynthesisVoice[],
  lang: SpeechLang,
): SpeechSynthesisVoice | undefined {
  const exactLang = lang === 'ja' ? 'ja-JP' : 'pt-BR';
  const candidates = voices.filter((v) => v.lang.startsWith(lang));
  if (candidates.length === 0) return undefined;

  function score(v: SpeechSynthesisVoice) {
    let s = 0;
    if (v.lang === exactLang) s += 10;
    if (v.default) s += 3;
    if (v.localService) s += 1;
    return s;
  }

  return candidates.reduce((best, v) => (score(v) > score(best) ? v : best));
}

// Utilitário compartilhado por speakJapanese e pela narração de lição, para
// que ambos falem com a mesma configuração de voz/velocidade por idioma.
export function speakUtterance(text: string, lang: SpeechLang): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'ja' ? 'ja-JP' : 'pt-BR';
  utterance.rate = lang === 'ja' ? 0.9 : 1;
  const voice = pickBestVoice(loadVoices(), lang);
  if (voice) utterance.voice = voice;
  return utterance;
}

type CancelListener = () => void;
let externalCancelListeners: CancelListener[] = [];

// Permite que outras partes do app (como a narração de lição inteira) saibam
// quando uma fala pontual (ex.: botão de pronúncia de um exemplo) tomou o
// lugar da fala em andamento, já que ambas dividem a mesma fila do navegador.
export function onSpeechCancelledExternally(listener: CancelListener): () => void {
  externalCancelListeners.push(listener);
  return () => {
    externalCancelListeners = externalCancelListeners.filter((l) => l !== listener);
  };
}

export function speakJapanese(text: string) {
  if (!isSpeechSupported() || !text.trim()) return;

  // Cancela fala em andamento para evitar sobreposição em cliques rápidos.
  window.speechSynthesis.cancel();
  externalCancelListeners.forEach((listener) => listener());

  window.speechSynthesis.speak(speakUtterance(text, 'ja'));
}

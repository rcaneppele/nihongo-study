// Teste de viabilidade: pronúncia via Web Speech API do navegador (sem backend).
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

export function speakJapanese(text: string) {
  if (!isSpeechSupported() || !text.trim()) return;

  // Cancela fala em andamento para evitar sobreposição em cliques rápidos.
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.9;

  const voice = pickBestJapaneseVoice(loadVoices());
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

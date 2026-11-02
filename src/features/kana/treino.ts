import type { KanaProgress, KanaType } from '../../db/schema';
import { getConfusables, getKana, type KanaEntry } from '../../data/kana';
import { embaralhar, sortearUm, type Rng } from '../../lib/aleatorio';
import type { ModoKana } from './desempenho';

/**
 * Regras do treino de kana (puras): montar a sessão (repetição ponderada
 * pelos erros, sem o mesmo kana lado a lado), escolher os pontos fracos e as
 * alternativas da múltipla escolha. A tela fica em `routes/Kana.tsx` e
 * `features/kana/*.tsx`; a gravação em `progresso.ts`.
 */

export type Escrita = KanaType | 'both';

export interface RespostaKana {
  entry: KanaEntry;
  correct: boolean;
}

/**
 * Kana com histórico de mais erros entram repetidos no pool (até
 * MAX_EXTRA_REPS vezes a mais), pra receberem mais prática dentro da sessão
 * em vez de aparecerem só uma vez igual aos que o usuário já domina.
 */
export const MAX_EXTRA_REPS = 3;

/** Taxa de erro (0–1) do kana no modo; no desenho, o quanto a melhor nota ficou abaixo de 100. */
export function errorRateFor(p: KanaProgress | undefined, mode: ModoKana): number {
  if (!p) return 0;
  if (mode === 'desenho') {
    return p.drawBest === undefined ? 0 : (100 - p.drawBest) / 100;
  }
  if (mode === 'escolha') {
    const total = (p.choiceCorrect ?? 0) + (p.choiceWrong ?? 0);
    return total === 0 ? 0 : (p.choiceWrong ?? 0) / total;
  }
  const total = p.romajiCorrect + p.romajiWrong;
  return total === 0 ? 0 : p.romajiWrong / total;
}

/** Quantas vezes o kana foi praticado no modo (no desenho, 1 se já tem nota). */
export function attemptsFor(p: KanaProgress | undefined, mode: ModoKana): number {
  if (!p) return 0;
  if (mode === 'desenho') return p.drawBest === undefined ? 0 : 1;
  if (mode === 'escolha') return (p.choiceCorrect ?? 0) + (p.choiceWrong ?? 0);
  return p.romajiCorrect + p.romajiWrong;
}

/** `progress[i]` é o progresso de `entries[i]`. */
export function buildWeightedPool(
  entries: KanaEntry[],
  progress: Array<KanaProgress | undefined>,
  mode: ModoKana
): KanaEntry[] {
  const pool: KanaEntry[] = [];
  entries.forEach((entry, i) => {
    pool.push(entry);
    const reps = Math.round(errorRateFor(progress[i], mode) * MAX_EXTRA_REPS);
    for (let r = 0; r < reps; r++) pool.push(entry);
  });
  return pool;
}

/**
 * Embaralhar puro pode deixar cópias do mesmo kana (das repetições de
 * buildWeightedPool) lado a lado ou próximas — o que é justamente o oposto
 * do que a repetição espaçada busca (massed practice em vez de intercalada).
 * Aqui sempre coloca, a cada passo, um kana dentre os que ainda têm mais
 * cópias pendentes e que não seja igual ao anterior — só repete adjacente se
 * for matematicamente impossível evitar (mais da metade do pool sendo do
 * mesmo kana).
 */
export function arrangeNoAdjacent(entries: KanaEntry[], rng: Rng = Math.random): KanaEntry[] {
  const groups = new Map<string, { entry: KanaEntry; count: number }>();
  for (const e of embaralhar(entries, rng)) {
    const g = groups.get(e.char);
    if (g) g.count++;
    else groups.set(e.char, { entry: e, count: 1 });
  }
  const remaining = [...groups.values()];

  const result: KanaEntry[] = [];
  let lastChar: string | null = null;
  while (result.length < entries.length) {
    remaining.sort((a, b) => b.count - a.count);
    // Prioriza o kana mais frequente entre os diferentes do anterior — só
    // volta a considerar o mesmo char do passo anterior se ele for o único
    // que ainda sobrou (repetição adjacente inevitável).
    const eligible = remaining.filter((g) => g.count > 0 && g.entry.char !== lastChar);
    const pool = eligible.length > 0 ? eligible : remaining.filter((g) => g.count > 0);
    if (pool.length === 0) break;
    const topCount = pool[0].count;
    const pick = sortearUm(pool.filter((g) => g.count === topCount), rng)!;
    pick.count--;
    result.push(pick.entry);
    lastChar = pick.entry.char;
  }
  return result;
}

/** Sessão do teste normal: pool ponderado pelos erros, arranjado sem repetição adjacente. */
export function montarSessao(
  entries: KanaEntry[],
  progress: Array<KanaProgress | undefined>,
  mode: ModoKana,
  ponderar: boolean,
  rng: Rng = Math.random
): KanaEntry[] {
  return arrangeNoAdjacent(ponderar ? buildWeightedPool(entries, progress, mode) : entries, rng);
}

/**
 * Kana com mais erros no modo selecionado, ignorando a seleção manual de
 * famílias — respeita só a escrita (hiragana/katakana/ambos) escolhida. Só
 * entram kana já praticados nesse modo e com pelo menos um erro; sem isso
 * não há "ponto fraco" a mostrar. Limitado a WEAK_POOL_CAP pra sessão não
 * ficar enorme quando o histórico de erros é grande.
 */
export const WEAK_POOL_CAP = 20;

export function kanaFracos(
  entries: KanaEntry[],
  progress: Array<KanaProgress | undefined>,
  mode: ModoKana
): KanaEntry[] {
  return entries
    .map((entry, i) => ({ entry, rate: errorRateFor(progress[i], mode), attempts: attemptsFor(progress[i], mode) }))
    .filter((x) => x.attempts > 0 && x.rate > 0)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, WEAK_POOL_CAP)
    .map((x) => x.entry);
}

/**
 * Com poucos kana fracos (no limite, só 1), a sessão de "praticar fracos"
 * (sem repetição ponderada) ficaria curta demais pra parecer uma sessão de
 * verdade. MIN_WEAK_POOL garante um mínimo de variedade completando com
 * outros kana da escrita — primeiro os já praticados. O contador exibido na
 * tela continua refletindo só os kana realmente errados; esse preenchimento
 * entra apenas na hora de montar a sessão de fato.
 */
export const MIN_WEAK_POOL = 4;

export function completarFracos(
  weak: KanaEntry[],
  entries: KanaEntry[],
  progress: Array<KanaProgress | undefined>,
  mode: ModoKana,
  rng: Rng = Math.random
): KanaEntry[] {
  if (weak.length === 0 || weak.length >= MIN_WEAK_POOL) return weak;
  const weakChars = new Set(weak.map((e) => e.char));
  const rest = entries
    .map((entry, i) => ({ entry, attempts: attemptsFor(progress[i], mode) }))
    .filter((x) => !weakChars.has(x.entry.char));
  const practiced = embaralhar(rest.filter((x) => x.attempts > 0), rng).map((x) => x.entry);
  const unpracticed = embaralhar(rest.filter((x) => x.attempts === 0), rng).map((x) => x.entry);
  return [...weak, ...[...practiced, ...unpracticed].slice(0, MIN_WEAK_POOL - weak.length)];
}

export const CHOICE_COUNT = 6;

/**
 * Prioriza kana visualmente confusos com o correto (getConfusables) como
 * distratores; completa com aleatórios. Busca primeiro nos kana que o
 * usuário selecionou para a sessão (pool); se não for suficiente, busca em
 * toda a escrita mas só dentro do mesmo grupo (básicos ou combinados/yōon —
 * ver KanaGroup) do kana perguntado, pra não misturar um combinado tipo りゅ
 * como opção errada numa sessão só de kana básicos (ou vice-versa). Só
 * recorre a qualquer kana da escrita como último recurso, o que na prática
 * quase nunca acontece — cada grupo sozinho já tem kana de sobra pra
 * preencher CHOICE_COUNT. Nunca repete romaji entre as opções.
 */
export function buildChoiceOptions(entry: KanaEntry, pool: KanaEntry[], rng: Rng = Math.random): KanaEntry[] {
  const sameType = (k: KanaEntry) => k.type === entry.type && k.char !== entry.char;
  const uniqueByChar = (list: KanaEntry[]) => {
    const seen = new Set<string>();
    return list.filter((k) => (seen.has(k.char) ? false : (seen.add(k.char), true)));
  };

  const narrowCandidates = uniqueByChar(pool.filter(sameType));
  const widePool = getKana(entry.type).filter(sameType);
  const sameGroupPool = widePool.filter((k) => k.group === entry.group);
  const confusableChars = new Set(getConfusables(entry.type, entry.char));

  const usedRomaji = new Set([entry.romaji]);
  const options: KanaEntry[] = [entry];

  function tryAdd(candidate: KanaEntry) {
    if (options.length >= CHOICE_COUNT || usedRomaji.has(candidate.romaji)) return;
    options.push(candidate);
    usedRomaji.add(candidate.romaji);
  }

  for (const candidatos of [narrowCandidates, sameGroupPool, widePool]) {
    embaralhar(candidatos.filter((k) => confusableChars.has(k.char)), rng).forEach(tryAdd);
    embaralhar(candidatos, rng).forEach(tryAdd);
  }

  return embaralhar(options, rng);
}

/** Resposta digitada no modo romaji: sem diferenciar maiúsculas nem espaços nas pontas. */
export function romajiCorreto(resposta: string, entry: KanaEntry): boolean {
  return resposta.trim().toLowerCase() === entry.romaji;
}

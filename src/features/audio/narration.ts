import type { SpeechLang } from './speech';

// Constrói o "roteiro" de leitura de uma lição a partir do DOM já renderizado,
// em vez de exigir que cada lição declare texto narrável separadamente. Isso
// permite ligar a narração em qualquer lição futura sem reescrever seu conteúdo.
export interface NarrationRun {
  text: string;
  lang: SpeechLang;
}

// Blocos considerados unidades de leitura (cada um vira uma ou mais falas,
// com uma pausa natural entre um bloco e o próximo). Marcar um elemento com
// data-audio-block estende essa lista sem precisar mudar este arquivo (usado
// por Note, por exemplo, cujo conteúdo não é um <p>).
const BLOCK_SELECTOR = 'p, li, h2, h3, td, th, [data-audio-block]';

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}

function collectTopLevelBlocks(container: HTMLElement): HTMLElement[] {
  const all = Array.from(container.querySelectorAll<HTMLElement>(BLOCK_SELECTOR));
  const blockSet = new Set(all);

  return all.filter((block) => {
    if (block.closest('[data-audio-skip]')) return false;

    let parent = block.parentElement;
    while (parent && parent !== container) {
      if (blockSet.has(parent)) return false;
      parent = parent.parentElement;
    }
    return true;
  });
}

// Japonês é identificado pela classe font-jp, já usada em todo o app para
// estilizar texto em japonês — reaproveitá-la evita ter que marcar o
// conteúdo de novo só para a narração.
function extractBlockRuns(block: HTMLElement): NarrationRun[] {
  const runs: NarrationRun[] = [];
  let bufferLang: SpeechLang | null = null;
  let buffer = '';

  const flush = () => {
    const text = buffer.trim();
    if (text) runs.push({ text, lang: bufferLang as SpeechLang });
    buffer = '';
  };

  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent || parent.closest('[data-audio-skip]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const raw = collapseWhitespace(node.textContent ?? '');
    if (!raw) continue;

    const parent = (node as Text).parentElement as Element;
    const jpAncestor = parent.closest('.font-jp');
    const lang: SpeechLang = jpAncestor && block.contains(jpAncestor) ? 'ja' : 'pt';

    if (lang !== bufferLang) flush();
    bufferLang = lang;
    buffer += raw;
  }
  flush();

  return runs;
}

export function buildNarrationQueue(container: HTMLElement): NarrationRun[] {
  const blocks = collectTopLevelBlocks(container);
  const queue: NarrationRun[] = [];
  for (const block of blocks) {
    queue.push(...extractBlockRuns(block));
  }
  return queue;
}

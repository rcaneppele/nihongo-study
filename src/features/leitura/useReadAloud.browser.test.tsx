import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { speakJapanese } from '../audio/speech';
import { useReadAloud, type ReadAloudMode } from './useReadAloud';

/**
 * "Ouvir o texto": lê linha a linha, pausa e continua de onde parou, para
 * quando outra fala entra no meio e, no shadowing, espera o aluno repetir.
 * A fala do navegador é trocada por uma que o teste termina quando quer.
 */

let faladas: SpeechSynthesisUtterance[];

beforeEach(() => {
  faladas = [];
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    value: { getVoices: () => [], cancel() {}, speak: (u: SpeechSynthesisUtterance) => faladas.push(u), onvoiceschanged: null },
  });
});

const textos = () => faladas.map((u) => u.text);
/** A fala atual chega ao fim. */
const terminarFala = () => faladas.at(-1)?.onend?.(new Event('end') as SpeechSynthesisEvent);

function Leitor({ linhas, modo, aoTerminar }: { linhas: string[]; modo: ReadAloudMode; aoTerminar: (m: ReadAloudMode) => void }) {
  const { state, play, pause, restart, stop } = useReadAloud(linhas, modo, aoTerminar);
  return (
    <div>
      <p data-testid="estado">
        {state.status} linha {state.line}
        {state.shadowPauseMs !== null ? ' repetindo' : ''}
      </p>
      <button onClick={play}>tocar</button>
      <button onClick={pause}>pausar</button>
      <button onClick={restart}>do começo</button>
      <button onClick={stop}>parar</button>
    </div>
  );
}

async function abrir(modo: ReadAloudMode = 'normal', linhas = ['いち', 'に', 'さん']) {
  const aoTerminar = vi.fn();
  const tela = await render(<Leitor linhas={linhas} modo={modo} aoTerminar={aoTerminar} />);
  return { tela, aoTerminar, estado: tela.getByTestId('estado') };
}

describe('useReadAloud', () => {
  it('lê todas as linhas em ordem e avisa só quando chega ao fim', async () => {
    const { tela, aoTerminar, estado } = await abrir();
    await expect.element(estado).toHaveTextContent('idle linha 0');
    await tela.getByRole('button', { name: 'tocar' }).click();
    await expect.element(estado).toHaveTextContent('playing linha 0');
    terminarFala();
    await expect.element(estado).toHaveTextContent('playing linha 1');
    terminarFala();
    await expect.element(estado).toHaveTextContent('playing linha 2');
    expect(aoTerminar).not.toHaveBeenCalled();
    terminarFala();
    await expect.element(estado).toHaveTextContent('idle linha 0');
    expect(textos()).toEqual(['いち', 'に', 'さん']);
    expect(aoTerminar).toHaveBeenCalledExactlyOnceWith('normal');
  });

  it('pausar guarda a linha; tocar de novo recomeça dela, não do início', async () => {
    const { tela, aoTerminar, estado } = await abrir();
    await tela.getByRole('button', { name: 'tocar' }).click();
    terminarFala();
    await expect.element(estado).toHaveTextContent('playing linha 1');
    await tela.getByRole('button', { name: 'pausar' }).click();
    await expect.element(estado).toHaveTextContent('paused linha 1');
    await tela.getByRole('button', { name: 'tocar' }).click();
    await expect.element(estado).toHaveTextContent('playing linha 1');
    expect(textos()).toEqual(['いち', 'に', 'に']);
    expect(aoTerminar).not.toHaveBeenCalled();
  });

  it('outra fala no meio (botão de áudio de uma linha) deixa a leitura pausada naquela linha', async () => {
    const { tela, estado } = await abrir();
    await tela.getByRole('button', { name: 'tocar' }).click();
    const daLeitura = faladas[0];
    speakJapanese('ねこ');
    daLeitura.onend?.(new Event('end') as SpeechSynthesisEvent);
    await expect.element(estado).toHaveTextContent('paused linha 0');
  });

  it('"do começo" volta à primeira linha; parar zera sem avisar que terminou', async () => {
    const { tela, aoTerminar, estado } = await abrir();
    await tela.getByRole('button', { name: 'tocar' }).click();
    terminarFala();
    await expect.element(estado).toHaveTextContent('playing linha 1');
    await tela.getByRole('button', { name: 'do começo' }).click();
    await expect.element(estado).toHaveTextContent('playing linha 0');
    await tela.getByRole('button', { name: 'parar' }).click();
    await expect.element(estado).toHaveTextContent('idle linha 0');
    // A fala antiga terminar depois de parar não retoma a leitura.
    terminarFala();
    await expect.element(estado).toHaveTextContent('idle linha 0');
    expect(aoTerminar).not.toHaveBeenCalled();
  });

  it('shadowing: depois de cada linha espera o aluno repetir antes de seguir', async () => {
    const { tela, aoTerminar, estado } = await abrir('shadowing', ['いち', 'に']);
    await tela.getByRole('button', { name: 'tocar' }).click();
    terminarFala();
    await expect.element(estado).toHaveTextContent('playing linha 0 repetindo');
    expect(textos()).toEqual(['いち']);
    // A pausa mínima é de 1,5 s; só depois vem a próxima linha.
    await expect.element(estado, { timeout: 4000 }).toHaveTextContent('playing linha 1');
    terminarFala();
    await expect.element(estado, { timeout: 4000 }).toHaveTextContent('idle linha 0');
    expect(aoTerminar).toHaveBeenCalledExactlyOnceWith('shadowing');
  });

  it('shadowing: outra fala durante a pausa para a leitura na linha seguinte', async () => {
    const { tela, estado } = await abrir('shadowing', ['いち', 'に']);
    await tela.getByRole('button', { name: 'tocar' }).click();
    terminarFala();
    await expect.element(estado).toMatchTextContent(/repetindo/);
    speakJapanese('ねこ');
    await expect.element(estado, { timeout: 4000 }).toHaveTextContent('paused linha 1');
  });

  it('sair da tela para a leitura', async () => {
    const { tela } = await abrir();
    await tela.getByRole('button', { name: 'tocar' }).click();
    await tela.unmount();
    terminarFala();
    await new Promise((r) => setTimeout(r, 50));
    expect(textos()).toEqual(['いち']);
  });
});

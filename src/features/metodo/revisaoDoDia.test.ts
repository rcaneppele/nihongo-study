import { describe, expect, it } from 'vitest';
import { KANJI_N5 } from '../../data/kanji';
import { freshSrs } from '../srs/fsrs';
import type { StudyItem } from '../flashcards/stages';
import { montarSessaoDoDia, SESSAO_MAXIMA } from './revisaoDoDia';
import { AGORA, DIA, umCard } from '../../test/fabricas';

/** `n` cards vencidos, o primeiro o mais atrasado. */
function vencidos(n: number): StudyItem[] {
  return Array.from({ length: n }, (_, i) => ({
    card: umCard({ front: `c${i}`, dueDate: AGORA - (n - i) * DIA }),
    direction: 'recognition' as const,
  }));
}
const kanji = (n: number) => KANJI_N5.slice(0, n);
const semAcaso = () => 0.5;
const frentes = (itens: StudyItem[]) => itens.map((i) => i.card.front).sort();

describe('montarSessaoDoDia', () => {
  it('cabendo tudo no teto, entra tudo', () => {
    const s = montarSessaoDoDia(vencidos(10), kanji(5), SESSAO_MAXIMA, semAcaso);
    expect(s.cards).toHaveLength(10);
    expect(s.kanji).toHaveLength(5);
    expect(s.restam).toBe(0);
  });

  it('passando do teto, a sessão fica no teto e diz quanto sobrou', () => {
    const s = montarSessaoDoDia(vencidos(120), [], 50, semAcaso);
    expect(s.cards).toHaveLength(50);
    expect(s.restam).toBe(70);
  });

  it('entram os mais atrasados primeiro (embaralhados dentro da sessão)', () => {
    const todos = vencidos(30);
    const s = montarSessaoDoDia([...todos].reverse(), [], 10, semAcaso);
    expect(frentes(s.cards)).toEqual(frentes(todos.slice(0, 10)));
  });

  it('na produção, vale a data da produção, não a do reconhecimento', () => {
    const producaoAtrasada: StudyItem = {
      card: umCard({ front: 'prod', dueDate: AGORA + 30 * DIA, production: { ...freshSrs(AGORA), dueDate: AGORA - 99 * DIA } }),
      direction: 'production',
    };
    const s = montarSessaoDoDia([...vencidos(5), producaoAtrasada], [], 1, semAcaso);
    expect(frentes(s.cards)).toEqual(['prod']);
  });

  it('cards e kanji dividem o teto na proporção do que cada um tem vencido — nenhum fica esperando o outro zerar', () => {
    const s = montarSessaoDoDia(vencidos(90), kanji(30), 40, semAcaso);
    expect(s.cards).toHaveLength(30);
    expect(s.kanji).toHaveLength(10);
    expect(s.restam).toBe(80);
  });

  it('com poucos de um tipo, ele entra mesmo assim (ao menos 1) e o outro completa o teto', () => {
    const s = montarSessaoDoDia(vencidos(200), kanji(1), 20, semAcaso);
    expect(s.kanji).toHaveLength(1);
    expect(s.cards).toHaveLength(19);
  });

  it('os kanji entram na ordem recebida (a fila já vem do mais atrasado)', () => {
    const s = montarSessaoDoDia(vencidos(30), kanji(30), 10, semAcaso);
    expect(s.kanji.map((k) => k.char).sort()).toEqual(kanji(5).map((k) => k.char).sort());
  });

  it('nada vencido: sessão vazia', () => {
    expect(montarSessaoDoDia([], [], 50, semAcaso)).toEqual({ cards: [], kanji: [], restam: 0 });
  });
});

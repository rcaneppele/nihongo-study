import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from '@vitest/browser/context';
import { MemoryRouter } from 'react-router-dom';
import { State } from 'ts-fsrs';
import StudySession from './StudySession';
import { db } from '../../db/schema';
import { criarCard } from './cards';
import type { StudyItem } from './stages';
import { freshSrs } from '../srs/fsrs';

async function itens(...frentes: string[]): Promise<StudyItem[]> {
  const cards = [];
  for (const f of frentes) cards.push(await criarCard({ front: f, back: `significado de ${f}`, note: `nota de ${f}` }));
  return cards.map((card) => ({ card, direction: 'recognition' as const }));
}

function sessao(items: StudyItem[], mode: 'review' | 'practice' = 'review', onDone = () => {}) {
  return render(
    <MemoryRouter>
      <StudySession items={items} mode={mode} onDone={onDone} />
    </MemoryRouter>
  );
}

describe('StudySession (revisão)', () => {
  it('mostra a frente, revela verso e nota, grava a revisão e avança', async () => {
    const tela = sessao(await itens('ねこ', 'いぬ'));
    await expect.element(tela.getByText('ねこ')).toBeVisible();
    await expect.element(tela.getByText('significado de ねこ')).not.toBeInTheDocument();
    await tela.getByRole('button', { name: /Mostrar resposta/ }).click();
    await expect.element(tela.getByText('significado de ねこ')).toBeVisible();
    await expect.element(tela.getByText('nota de ねこ')).toBeVisible();
    await tela.getByRole('button', { name: /^Lembrei/ }).click();
    await expect.element(tela.getByText('2 de 2')).toBeVisible();
    expect(await db.reviews.count()).toBe(1);
    expect((await db.cards.filter((c) => c.front === 'ねこ').first())?.state).toBe(State.Review);
  });

  it('duplo clique na nota grava uma revisão só (trava durante a gravação)', async () => {
    const tela = sessao(await itens('ねこ', 'いぬ', 'とり'));
    await tela.getByRole('button', { name: /Mostrar resposta/ }).click();
    await userEvent.dblClick(tela.getByRole('button', { name: /^Lembrei/ }));
    await expect.element(tela.getByText('2 de 3')).toBeVisible();
    expect(await db.reviews.count()).toBe(1);
  });

  it('Ctrl+Z desfaz a última nota', async () => {
    const tela = sessao(await itens('ねこ', 'いぬ'));
    await userEvent.keyboard(' ');
    await userEvent.keyboard('1');
    await expect.element(tela.getByText('2 de 2')).toBeVisible();
    await userEvent.keyboard('{Control>}z{/Control}');
    await expect.element(tela.getByText('1 de 2')).toBeVisible();
    await vi.waitFor(async () => expect(await db.reviews.count()).toBe(0));
  });

  it('fim da sessão chama onDone pelo botão', async () => {
    const onDone = vi.fn();
    const tela = sessao(await itens('ねこ'), 'review', onDone);
    await userEvent.keyboard(' ');
    await userEvent.keyboard(' ');
    await expect.element(tela.getByText('Sessão concluída.')).toBeVisible();
    await tela.getByRole('button', { name: 'Voltar' }).click();
    expect(onDone).toHaveBeenCalledOnce();
  });

  it('produção com frase de contexto: lacuna no lugar da palavra, sem entregar a resposta', async () => {
    const card = await criarCard({
      front: 'ねこ',
      back: 'gato',
      production: freshSrs(),
      example: { segments: [{ text: 'ねこが' }, { text: 'います' }], highlight: 0, translation: 'Tem um gato.' },
    });
    const tela = sessao([{ card, direction: 'production' }]);
    await expect.element(tela.getByText('Como se diz em japonês?')).toBeVisible();
    await expect.element(tela.getByText('＿＿')).toBeVisible();
    expect(tela.container.textContent).not.toContain('ねこ');
  });
});

describe('StudySession (prática livre)', () => {
  it('não grava nada', async () => {
    const tela = sessao(await itens('ねこ', 'いぬ'), 'practice');
    await expect.element(tela.getByText('Prática livre')).toBeVisible();
    for (let i = 0; i < 2; i++) {
      await tela.getByRole('button', { name: /Mostrar resposta/ }).click();
      await tela.getByRole('button', { name: /Próximo/ }).click();
    }
    await expect.element(tela.getByText('Sessão concluída.')).toBeVisible();
    expect(await db.reviews.count()).toBe(0);
  });
});

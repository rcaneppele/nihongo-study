import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from '@vitest/browser/context';
import GradeButtons from './GradeButtons';
import { freshSrs, Rating } from './fsrs';
import { setGradeMode } from './gradeMode';

describe('GradeButtons', () => {
  it('modo padrão: 2 botões com a prévia do intervalo', async () => {
    const tela = render(<GradeButtons srs={freshSrs()} disabled={false} onGrade={() => {}} />);
    await expect.element(tela.getByRole('button', { name: /^Lembrei/ })).toHaveTextContent('rever em 3 dias');
    await expect.element(tela.getByRole('button', { name: /^Não lembrei/ })).toHaveTextContent('rever amanhã');
    expect(tela.container.querySelectorAll('button')).toHaveLength(2);
  });

  it('modo "4 botões" (preferência gravada no banco)', async () => {
    await setGradeMode('full');
    const tela = render(<GradeButtons srs={freshSrs()} disabled={false} onGrade={() => {}} />);
    await expect.element(tela.getByRole('button', { name: /^Fácil/ })).toBeVisible();
    expect(tela.container.querySelectorAll('button')).toHaveLength(4);
  });

  it('atalhos: número da posição e Espaço = Lembrei; desabilitado não responde', async () => {
    const onGrade = vi.fn();
    const tela = render(<GradeButtons srs={freshSrs()} disabled={false} onGrade={onGrade} />);
    await expect.element(tela.getByRole('button', { name: /^Lembrei/ })).toBeVisible();
    await userEvent.keyboard('1');
    await userEvent.keyboard(' ');
    expect(onGrade.mock.calls.map((c) => c[0])).toEqual([Rating.Again, Rating.Good]);

    tela.rerender(<GradeButtons srs={freshSrs()} disabled onGrade={onGrade} />);
    await userEvent.keyboard('2');
    expect(onGrade).toHaveBeenCalledTimes(2);
  });

  it('atalho não dispara digitando num campo de texto', async () => {
    const onGrade = vi.fn();
    const tela = render(
      <>
        <input aria-label="campo" />
        <GradeButtons srs={freshSrs()} disabled={false} onGrade={onGrade} />
      </>
    );
    await tela.getByRole('textbox', { name: 'campo' }).click();
    await userEvent.keyboard('1 ');
    expect(onGrade).not.toHaveBeenCalled();
  });
});

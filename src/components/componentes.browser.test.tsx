import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from '@vitest/browser/context';
import { useState } from 'react';
import Segmentado from './Segmentado';
import Chip from './Chip';
import Furigana, { FuriganaWord } from './Furigana';
import SessionHeader from './SessionHeader';
import { GrammarTable } from './Licao';

/** Componentes visuais compartilhados, num navegador de verdade (camada 5). */

describe('Segmentado', () => {
  function Tema() {
    const [valor, setValor] = useState<'claro' | 'escuro'>('claro');
    return (
      <Segmentado
        rotulo="Tema"
        valor={valor}
        onChange={setValor}
        opcoes={[
          { valor: 'claro', rotulo: 'Claro' },
          { valor: 'escuro', rotulo: 'Escuro' },
        ]}
      />
    );
  }

  it('grupo com nome; só a opção escolhida fica pressionada', async () => {
    const tela = render(<Tema />);
    const grupo = tela.getByRole('group', { name: 'Tema' });
    await expect.element(grupo.getByRole('button', { name: 'Claro' })).toHaveAttribute('aria-pressed', 'true');
    await grupo.getByRole('button', { name: 'Escuro' }).click();
    await expect.element(grupo.getByRole('button', { name: 'Escuro' })).toHaveAttribute('aria-pressed', 'true');
    await expect.element(grupo.getByRole('button', { name: 'Claro' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('funciona pelo teclado', async () => {
    const tela = render(<Tema />);
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await expect.element(tela.getByRole('button', { name: 'Escuro' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Chip', () => {
  it('estado ligado via aria-pressed e classe', async () => {
    const onClick = vi.fn();
    const tela = render(
      <Chip active onClick={onClick}>
        Verbos
      </Chip>
    );
    const chip = tela.getByRole('button', { name: 'Verbos' });
    await expect.element(chip).toHaveAttribute('aria-pressed', 'true');
    await expect.element(chip).toHaveClass(/chip-active/);
    await chip.click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('Furigana', () => {
  it('leitura em <rt> só sobre o kanji (okurigana fica fora)', async () => {
    const tela = render(<Furigana segments={[{ text: '食', reading: 'た' }, { text: 'べる' }]} />);
    const rubis = tela.container.querySelectorAll('ruby');
    expect(rubis).toHaveLength(1);
    expect(rubis[0].querySelector('rt')?.textContent).toBe('た');
    expect(tela.container.textContent).toContain('べる');
  });

  it('a leitura fica em cima do kanji, na tela', async () => {
    const tela = render(<FuriganaWord kanji="父" reading="ちち" />);
    const rt = tela.container.querySelector('rt')!;
    const base = tela.container.querySelector('ruby')!;
    expect(rt.getBoundingClientRect().bottom).toBeLessThanOrEqual(base.getBoundingClientRect().bottom - 4);
  });
});

describe('SessionHeader', () => {
  it('progresso acessível, desfazer e desistir', async () => {
    const onUndo = vi.fn();
    const onQuit = vi.fn();
    const tela = render(<SessionHeader index={2} total={5} onUndo={onUndo} onQuit={onQuit} />);
    await expect.element(tela.getByText('3 de 5')).toBeVisible();
    await expect.element(tela.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
    await tela.getByRole('button', { name: 'Desfazer' }).click();
    await tela.getByRole('button', { name: 'Desistir e voltar' }).click();
    expect(onUndo).toHaveBeenCalledOnce();
    expect(onQuit).toHaveBeenCalledOnce();
  });

  it('sem desfazer disponível, o botão fica desabilitado; em sessão sem desfazer, some', async () => {
    const a = render(<SessionHeader index={0} total={3} onQuit={() => {}} />);
    await expect.element(a.getByRole('button', { name: 'Desfazer' })).toBeDisabled();
    a.unmount();
    const b = render(<SessionHeader index={0} total={3} onQuit={() => {}} semDesfazer />);
    expect(b.container.textContent).not.toContain('Desfazer');
  });
});

describe('GrammarTable', () => {
  it('tabela larga rola na horizontal e recebe foco pelo teclado', async () => {
    const linhas = [['x'.repeat(120), 'b', 'c']];
    const tela = render(
      <div style={{ width: 200 }}>
        <GrammarTable headers={['A', 'B', 'C']} rows={linhas} />
      </div>
    );
    const regiao = tela.getByRole('region', { name: 'Tabela: A, B, C' });
    await userEvent.tab();
    await expect.element(regiao).toHaveFocus();
    const el = regiao.element();
    expect(el.scrollWidth).toBeGreaterThan(el.clientWidth);
  });
});

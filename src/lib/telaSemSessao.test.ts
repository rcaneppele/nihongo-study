import { describe, expect, it } from 'vitest';
import { telaSemSessao } from './telaSemSessao';

const rota = (r: string) => import.meta.env.BASE_URL.slice(0, -1) + r;

describe('telaSemSessao', () => {
  it.each(['/', '/aprender', '/praticar', '/praticar/ler', '/progresso', '/config', '/licoes', '/aprender/'])('%s: pode recarregar', (r) => {
    expect(telaSemSessao(rota(r))).toBe(true);
  });

  it.each(['/revisar', '/kana', '/kanji', '/flashcards', '/leitura', '/leitura/apresentacao', '/licoes/desu', '/licoes/quiz', '/aprender/palavras', '/pontos-fracos'])(
    '%s: pode haver sessão em andamento',
    (r) => {
      expect(telaSemSessao(rota(r))).toBe(false);
    }
  );
});

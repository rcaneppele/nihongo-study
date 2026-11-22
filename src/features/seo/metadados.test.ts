import { describe, expect, it } from 'vitest';
import { ROTAS } from '../../rotas';
import { LICOES } from '../../licoes';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import { SITE } from '../../lib/site';
import { caminhosIndexaveis, maisDe, metadadosDaRota, PAGINAS, urlCanonica } from './metadados';

describe('metadados de cada tela', () => {
  it('toda rota do app tem título e indexação definidos', () => {
    expect(ROTAS.map((r) => r.path).filter((path) => !(path in PAGINAS))).toEqual([]);
    expect(Object.keys(PAGINAS).filter((path) => !ROTAS.some((r) => r.path === path))).toEqual([]);
  });

  it('a página inicial usa o título e a descrição do site', () => {
    expect(metadadosDaRota('/')).toEqual({ titulo: SITE.titulo, descricao: SITE.descricao, indexar: true });
  });

  it('as outras telas levam o nome do app no fim do título', () => {
    expect(metadadosDaRota('/licoes').titulo).toBe('Lições de japonês · Nihongo Study');
    expect(metadadosDaRota('/licoes/').titulo).toBe('Lições de japonês · Nihongo Study');
  });

  it('lição: título e assunto da própria lição', () => {
    const m = metadadosDaRota('/licoes/particulas');
    expect(m.titulo).toBe('Partículas — lição de japonês · Nihongo Study');
    expect(m.descricao).toBe(
      'Lição de japonês para iniciantes, em português: Partículas (は, が, を, に, で e as outras). Com exemplos em kana e romaji.'
    );
    expect(m.indexar).toBe(true);
  });

  it('o subtítulo entra com inicial minúscula no meio da frase', () => {
    expect(metadadosDaRota('/licoes/kana').descricao).toContain('(os dois alfabetos fonéticos do japonês)');
  });

  it('as ferramentas das lições não caem na rota da lição', () => {
    expect(metadadosDaRota('/licoes/quiz').titulo).toBe('Quiz das lições · Nihongo Study');
  });

  it('texto de leitura: título em japonês e o resumo em português', () => {
    const texto = LEITURA_TEXTOS[0];
    const m = metadadosDaRota(`/leitura/${texto.id}`);
    expect(m.titulo).toBe(`${texto.title} — leitura em japonês · Nihongo Study`);
    expect(m.descricao.startsWith(texto.summaryPt)).toBe(true);
  });

  it('habilidade: o porquê dela como descrição', () => {
    const m = metadadosDaRota('/praticar/ouvir');
    expect(m.titulo).toBe('Ouvir em japonês · Nihongo Study');
    expect(m.descricao).toMatch(/^Entender japonês falado/);
  });

  it('telas de dados pessoais ficam fora do índice', () => {
    for (const rota of ['/revisar', '/flashcards', '/pontos-fracos', '/progresso', '/config']) {
      expect(metadadosDaRota(rota).indexar, rota).toBe(false);
    }
  });

  it('endereço que não existe fica fora do índice', () => {
    for (const rota of ['/nao-existe', '/licoes/nao-existe', '/leitura/nao-existe', '/praticar/nadar', '/praticar/toString']) {
      expect(metadadosDaRota(rota), rota).toEqual({
        titulo: 'Página não encontrada · Nihongo Study',
        descricao: SITE.descricao,
        indexar: false,
      });
    }
  });

  it('endereço canônico: produção, sem barra no fim', () => {
    expect(urlCanonica('/')).toBe('https://nihongostudy.app/');
    expect(urlCanonica('/kana')).toBe('https://nihongostudy.app/kana');
    expect(urlCanonica('/licoes/kana/')).toBe('https://nihongostudy.app/licoes/kana');
  });

  it('páginas indexáveis: as fixas, cada lição, cada texto e cada habilidade — sem as pessoais', () => {
    const caminhos = caminhosIndexaveis();
    expect(caminhos[0]).toBe('/');
    expect(caminhos).toEqual(expect.arrayContaining(LICOES.map((l) => `/licoes/${l.meta.id}`)));
    expect(caminhos).toEqual(expect.arrayContaining(LEITURA_TEXTOS.map((t) => `/leitura/${t.id}`)));
    expect(caminhos).toEqual(expect.arrayContaining(['/praticar/ler', '/praticar/escrever', '/licoes/quiz']));
    expect(caminhos).not.toContain('/config');
    expect(caminhos.some((c) => c.includes(':'))).toBe(false);
    expect(new Set(caminhos).size).toBe(caminhos.length);
  });

  it('título e descrição dentro do que os buscadores mostram sem cortar', () => {
    expect(SITE.titulo.length).toBeLessThanOrEqual(60);
    expect(SITE.descricao.length).toBeLessThanOrEqual(160);
    for (const caminho of caminhosIndexaveis()) {
      expect(metadadosDaRota(caminho).descricao.length, caminho).toBeGreaterThan(50);
    }
  });

  it('"mais de N" arredonda para baixo, na dezena', () => {
    expect(maisDe(718)).toBe('mais de 710');
    expect(maisDe(700)).toBe('mais de 700');
  });
});

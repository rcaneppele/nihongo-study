import { LICOES } from '../../licoes';
import { LEITURA_TEXTOS, NIVEIS_LEITURA } from '../../data/leitura/textos';
import { KANJI_N5 } from '../../data/kanji';
import { N5_DECK } from '../../data/seed/n5';
import { LISTA_HABILIDADES } from '../metodo/estrutura';
import { SITE, urlDoSite } from '../../lib/site';
import { RECURSOS } from '../../lib/recursos';
import { EMAIL_CONTATO, REPO_URL } from '../../lib/contato';
import { caminhosIndexaveis, maisDe, metadadosDaRota } from './metadados';

/**
 * Conteúdo dos arquivos públicos para buscadores e assistentes de IA, gerado
 * dos mesmos dados do app: `public/sitemap.xml` e `public/llms.txt`. Os
 * arquivos ficam versionados em `public/` e o teste `arquivosPublicos.test.ts`
 * confere que estão em dia — depois de criar uma lição ou um texto de leitura,
 * `npm test -u` os regrava.
 */

/** Páginas fora do app React (arquivos estáticos de `public/`) que também vão para o índice. */
const ARQUIVOS_ESTATICOS = ['/privacidade', '/manual-do-usuario.pdf'];

export function gerarSitemap(): string {
  const urls = [...caminhosIndexaveis(), ...ARQUIVOS_ESTATICOS].map(
    (caminho) => `  <url>\n    <loc>${escaparXml(urlDoSite(caminho))}</loc>\n  </url>`
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Gerado por src/features/seo/arquivosPublicos.ts — não edite à mão (npm test -u regrava). -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

function escaparXml(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Item de lista em Markdown com link: `- [título](url): descrição`. */
function item(caminho: string, titulo: string, descricao?: string): string {
  return `- [${titulo}](${urlDoSite(caminho)})${descricao ? `: ${descricao}` : ''}`;
}

/**
 * `llms.txt` (proposta em llmstxt.org): um resumo do site em Markdown, para
 * assistentes de IA entenderem o que o app é sem precisar rodar JavaScript.
 */
export function gerarLlmsTxt(): string {
  const descricaoDe = (caminho: string) => metadadosDaRota(caminho).descricao;
  return [
    `# ${SITE.nome}`,
    '',
    `> ${SITE.descricao}`,
    '',
    `${SITE.nome} é um app gratuito, de código aberto e sem fins comerciais para estudar japonês, feito para quem fala português e está começando do zero (até o nível do JLPT N5/N4). Roda no navegador como um app instalável (PWA), sem servidor: não tem cadastro, anúncios nem coleta de dados, e o progresso fica salvo no próprio aparelho — com sincronização opcional pelo Google Drive do próprio usuário. As lições e os textos de leitura são originais, escritos em português.`,
    '',
    `Conteúdo: ${LICOES.length} lições, ${LEITURA_TEXTOS.length} textos de leitura em ${NIVEIS_LEITURA.length} níveis, ${KANJI_N5.length} kanji e ${maisDe(N5_DECK.length)} palavras do vocabulário do JLPT N5.`,
    '',
    '## O que o app oferece',
    '',
    ...RECURSOS.map((r) => `- ${r}`),
    '',
    '## Por onde começar',
    '',
    item('/', 'Página inicial', 'o plano do dia (revisar, aprender e praticar)'),
    item('/aprender/comecar', 'Começando do zero', descricaoDe('/aprender/comecar')),
    item('/kana', 'Hiragana e katakana', descricaoDe('/kana')),
    item('/aprender', 'Aprender', descricaoDe('/aprender')),
    item('/praticar', 'Praticar', descricaoDe('/praticar')),
    '',
    '## Lições',
    '',
    ...LICOES.map(({ meta }) => item(`/licoes/${meta.id}`, meta.title, meta.subtitle)),
    '',
    '## Prática',
    '',
    item('/leitura', 'Leitura graduada', descricaoDe('/leitura')),
    item('/kanji', 'Kanji do N5', descricaoDe('/kanji')),
    item('/aprender/palavras', 'Palavras novas do N5', descricaoDe('/aprender/palavras')),
    ...LISTA_HABILIDADES.map((h) => item(`/praticar/${h.id}`, `${h.label} em japonês`, h.porque)),
    '',
    '## Mais informações',
    '',
    item('/manual-do-usuario.pdf', 'Manual do usuário (PDF)', 'como instalar no celular e usar cada parte do app'),
    item('/privacidade', 'Política de privacidade'),
    `- [Código-fonte no GitHub](${REPO_URL})`,
    `- Contato: ${EMAIL_CONTATO}`,
    '',
  ].join('\n');
}

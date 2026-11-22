import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../../lib/site';
import { metadadosDaRota, urlCanonica } from './metadados';

/**
 * Aplica no `<head>` o título, a descrição, o endereço canônico e a
 * indexação da tela atual (regras em `metadados.ts`). Não desenha nada.
 *
 * O título também é o que aparece na aba e no histórico do navegador. O
 * canônico só existe nas telas indexáveis: numa tela `noindex` ele seria um
 * sinal contraditório.
 */
export default function MetadadosDaPagina() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { titulo, descricao, indexar } = metadadosDaRota(pathname);
    document.title = titulo;
    tagDoHead('meta', 'name', 'description').setAttribute('content', descricao);
    tagDoHead('meta', 'name', 'robots').setAttribute('content', indexar ? SITE.robots : 'noindex, follow');
    if (indexar) tagDoHead('link', 'rel', 'canonical').setAttribute('href', urlCanonica(pathname));
    else document.head.querySelector('link[rel="canonical"]')?.remove();
  }, [pathname]);

  return null;
}

/** A tag do `<head>` com aquele atributo (ex.: `<meta name="robots">`), criada se ainda não existir. */
function tagDoHead(tag: 'meta' | 'link', atributo: 'name' | 'rel', valor: string): Element {
  const existente = document.head.querySelector(`${tag}[${atributo}="${valor}"]`);
  if (existente) return existente;
  const nova = document.createElement(tag);
  nova.setAttribute(atributo, valor);
  document.head.appendChild(nova);
  return nova;
}

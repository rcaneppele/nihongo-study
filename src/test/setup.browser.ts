// Setup dos testes de componente no navegador: banco limpo entre testes
// (o IndexedDB é o de verdade, do Chromium) e a tela desmontada.
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from 'vitest-browser-react';
import { limparBanco } from './banco';
// O CSS do app (Tailwind + utilitários), pra layout, rolagem e cores serem os reais.
import '../index.css';

beforeEach(limparBanco);
afterEach(cleanup);

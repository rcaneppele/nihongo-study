import type { ComponentType } from 'react';
import Home from './routes/Home';
import Flashcards from './routes/Flashcards';
import Kana from './routes/Kana';
import Kanji from './routes/Kanji';
import Leitura from './routes/Leitura';
import LeituraTexto from './routes/LeituraTexto';
import Licoes from './routes/Licoes';
import Licao from './routes/Licao';
import Quiz from './routes/Quiz';
import Kakitori from './routes/Kakitori';
import Diga from './routes/Diga';
import Gramatica from './routes/Gramatica';
import Diario from './routes/Diario';
import PontosFracos from './routes/PontosFracos';
import Aprender from './routes/Aprender';
import PalavrasNovas from './routes/PalavrasNovas';
import Praticar from './routes/Praticar';
import Habilidade from './routes/Habilidade';
import Revisar from './routes/Revisar';
import Progresso from './routes/Progresso';
import Config from './routes/Config';

/**
 * Rotas do app — fonte única: o `App` monta as rotas daqui, e os testes
 * conferem que todo link da navegação (estrutura do método) cai numa delas.
 * Ordem importa só para leitura: o React Router escolhe a mais específica.
 */
export const ROTAS: { path: string; Pagina: ComponentType }[] = [
  { path: '/', Pagina: Home },
  { path: '/flashcards', Pagina: Flashcards },
  { path: '/kana', Pagina: Kana },
  { path: '/kanji', Pagina: Kanji },
  { path: '/leitura', Pagina: Leitura },
  { path: '/leitura/:id', Pagina: LeituraTexto },
  { path: '/licoes', Pagina: Licoes },
  { path: '/licoes/quiz', Pagina: Quiz },
  { path: '/licoes/kakitori', Pagina: Kakitori },
  { path: '/licoes/diga', Pagina: Diga },
  { path: '/licoes/gramatica', Pagina: Gramatica },
  { path: '/licoes/diario', Pagina: Diario },
  { path: '/licoes/:id', Pagina: Licao },
  { path: '/pontos-fracos', Pagina: PontosFracos },
  { path: '/aprender', Pagina: Aprender },
  { path: '/aprender/palavras', Pagina: PalavrasNovas },
  { path: '/praticar', Pagina: Praticar },
  { path: '/praticar/:habilidade', Pagina: Habilidade },
  { path: '/revisar', Pagina: Revisar },
  { path: '/progresso', Pagina: Progresso },
  { path: '/config', Pagina: Config },
];

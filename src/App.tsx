import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
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
import PontosFracos from './routes/PontosFracos';
import Aprender from './routes/Aprender';
import PalavrasNovas from './routes/PalavrasNovas';
import Praticar from './routes/Praticar';
import Habilidade from './routes/Habilidade';
import Revisar from './routes/Revisar';
import Progresso from './routes/Progresso';
import Config from './routes/Config';

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/kana" element={<Kana />} />
        <Route path="/kanji" element={<Kanji />} />
        <Route path="/leitura" element={<Leitura />} />
        <Route path="/leitura/:id" element={<LeituraTexto />} />
        <Route path="/licoes" element={<Licoes />} />
        <Route path="/licoes/quiz" element={<Quiz />} />
        <Route path="/licoes/kakitori" element={<Kakitori />} />
        <Route path="/licoes/diga" element={<Diga />} />
        <Route path="/licoes/:id" element={<Licao />} />
        <Route path="/pontos-fracos" element={<PontosFracos />} />
        <Route path="/aprender" element={<Aprender />} />
        <Route path="/aprender/palavras" element={<PalavrasNovas />} />
        <Route path="/praticar" element={<Praticar />} />
        <Route path="/praticar/:habilidade" element={<Habilidade />} />
        <Route path="/revisar" element={<Revisar />} />
        <Route path="/progresso" element={<Progresso />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Layout>
  );
}

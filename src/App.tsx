import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './routes/Home';
import Flashcards from './routes/Flashcards';
import Kana from './routes/Kana';
import Licoes from './routes/Licoes';
import Licao from './routes/Licao';
import Quiz from './routes/Quiz';
import Config from './routes/Config';

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/kana" element={<Kana />} />
        <Route path="/licoes" element={<Licoes />} />
        <Route path="/licoes/quiz" element={<Quiz />} />
        <Route path="/licoes/:id" element={<Licao />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Layout>
  );
}

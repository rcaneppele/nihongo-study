import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Flashcards from './routes/Flashcards';
import Kana from './routes/Kana';
import ImportExport from './routes/ImportExport';
import Settings from './routes/Settings';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/kana" element={<Kana />} />
        <Route path="/dados" element={<ImportExport />} />
        <Route path="/config" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

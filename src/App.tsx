import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { ROTAS } from './rotas';

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        {ROTAS.map(({ path, Pagina }) => (
          <Route key={path} path={path} element={<Pagina />} />
        ))}
      </Routes>
    </Layout>
  );
}

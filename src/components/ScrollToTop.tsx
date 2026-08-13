import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Rola a página para o topo a cada navegação, já que o navegador não faz isso sozinho em SPAs. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

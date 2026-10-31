import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './lib/useTheme';
import { setupPWAUpdate } from './lib/pwaUpdate';
// Fontes empacotadas no próprio app (não vêm do Google) — funcionam offline.
// Versões variáveis: um arquivo cobre todos os pesos, o que deixa o CSS bem
// menor (a Noto Sans JP é fatiada em ~120 faixas de caracteres por fonte).
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/noto-sans-jp/wght.css';
import './index.css';

setupPWAUpdate();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './lib/useTheme';
import { setupPWAUpdate } from './lib/pwaUpdate';
import { processarRetornoOAuth } from './features/sync/googleAuth';
import { iniciarSync } from './features/sync/motor';
import { pedirArmazenamentoPersistente } from './features/backup/persistencia';
import { acompanharVelocidadeDaFala } from './features/audio/speech';
import { guardarCopiaAntesDeMigrar } from './db/copiaMigracao';
import { SCHEMA_VERSION } from './db/backup';
// Fontes empacotadas no próprio app (não vêm do Google) — funcionam offline.
// Versões variáveis: um arquivo cobre todos os pesos, o que deixa o CSS bem
// menor (a Noto Sans JP é fatiada em ~120 faixas de caracteres por fonte).
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/noto-sans-jp/wght.css';
import './index.css';

/** A cópia não pode segurar a abertura do app se o navegador travar no IndexedDB. */
const LIMITE_COPIA_MS = 5000;

setupPWAUpdate();

void (async () => {
  // Antes de qualquer uso de `db`: abrir o banco é o que dispara a migração.
  // Por isso nenhum módulo pode tocar em `db` só de ser importado (a jornada
  // "Cópia de antes de migrar" confere).
  await Promise.race([
    guardarCopiaAntesDeMigrar(SCHEMA_VERSION),
    new Promise((resolve) => setTimeout(resolve, LIMITE_COPIA_MS)),
  ]);

  acompanharVelocidadeDaFala();

  // Na volta do login do Google, guarda o token e limpa o endereço antes do
  // roteador ler a URL (nas outras aberturas, não espera nada).
  const retorno = await processarRetornoOAuth().catch(() => null);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );

  void iniciarSync(retorno);
  pedirArmazenamentoPersistente().catch((err) => console.warn('Não foi possível pedir armazenamento persistente.', err));
})();

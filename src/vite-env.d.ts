/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  /** OAuth Client ID do Google (tipo "Aplicativo da Web"). Sem ele, a sincronização com o Drive não aparece. */
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

// Aplica o tema antes do primeiro paint, pra não piscar o tema errado. A preferência
// definitiva mora no IndexedDB (src/lib/useTheme.tsx); este localStorage é só um cache
// rápido e síncrono pra esse primeiro instante, antes do Dexie responder.
// Arquivo próprio (e não um <script> inline no index.html) para a
// Content-Security-Policy poder proibir script inline — ver config/cabecalhos.ts.
(function () {
  try {
    var saved = localStorage.getItem('nihongo-study:theme');
    var dark = saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();

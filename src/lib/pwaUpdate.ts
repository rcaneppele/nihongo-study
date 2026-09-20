/**
 * Registro do service worker com atualização automática.
 *
 * O script que o vite-plugin-pwa injeta sozinho por padrão
 * (`injectRegister: 'auto'`, desligado aqui em `vite.config.ts`) é só um
 * `navigator.serviceWorker.register(...)` puro — mesmo com
 * `registerType: 'autoUpdate'` no build. Isso não fazia o service worker
 * novo assumir sozinho: o worker gerado (`sw.js`) só troca de versão quando
 * recebe a mensagem `SKIP_WAITING` (é assim que o Workbox monta o
 * `generateSW`), e nada no app nunca mandava essa mensagem. Na prática, a
 * troca dependia inteiramente do comportamento padrão do navegador — que só
 * ativa o worker novo depois que TODAS as abas/instâncias do app fecham — e
 * só era percebida quando o usuário forçava vários recarregamentos seguidos.
 *
 * Este registro manual resolve isso:
 * 1. `updateViaCache: 'none'` — o navegador nunca usa cache HTTP para buscar
 *    o próprio `sw.js`, sempre confere a versão real do servidor (GitHub
 *    Pages não permite configurar `Cache-Control` por arquivo).
 * 2. Checagem periódica + ao voltar o app para primeiro plano
 *    (`visibilitychange`) — não depende mais do usuário abrir/recarregar
 *    manualmente para o app notar que existe uma versão nova.
 * 3. Assim que um worker novo termina de instalar, manda `SKIP_WAITING` pra
 *    ele — é isso que faz o worker assumir sem esperar todas as abas
 *    fecharem.
 * 4. Quando o controller troca (o worker novo assumiu), recarrega a página
 *    uma única vez, trocando os arquivos estáticos (JS/CSS) já carregados
 *    na aba pelos novos — sem isso as telas que mudaram só apareceriam
 *    depois de outro recarregamento manual.
 */

const CHECK_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

export function setupPWAUpdate(): void {
  if (!('serviceWorker' in navigator)) return;

  // Só recarrega quando o controller trocar se a página já estava
  // controlada por ALGUM service worker antes deste registro — sem isso, a
  // primeiríssima instalação do PWA (sem nenhum controller ainda) também
  // dispararia um reload, sem nenhuma atualização real ter acontecido.
  const hadController = Boolean(navigator.serviceWorker.controller);

  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
      updateViaCache: 'none',
    });

    function activateWaitingWorker(worker: ServiceWorker) {
      worker.postMessage({ type: 'SKIP_WAITING' });
    }

    // Um worker pode já estar esperando de uma checagem anterior (ex.: a
    // página carregou entre o worker terminar de instalar e nós chegarmos
    // aqui) — manda ativar direto, sem esperar o evento `updatefound`.
    if (registration.waiting) activateWaitingWorker(registration.waiting);

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        // `navigator.serviceWorker.controller` só existe se já havia um
        // worker anterior controlando a página — ou seja, isso é de fato
        // uma atualização, não a instalação inicial do PWA.
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          activateWaitingWorker(newWorker);
        }
      });
    });

    const checkForUpdate = () => registration.update().catch(() => {});
    setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    });
  });

  if (hadController) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }
}

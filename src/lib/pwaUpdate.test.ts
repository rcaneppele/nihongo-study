import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// O módulo guarda se há atualização esperando: cada teste carrega uma cópia nova dele.
let setupPWAUpdate: typeof import('./pwaUpdate').setupPWAUpdate;
let aplicarAtualizacaoPendente: typeof import('./pwaUpdate').aplicarAtualizacaoPendente;

/**
 * Atualização automática do PWA: registrar o service worker, mandar o
 * worker novo assumir e recarregar uma vez só quando ele assume. Service
 * worker, janela e documento simulados; relógio falso.
 */

type Ouvinte = () => void | Promise<void>;

class Alvo {
  ouvintes: Record<string, Ouvinte[]> = {};
  addEventListener(tipo: string, f: Ouvinte) {
    (this.ouvintes[tipo] ??= []).push(f);
  }
  async disparar(tipo: string) {
    for (const f of this.ouvintes[tipo] ?? []) await f();
  }
}

class Worker extends Alvo {
  state = 'installing';
  mensagens: unknown[] = [];
  postMessage(m: unknown) {
    this.mensagens.push(m);
  }
}

class Registro extends Alvo {
  waiting: Worker | null = null;
  installing: Worker | null = null;
  update = vi.fn(async () => {});
}

class ServiceWorkers extends Alvo {
  controller: object | null = null;
  registro = new Registro();
  falha = false;
  register = vi.fn(async () => {
    if (this.falha) throw new Error('bloqueado');
    return this.registro;
  });
}

const SKIP = [{ type: 'SKIP_WAITING' }];
let sw: ServiceWorkers;
let janela: Alvo & { location: { reload: ReturnType<typeof vi.fn> } };
let documento: Alvo & { visibilityState: string };

beforeEach(async () => {
  vi.resetModules();
  ({ setupPWAUpdate, aplicarAtualizacaoPendente } = await import('./pwaUpdate'));
  vi.useFakeTimers();
  sw = new ServiceWorkers();
  janela = Object.assign(new Alvo(), { location: { reload: vi.fn() } });
  documento = Object.assign(new Alvo(), { visibilityState: 'visible' });
  vi.stubGlobal('navigator', { serviceWorker: sw });
  vi.stubGlobal('window', janela);
  vi.stubGlobal('document', documento);
  irPara('/');
});

/** A tela em que o app está (o caminho da página). */
function irPara(rota: string) {
  vi.stubGlobal('location', { pathname: import.meta.env.BASE_URL.slice(0, -1) + rota });
}
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

/** Liga a atualização e deixa a página "carregar" (o registro acontece no `load`). */
async function abrirApp() {
  setupPWAUpdate();
  await janela.disparar('load');
}

describe('setupPWAUpdate', () => {
  it('navegador sem service worker: não faz nada', () => {
    vi.stubGlobal('navigator', {});
    setupPWAUpdate();
    expect(janela.ouvintes.load).toBeUndefined();
  });

  it('registra o sw.js sem cache HTTP (sempre confere a versão do servidor)', async () => {
    await abrirApp();
    expect(sw.register).toHaveBeenCalledWith(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
      updateViaCache: 'none',
    });
  });

  it('registro bloqueado (modo privado): o app segue sem erro e sem checagens', async () => {
    sw.falha = true;
    await abrirApp();
    await vi.advanceTimersByTimeAsync(2 * 60 * 60 * 1000);
    expect(sw.registro.update).not.toHaveBeenCalled();
  });

  it('worker que já estava esperando é mandado assumir na hora', async () => {
    const esperando = new Worker();
    sw.registro.waiting = esperando;
    await abrirApp();
    expect(esperando.mensagens).toEqual(SKIP);
  });

  it('versão nova instalada com o app já controlado: manda assumir', async () => {
    sw.controller = {};
    await abrirApp();
    const novo = new Worker();
    sw.registro.installing = novo;
    await sw.registro.disparar('updatefound');
    await novo.disparar('statechange'); // ainda instalando
    expect(novo.mensagens).toEqual([]);
    novo.state = 'installed';
    await novo.disparar('statechange');
    expect(novo.mensagens).toEqual(SKIP);
  });

  it('primeira instalação (sem worker anterior): não manda assumir nem recarrega', async () => {
    await abrirApp();
    const primeiro = new Worker();
    sw.registro.installing = primeiro;
    await sw.registro.disparar('updatefound');
    primeiro.state = 'installed';
    await primeiro.disparar('statechange');
    expect(primeiro.mensagens).toEqual([]);
    await sw.disparar('controllerchange');
    expect(janela.location.reload).not.toHaveBeenCalled();
  });

  it('`updatefound` sem worker instalando: ignora', async () => {
    await abrirApp();
    await expect(sw.registro.disparar('updatefound')).resolves.toBeUndefined();
  });

  it('quando o worker novo assume, recarrega a página uma vez só', async () => {
    sw.controller = {};
    await abrirApp();
    await sw.disparar('controllerchange');
    await sw.disparar('controllerchange');
    expect(janela.location.reload).toHaveBeenCalledOnce();
  });

  it('no meio de uma sessão de estudo não recarrega: espera a pessoa chegar a uma tela sem sessão', async () => {
    sw.controller = {};
    irPara('/revisar');
    await abrirApp();
    await sw.disparar('controllerchange');
    expect(janela.location.reload).not.toHaveBeenCalled();
    // Trocar para outra tela de estudo ainda não recarrega…
    irPara('/leitura/apresentacao');
    aplicarAtualizacaoPendente();
    expect(janela.location.reload).not.toHaveBeenCalled();
    // …só ao chegar num hub (Início, Aprender, Praticar, Progresso, Configurações).
    irPara('/aprender');
    aplicarAtualizacaoPendente();
    expect(janela.location.reload).toHaveBeenCalledOnce();
  });

  it('sem atualização esperando, trocar de tela não recarrega nada', async () => {
    sw.controller = {};
    await abrirApp();
    aplicarAtualizacaoPendente();
    expect(janela.location.reload).not.toHaveBeenCalled();
  });

  it('procura versão nova de hora em hora e ao voltar para o app (não ao sair dele)', async () => {
    await abrirApp();
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(sw.registro.update).toHaveBeenCalledTimes(1);
    documento.visibilityState = 'hidden';
    await documento.disparar('visibilitychange');
    expect(sw.registro.update).toHaveBeenCalledTimes(1);
    documento.visibilityState = 'visible';
    await documento.disparar('visibilitychange');
    expect(sw.registro.update).toHaveBeenCalledTimes(2);
  });

  it('falha ao procurar versão nova (sem internet) não vira erro', async () => {
    await abrirApp();
    sw.registro.update.mockRejectedValueOnce(new Error('offline'));
    await expect(vi.advanceTimersByTimeAsync(60 * 60 * 1000)).resolves.toBeDefined();
  });
});

import { useEffect, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { PILULA, TEXTO } from '../lib/cores';
import { SECOES, secaoDaRota, type Secao } from '../features/metodo/estrutura';
import { usePendencias } from '../features/metodo/pendencias';
import { aoMudarDeTela, useEstadoSync } from '../features/sync/motor';

// Navegação pelo método (Hoje · Aprender · Praticar · Revisar · Progresso),
// definida em src/features/metodo/estrutura.ts. A seção ativa vem da rota
// (`secaoDaRota`), não do link clicado — assim, dentro de uma ferramenta
// (ex.: /leitura/abc), o menu continua mostrando onde ela mora no método.

export default function Layout({ children }: { children: ReactNode }) {
  const pendencias = usePendencias();
  const location = useLocation();
  const ativa = secaoDaRota(location.pathname, location.search);
  const sincronizado = useEstadoSync()?.conectado;

  // Acesso ao Google vencido com o app aberto: renova ao chegar numa tela sem sessão de estudo.
  useEffect(() => {
    void aoMudarDeTela();
  }, [location.pathname]);

  return (
    <div className="flex min-h-full">
      <Sidebar pendencias={pendencias} ativa={ativa} />

      <div className="flex min-h-full min-w-0 flex-1 flex-col md:pl-60">
        <MobileTopBar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-5 sm:px-6 md:pb-16 md:pt-8 lg:px-8">
          {children}
        </main>

        <footer className="border-t border-line py-4 text-center text-xs text-sage">
          Estudo de japonês · {sincronizado ? 'dados sincronizados com o Google Drive' : 'dados salvos só neste dispositivo'}
        </footer>
      </div>

      <BottomNav pendencias={pendencias} ativa={ativa} />
    </div>
  );
}

/** Ícone do app (sem o texto do logo, que fica ilegível em tamanho pequeno); o logo completo fica em Config > Sobre. */
function Logo({ className }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
      alt=""
      className={`rounded-xl object-contain shadow-sm ${className ?? ''}`}
    />
  );
}

/** Celular: barra fina no topo (logo + nome + versão + configurações) no lugar do antigo logo grande. */
function MobileTopBar() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/90 px-4 py-2 backdrop-blur md:hidden">
      <NavLink to="/" className="flex items-center gap-2">
        <Logo className="h-8 w-8" />
        <span className="font-semibold tracking-tight">Nihongo Study</span>
        <span className="text-[11px] text-sage">v{__APP_VERSION__}</span>
      </NavLink>
      <NavLink
        to="/config"
        aria-label="Configurações e dados"
        className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-line/50"
      >
        <Settings className="h-5 w-5" />
      </NavLink>
    </div>
  );
}

type Pendencias = ReturnType<typeof usePendencias>;

function Sidebar({ pendencias, ativa }: { pendencias: Pendencias; ativa: Secao['id'] | null }) {
  const location = useLocation();
  const filhoAtivo = (to: string) => location.pathname === to;

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col overflow-y-auto border-r border-line bg-surface/70 px-3 py-4 md:flex">
      <NavLink to="/" className="mb-5 flex items-center gap-2.5 px-2">
        <Logo className="h-9 w-9" />
        <span className="leading-tight">
          <span className="block font-semibold tracking-tight">Nihongo Study</span>
          <span className="block text-[11px] text-sage">v{__APP_VERSION__}</span>
        </span>
      </NavLink>

      <nav className="flex flex-1 flex-col gap-1">
        {SECOES.map((secao) => {
          const ativo = ativa === secao.id;
          const n = secao.pendencia ? pendencias[secao.pendencia] : 0;
          return (
            <div key={secao.id}>
              <Link
                to={secao.to}
                className={[
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
                  ativo ? PILULA[secao.cor] : 'text-ink/85 hover:bg-line/50 hover:text-ink',
                ].join(' ')}
              >
                <secao.icone className={`h-[18px] w-[18px] shrink-0 ${ativo ? '' : TEXTO[secao.cor]}`} />
                <span className="flex-1">{secao.label}</span>
                {n > 0 && <span className="badge bg-hanko text-paper">{n}</span>}
              </Link>
              {secao.filhos && (
                <div className="mb-2 ml-[1.15rem] mt-0.5 space-y-0.5 border-l border-line pl-3">
                  {secao.filhos.map((f) => (
                    <Link
                      key={f.to + f.label}
                      to={f.to}
                      className={[
                        'block rounded-lg px-2 py-1 text-[13px] transition-colors',
                        ativo && filhoAtivo(f.to) ? `font-semibold ${TEXTO[secao.cor]}` : 'text-sage hover:text-ink',
                      ].join(' ')}
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <NavLink
        to="/config"
        className={({ isActive }) =>
          [
            'mt-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
            isActive ? 'bg-indigo/8 text-indigo' : 'text-ink/80 hover:bg-line/50 hover:text-ink',
          ].join(' ')
        }
      >
        <Settings className="h-[18px] w-[18px] shrink-0" />
        Configurações
      </NavLink>
    </aside>
  );
}

function BottomNav({ pendencias, ativa }: { pendencias: Pendencias; ativa: Secao['id'] | null }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden">
      {SECOES.map((secao) => {
        const ativo = ativa === secao.id;
        const n = secao.pendencia ? pendencias[secao.pendencia] : 0;
        return (
          <Link
            key={secao.id}
            to={secao.to}
            className={[
              'flex flex-1 flex-col items-center gap-0.5 py-1.5 text-xs transition-colors whitespace-nowrap',
              ativo ? `font-semibold ${TEXTO[secao.cor]}` : 'font-medium text-sage',
            ].join(' ')}
          >
            {/* Pílula na cor da seção atrás do ícone marca a aba atual (mesmo
                espaço quando inativa, pra nada pular ao trocar de aba). */}
            <span
              className={`relative flex items-center justify-center rounded-full px-4 py-1 transition-colors ${
                ativo ? PILULA[secao.cor] : ''
              }`}
            >
              <secao.icone className="h-5 w-5" />
              {n > 0 && (
                <span className="absolute right-2.5 top-0.5 h-2 w-2 rounded-full bg-hanko ring-2 ring-paper" aria-hidden />
              )}
            </span>
            {secao.label}
          </Link>
        );
      })}
    </nav>
  );
}

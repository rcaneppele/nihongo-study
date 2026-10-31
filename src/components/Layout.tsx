import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { BookOpen, BookOpenText, Copy, House, Settings, Target, type LucideIcon } from 'lucide-react';
import { db } from '../db/schema';
import { buildReviewQueue } from '../features/flashcards/stages';
import { PILULA, TEXTO, type Cor } from '../lib/cores';

// `shortLabel` é o rótulo usado na barra inferior do mobile — com 6 itens
// numa tela estreita, "Flash cards" (o mais longo) quebra linha e desalinha
// os ícones dos outros itens. Cai pra "Cards" só ali; a barra lateral do
// desktop (mais espaço) sempre usa `label`.
//
// `group` agrupa os itens na barra lateral por intenção (aprender conteúdo
// novo × praticar/revisar o que já viu). `sidebarOnly` fica fora da barra
// inferior do celular, que já está no limite de itens — esses têm atalho na
// Home.
//
// `cor` é a cor do módulo (src/lib/cores.ts) — pinta o ícone na lateral e o
// indicador do item ativo na barra do celular, pra navegação e atalhos da
// Home falarem a mesma língua visual.
// `badge` diz qual contador de pendências aparece ao lado do item.
interface NavItem {
  to: string;
  label: string;
  shortLabel?: string;
  end: boolean;
  icon: LucideIcon | ((props: { className?: string }) => ReactNode);
  cor: Cor;
  group?: 'Aprender' | 'Praticar';
  sidebarOnly?: boolean;
  badge?: 'cards' | 'kanji';
}

const NAV: NavItem[] = [
  { to: '/', label: 'Início', end: true, icon: House, cor: 'indigo' },
  { to: '/licoes', label: 'Lições', end: false, icon: BookOpen, cor: 'fuji', group: 'Aprender' },
  { to: '/leitura', label: 'Leitura', shortLabel: 'Ler', end: false, icon: BookOpenText, cor: 'matcha', group: 'Aprender' },
  { to: '/kanji', label: 'Kanji', end: false, icon: IconKanji, cor: 'hanko', group: 'Aprender', badge: 'kanji' },
  { to: '/flashcards', label: 'Flash cards', shortLabel: 'Cards', end: false, icon: Copy, cor: 'sora', group: 'Praticar', badge: 'cards' },
  { to: '/kana', label: 'Kana', end: false, icon: IconKana, cor: 'kin', group: 'Praticar' },
  { to: '/pontos-fracos', label: 'Pontos fracos', end: false, icon: Target, cor: 'sakura', group: 'Praticar', sidebarOnly: true },
];

/** Pendências de revisão pros badges da navegação (mesma fila do "Estudar" e dos kanji vencidos). */
function usePendencias(): Record<'cards' | 'kanji', number> {
  const cards = useLiveQuery(async () => buildReviewQueue(await db.cards.toArray()).length, [], 0);
  const kanji = useLiveQuery(() => db.kanjiProgress.where('dueDate').belowOrEqual(Date.now()).count(), [], 0);
  return { cards, kanji };
}

export default function Layout({ children }: { children: ReactNode }) {
  const pendencias = usePendencias();

  return (
    <div className="flex min-h-full">
      <Sidebar pendencias={pendencias} />

      <div className="flex min-h-full min-w-0 flex-1 flex-col md:pl-60">
        <MobileTopBar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-5 sm:px-6 md:pb-16 md:pt-8 lg:px-8">
          {children}
        </main>

        <footer className="border-t border-line py-4 text-center text-xs text-sage">
          Estudo de japonês · dados salvos só neste dispositivo
        </footer>
      </div>

      <BottomNav pendencias={pendencias} />
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

/** Celular: barra fina no topo (logo + nome + configurações) no lugar do antigo logo grande. */
function MobileTopBar() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/90 px-4 py-2 backdrop-blur md:hidden">
      <NavLink to="/" className="flex items-center gap-2">
        <Logo className="h-8 w-8" />
        <span className="font-semibold tracking-tight">Nihongo Study</span>
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

function Sidebar({ pendencias }: { pendencias: Record<'cards' | 'kanji', number> }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-surface/70 px-3 py-4 md:flex">
      <NavLink to="/" className="mb-5 flex items-center gap-2.5 px-2">
        <Logo className="h-9 w-9" />
        <span className="leading-tight">
          <span className="block font-semibold tracking-tight">Nihongo Study</span>
          <span className="block text-[11px] text-sage">v{__APP_VERSION__}</span>
        </span>
      </NavLink>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item, i) => (
          <div key={item.to}>
            {item.group && item.group !== NAV[i - 1]?.group && (
              <p className="mb-1 mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-sage/80">
                {item.group}
              </p>
            )}
            <NavLink to={item.to} end={item.end} className={sidebarLinkClass}>
              {({ isActive }) => (
                <>
                  <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive || item.cor === 'indigo' ? '' : TEXTO[item.cor]}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && pendencias[item.badge] > 0 && (
                    <span className="badge bg-hanko text-paper">{pendencias[item.badge]}</span>
                  )}
                </>
              )}
            </NavLink>
          </div>
        ))}
      </nav>

      <NavLink to="/config" className={sidebarLinkClass}>
        <Settings className="h-[18px] w-[18px] shrink-0" />
        Configurações
      </NavLink>
    </aside>
  );
}

function sidebarLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-indigo/8 text-indigo' : 'text-ink/80 hover:bg-line/50 hover:text-ink',
  ].join(' ');
}

function BottomNav({ pendencias }: { pendencias: Record<'cards' | 'kanji', number> }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden">
      {NAV.filter((item) => !item.sidebarOnly).map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => bottomNavLinkClass(isActive, item.cor)}
        >
          {({ isActive }) => (
            <>
              {/* Pílula na cor do módulo atrás do ícone marca a aba atual (mesmo
                  espaço quando inativa, pra nada pular ao trocar de aba). */}
              <span
                className={`relative flex items-center justify-center rounded-full px-4 py-1 transition-colors ${
                  isActive ? PILULA[item.cor] : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.badge && pendencias[item.badge] > 0 && (
                  <span className="absolute right-2.5 top-0.5 h-2 w-2 rounded-full bg-hanko ring-2 ring-paper" aria-hidden />
                )}
              </span>
              {item.shortLabel ?? item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function bottomNavLinkClass(isActive: boolean, cor: Cor) {
  return [
    'flex flex-1 flex-col items-center gap-0.5 py-1.5 text-xs transition-colors whitespace-nowrap',
    isActive ? `font-semibold ${TEXTO[cor]}` : 'font-medium text-sage',
  ].join(' ');
}

function IconKana({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`grid place-items-center font-jp text-[0.95rem] leading-none ${className ?? ''}`}>
      あ
    </span>
  );
}

function IconKanji({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`grid place-items-center font-jp text-[0.95rem] leading-none ${className ?? ''}`}>
      字
    </span>
  );
}

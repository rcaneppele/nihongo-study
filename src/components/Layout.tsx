import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react';
import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Início', end: true, icon: IconHome },
  { to: '/flashcards', label: 'Flash cards', end: false, icon: IconCards },
  { to: '/kana', label: 'Kana', end: false, icon: IconKana },
];

const GEAR_LINKS = [
  { to: '/dados', label: 'Dados' },
  { to: '/config', label: 'Config' },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full">
      <Sidebar />

      <div className="flex min-h-full flex-1 flex-col md:pl-60">
        <Jumbotron />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 md:pb-16">
          {children}
        </main>

        <footer className="border-t border-line py-4 text-center text-xs text-sage">
          Estudo de japonês · dados salvos só neste dispositivo
        </footer>
      </div>

      <BottomNav />
    </div>
  );
}

function Jumbotron() {
  return (
    <div className="relative border-b border-line bg-gradient-to-b from-indigo/5 to-transparent px-4 py-8 text-center sm:py-10">
      <div className="absolute right-4 top-4">
        <SettingsMenu />
      </div>
      <NavLink to="/" className="inline-block">
        <img src="/logo.png" alt="Nihongo Study" className="mx-auto h-32 sm:h-40 md:h-44" />
      </NavLink>
      <p className="mt-1 text-sage">Flash cards e treino de hiragana/katakana</p>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-white/60 px-3 py-5 md:flex">
      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={sidebarLinkClass}>
            <item.icon className="h-5 w-5 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function sidebarLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    isActive ? 'bg-indigo text-paper' : 'text-ink hover:bg-line/50',
  ].join(' ');
}

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-paper/95 backdrop-blur md:hidden">
      {NAV.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={bottomNavLinkClass}>
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function bottomNavLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors',
    isActive ? 'text-indigo' : 'text-sage',
  ].join(' ');
}

function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Configurações e dados"
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 text-ink transition-colors hover:bg-line/40"
      >
        <IconGear className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-20 w-44 overflow-hidden rounded-lg border border-line bg-white text-left shadow-md"
        >
          {GEAR_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'block px-4 py-2.5 text-sm transition-colors',
                  isActive ? 'bg-indigo/10 font-medium text-indigo' : 'text-ink hover:bg-line/40',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function IconCards(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7" y="3" width="13" height="15" rx="2" />
      <path d="M4 7v13a1 1 0 0 0 1 1h13" />
    </svg>
  );
}

function IconKana({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`grid place-items-center font-jp text-[0.95rem] leading-none ${className ?? ''}`}>
      あ
    </span>
  );
}

const GEAR_TEETH = [0, 45, 90, 135, 180, 225, 270, 315];

function IconGear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth={2.4} />
      {GEAR_TEETH.map((deg) => (
        <rect key={deg} x="10.9" y="2.6" width="2.2" height="3.4" rx="0.6" transform={`rotate(${deg} 12 12)`} />
      ))}
    </svg>
  );
}

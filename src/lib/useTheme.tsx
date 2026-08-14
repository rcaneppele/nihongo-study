import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { db } from '../db/schema';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
}

const META_KEY = 'theme';
// Cache local só pra aplicar o tema antes do primeiro paint (ver index.html); a preferência
// de verdade fica no Dexie (db.meta), que também entra no backup/export.
const STORAGE_KEY = 'nihongo-study:theme';
const LIGHT_STATUS_BAR = '#1E3A5F';
const DARK_STATUS_BAR = '#14161A';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readCachedMode);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => resolveTheme(readCachedMode()));

  useEffect(() => {
    db.meta.get(META_KEY).then((entry) => {
      if (isThemeMode(entry?.value)) setModeState(entry.value);
    });
  }, []);

  useEffect(() => {
    function apply() {
      const resolved = resolveTheme(mode);
      document.documentElement.classList.toggle('dark', resolved === 'dark');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', resolved === 'dark' ? DARK_STATUS_BAR : LIGHT_STATUS_BAR);
      setResolvedTheme(resolved);
    }

    apply();
    if (mode !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);

  function setMode(next: ThemeMode) {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    db.meta.put({ key: META_KEY, value: next });
  }

  return <ThemeContext.Provider value={{ mode, resolvedTheme, setMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme precisa estar dentro de um ThemeProvider');
  return ctx;
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readCachedMode(): ThemeMode {
  const cached = localStorage.getItem(STORAGE_KEY);
  return isThemeMode(cached) ? cached : 'system';
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

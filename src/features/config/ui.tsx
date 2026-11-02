import { useEffect, type ReactNode } from 'react';
import { TILE, type Cor } from '../../lib/cores';

export function HelpButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-5 w-5 place-items-center rounded-full border border-line text-[11px] font-semibold text-sage hover:border-indigo hover:text-indigo"
    >
      ?
    </button>
  );
}

export function HelpModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-paper p-5 shadow-lg space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="help-modal-title" className="font-display text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-sage hover:bg-line/40 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {children}

        <button className="btn-ghost w-full" onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-0.5">
      <p className="label">{label}</p>
      {children}
    </div>
  );
}

/** Título de seção com ícone num tile pequeno, na cor do assunto. */
export function SectionTitle({ icon, cor, children }: { icon: ReactNode; cor: Cor; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 font-medium">
      <span className={`icon-tile h-8 w-8 rounded-lg ${TILE[cor]}`}>{icon}</span>
      {children}
    </h2>
  );
}

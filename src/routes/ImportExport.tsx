import { useRef, useState } from 'react';
import { db } from '../db/schema';
import { exportData, downloadBackup, parseBackup, importData, type ImportMode } from '../db/backup';
import { parseCardsCsv, parseCardsJson } from '../features/flashcards/importCards';

export default function ImportExport() {
  const [mode, setMode] = useState<ImportMode>('replace');
  const [msg, setMsg] = useState<string | null>(null);
  const backupInput = useRef<HTMLInputElement>(null);
  const cardsInput = useRef<HTMLInputElement>(null);

  async function handleExport() {
    const data = await exportData();
    downloadBackup(data);
    setMsg('Backup exportado.');
  }

  async function handleImportBackup(file: File) {
    try {
      const backup = parseBackup(await file.text());
      await importData(backup, mode);
      setMsg(`Backup importado (${mode === 'replace' ? 'substituiu tudo' : 'mesclado'}).`);
    } catch (err) {
      setMsg(`Erro: ${(err as Error).message}`);
    }
  }

  async function handleImportCards(file: File) {
    try {
      const text = await file.text();
      const cards = file.name.endsWith('.json') ? parseCardsJson(text) : parseCardsCsv(text);
      await db.cards.bulkAdd(cards);
      setMsg(`${cards.length} card(s) importado(s).`);
    } catch (err) {
      setMsg(`Erro: ${(err as Error).message}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dados</h1>
        <p className="text-sm text-sage">
          Sem servidor: exporte num aparelho e importe no outro para sincronizar. O backup
          também protege contra perda de dados.
        </p>
      </div>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Backup completo</h2>
        <p className="text-sm text-sage">Exporta cards, histórico e progresso de kana num único JSON.</p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-primary" onClick={handleExport}>
            Exportar backup
          </button>

          <div className="inline-flex rounded-lg border border-line p-1 text-sm">
            <button
              className={`rounded-md px-3 py-1.5 ${mode === 'replace' ? 'bg-indigo text-paper' : ''}`}
              onClick={() => setMode('replace')}
            >
              Substituir
            </button>
            <button
              className={`rounded-md px-3 py-1.5 ${mode === 'merge' ? 'bg-indigo text-paper' : ''}`}
              onClick={() => setMode('merge')}
            >
              Mesclar
            </button>
          </div>

          <button className="btn-ghost" onClick={() => backupInput.current?.click()}>
            Importar backup
          </button>
          <input
            ref={backupInput}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImportBackup(e.target.files[0])}
          />
        </div>
      </section>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Importar cards</h2>
        <p className="text-sm text-sage">
          CSV no formato <code>front,back,reading,category,tags</code> (tags separadas por ;) ou um
          array JSON.
        </p>
        <button className="btn-ghost" onClick={() => cardsInput.current?.click()}>
          Escolher arquivo
        </button>
        <input
          ref={cardsInput}
          type="file"
          accept=".csv,.json,text/csv,application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleImportCards(e.target.files[0])}
        />
      </section>

      {msg && <p className="text-sm text-indigo">{msg}</p>}
    </div>
  );
}

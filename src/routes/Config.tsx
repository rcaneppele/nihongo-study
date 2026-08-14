import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db, newId } from '../db/schema';
import { freshSrs } from '../features/srs/sm2';
import { exportData, downloadBackup, parseBackup, importData, type ImportMode } from '../db/backup';
import { parseCardsFile } from '../features/flashcards/importCards';

const REPO_URL = 'https://github.com/rcaneppele/nihongo-study';

type TabKey = 'dados' | 'config' | 'sobre';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'dados', label: 'Dados' },
  { key: 'config', label: 'Configurações' },
  { key: 'sobre', label: 'Sobre o App' },
];

export default function Config() {
  const [params, setParams] = useSearchParams();
  const tab = asTabKey(params.get('tab')) ?? 'dados';

  function setTab(key: TabKey) {
    setParams(key === 'dados' ? {} : { tab: key }, { replace: true });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Config</h1>
        <p className="text-sm text-sage">Dados, configurações e informações sobre o app.</p>
      </div>

      <div role="tablist" aria-label="Seções de configuração" className="flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={[
              'rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
              tab === t.key
                ? 'border border-b-0 border-line bg-white text-indigo'
                : 'text-sage hover:text-ink',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'dados' && <DadosTab />}
        {tab === 'config' && <ConfiguracoesTab />}
        {tab === 'sobre' && <SobreTab />}
      </div>
    </div>
  );
}

function asTabKey(value: string | null): TabKey | null {
  return TABS.some((t) => t.key === value) ? (value as TabKey) : null;
}

function DadosTab() {
  const [mode, setMode] = useState<ImportMode>('replace');
  const [msg, setMsg] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
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
      const cards = parseCardsFile(text, file.name);
      if (cards.length === 0) throw new Error('Nenhum card encontrado no arquivo.');
      await db.cards.bulkAdd(cards);
      setMsg(`${cards.length} card(s) importado(s).`);
    } catch (err) {
      setMsg(`Erro: ${(err as Error).message}`);
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-sage">
        Sem servidor: exporte num aparelho e importe no outro para sincronizar. O backup também
        protege contra perda de dados.
      </p>

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
        <div className="flex items-center gap-1.5">
          <h2 className="font-medium">Importar cards</h2>
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            aria-label="Ajuda: formatos aceitos e como exportar do Anki"
            className="grid h-5 w-5 place-items-center rounded-full border border-line text-[11px] font-semibold text-sage hover:border-indigo hover:text-indigo"
          >
            ?
          </button>
        </div>
        <p className="text-sm text-sage">
          Aceita CSV próprio, JSON ou exports em texto do Anki (.txt). Toque no{' '}
          <span className="font-semibold text-ink">?</span> acima para ver os detalhes de cada
          formato e como exportar do Anki.
        </p>
        <button className="btn-ghost" onClick={() => cardsInput.current?.click()}>
          Escolher arquivo
        </button>
        <input
          ref={cardsInput}
          type="file"
          accept=".csv,.json,.txt,text/csv,application/json,text/plain"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleImportCards(e.target.files[0])}
        />
      </section>

      {helpOpen && <ImportHelpModal onClose={() => setHelpOpen(false)} />}

      {msg && <p className="text-sm text-indigo">{msg}</p>}
    </div>
  );
}

function ImportHelpModal({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-help-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-paper p-5 shadow-lg space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="import-help-title" className="font-display text-lg font-semibold">
            Formatos aceitos para importar cards
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

        <div className="space-y-1.5">
          <h3 className="text-sm font-medium">Vindo do Anki</h3>
          <p className="text-sm text-sage">
            No Anki Desktop: selecione o baralho → menu <strong>Exportar</strong> → escolha um dos
            formatos abaixo → salve como <code>.txt</code> e importe esse arquivo aqui.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-sage">
            <li>
              <strong className="text-ink">Notas em Texto Simples</strong> — recomendado. Traz as
              tags e, se o modelo de nota tiver um campo de leitura (ex.: "Reading"), ele é
              detectado automaticamente.
            </li>
            <li>
              <strong className="text-ink">Cartões em Texto Simples</strong> — mais simples,
              sempre Pergunta/Resposta. Bom para baralhos com formatação especial (cloze, cartões
              invertidos), mas sem tags.
            </li>
          </ul>
          <p className="text-sm text-sage">
            Áudio e imagens não são importados — só o texto dos cards. A categoria não vem do
            Anki; dá pra organizar os cards em categorias depois, dentro do app.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-medium">CSV próprio</h3>
          <p className="text-sm text-sage">
            Uma linha por card, com ou sem cabeçalho:
          </p>
          <pre className="overflow-x-auto rounded-lg border border-line bg-white/70 p-2 text-xs">
            front,back,reading,category,tags{'\n'}猫,gato,ねこ,Animais,n5;substantivo
          </pre>
          <p className="text-sm text-sage">Tags separadas por ponto e vírgula (;).</p>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-medium">JSON</h3>
          <p className="text-sm text-sage">Um array de objetos de card, ex.:</p>
          <pre className="overflow-x-auto rounded-lg border border-line bg-white/70 p-2 text-xs">
            {'[{ "front": "猫", "back": "gato", "reading": "ねこ", "category": "Animais" }]'}
          </pre>
        </div>

        <button className="btn-ghost w-full" onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
}

function ConfiguracoesTab() {
  const [msg, setMsg] = useState<string | null>(null);

  async function seedExample() {
    const now = Date.now();
    const examples = [
      { front: '猫', back: 'gato', reading: 'ねこ', category: 'Animais' },
      { front: '犬', back: 'cachorro', reading: 'いぬ', category: 'Animais' },
      { front: '水', back: 'água', reading: 'みず', category: 'N5' },
      { front: '本', back: 'livro', reading: 'ほん', category: 'N5' },
      { front: 'ありがとう', back: 'obrigado(a)', reading: 'arigatō', category: 'Saudações' },
    ];
    await db.cards.bulkAdd(
      examples.map((e) => ({ id: newId(), tags: [], ...e, ...freshSrs(now), createdAt: now, updatedAt: now }))
    );
    setMsg('Cards de exemplo adicionados.');
  }

  async function resetAll() {
    if (!confirm('Apagar TODOS os dados deste dispositivo? Esta ação não pode ser desfeita.')) return;
    await Promise.all([db.cards.clear(), db.reviews.clear(), db.kanaProgress.clear(), db.meta.clear()]);
    setMsg('Todos os dados foram apagados.');
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-sage">Nihongo Study · v{__APP_VERSION__}</p>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Começar com exemplos</h2>
        <p className="text-sm text-sage">Adiciona alguns cards para você testar o fluxo.</p>
        <button className="btn-ghost" onClick={seedExample}>
          Adicionar cards de exemplo
        </button>
      </section>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Zona de risco</h2>
        <p className="text-sm text-sage">
          Apaga tudo deste dispositivo. Faça um backup antes (aba Dados) se quiser preservar.
        </p>
        <button className="btn-accent" onClick={resetAll}>
          Apagar todos os dados
        </button>
      </section>

      {msg && <p className="text-sm text-indigo">{msg}</p>}
    </div>
  );
}

function SobreTab() {
  return (
    <div className="space-y-6">
      <section className="card-surface space-y-3">
        <h2 className="font-medium">O que é o Nihongo Study</h2>
        <p className="text-sm text-sage">
          Este aplicativo foi desenvolvido por mim para apoiar meus estudos no curso de japonês do
          CIL (Centro Interescolar de Línguas), unidade do Gama, em Brasília. A ideia surgiu da
          minha própria necessidade de praticar flash cards com repetição espaçada e treinar
          hiragana/katakana — e acabei compartilhando gratuitamente com os colegas de turma, que
          repassaram para outras turmas com o incentivo do professor.
        </p>
        <p className="text-sm text-sage">
          É um projeto pessoal e sem fins comerciais: roda inteiramente no navegador, sem servidor,
          e os dados ficam salvos só no seu aparelho.
        </p>
      </section>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Código aberto</h2>
        <p className="text-sm text-sage">
          O código-fonte é público e distribuído sob a licença MIT — você pode usar, copiar,
          modificar e redistribuir livremente, mantendo o aviso de copyright original.
        </p>
        <Field label="Repositório (código e contribuições)">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo underline underline-offset-2"
          >
            {REPO_URL}
          </a>
        </Field>
      </section>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Autor</h2>
        <Field label="Nome">
          <span className="text-sm text-ink">Rodrigo da Silva Ferreira Caneppele</span>
        </Field>
        <Field label="E-mail">
          <a
            href="mailto:r.caneppele@gmail.com"
            className="text-sm text-indigo underline underline-offset-2"
          >
            r.caneppele@gmail.com
          </a>
        </Field>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-0.5">
      <p className="label">{label}</p>
      {children}
    </div>
  );
}

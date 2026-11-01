import { ArrowLeftRight, BookOpen, Cloud, Code, DatabaseBackup, Download, Goal, Info, Layers, Library, Palette, Settings, Share2, ShieldCheck, TriangleAlert, Upload, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { TILE, type Cor } from '../lib/cores';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db, newId } from '../db/schema';
import { marcarBackup, novaEpoca } from '../db/local';
import { freshSrs } from '../features/srs/fsrs';
import {
  exportData,
  downloadBackup,
  parseBackup,
  importData,
  canShareBackup,
  shareBackup,
  type BackupFile,
  type ImportMode,
} from '../db/backup';
import { haQuantoTempo, useEstadoBackup } from '../features/backup/lembrete';
import SyncCard from '../features/sync/SyncCard';
import { estadoSync } from '../features/sync/motor';
import { parseCardsFile } from '../features/flashcards/importCards';
import { useTheme, type ThemeMode } from '../lib/useTheme';
import { setGradeMode, useGradeMode, type GradeMode } from '../features/srs/gradeMode';
import { META_OPCOES, PESO_LEITURA, setMetaDiaria, useMetaDiaria } from '../features/atividade/atividade';
import { N5_DECK, n5CategoryCounts } from '../data/seed/n5';
// O manual vive em docs/ (fonte única); o `?url` faz o build publicá-lo com hash no nome,
// então trocar o PDF e publicar o app já entrega a versão nova, sem cache velho.
import manualUrl from '../../docs/manual-do-usuario.pdf?url';
import { PRIVACIDADE_URL } from '../lib/privacidade';

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
      <PageHeader
        icon={<Settings className="h-5 w-5" />}
        cor="indigo"
        title="Configurações"
        subtitle="Dados, preferências e informações sobre o app."
      />

      <div role="tablist" aria-label="Seções de configuração" className="segmented">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`segmented-item px-4 ${tab === t.key ? 'segmented-item-active' : ''}`}
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

/** O backup compartilhado pode ter virado .txt (ver `shareBackup`) — o conteúdo é o mesmo. */
const BACKUP_ACCEPT = 'application/json,.json,text/plain,.txt';

function DadosTab() {
  const [mode, setMode] = useState<ImportMode>('replace');
  const [msg, setMsg] = useState<string | null>(null);
  const [cardsHelpOpen, setCardsHelpOpen] = useState(false);
  const [backupHelpOpen, setBackupHelpOpen] = useState(false);
  const backupInput = useRef<HTMLInputElement>(null);
  const syncInput = useRef<HTMLInputElement>(null);
  const cardsInput = useRef<HTMLInputElement>(null);
  const [podeCompartilhar] = useState(canShareBackup);
  const estadoBackup = useEstadoBackup();
  // Arquivo já mesclado de "Sincronizar com arquivo", esperando a pessoa salvar/compartilhar.
  // Não dá pra baixar sozinho: depois de ler e mesclar, o navegador já não considera mais
  // que foi um toque da pessoa e pode bloquear o download/compartilhamento.
  const [mesclado, setMesclado] = useState<BackupFile | null>(null);

  async function handleExport() {
    downloadBackup(await exportData());
    await marcarBackup();
    setMsg('Backup exportado.');
  }

  async function handleShare(backup?: BackupFile) {
    try {
      if (await shareBackup(backup ?? (await exportData()))) {
        await marcarBackup();
        setMsg('Backup compartilhado.');
        setMesclado(null);
      }
    } catch (err) {
      setMsg(`Erro: ${(err as Error).message}`);
    }
  }

  async function handleSyncFile(file: File) {
    try {
      await importData(parseBackup(await file.text()), 'merge');
      setMesclado(await exportData());
      setMsg(null);
    } catch (err) {
      setMsg(`Erro: ${(err as Error).message}`);
    }
  }

  async function handleSaveMerged(backup: BackupFile) {
    downloadBackup(backup);
    await marcarBackup();
    setMesclado(null);
    setMsg('Arquivo sincronizado salvo. Leve-o ao outro aparelho e use "Sincronizar com arquivo" lá também.');
  }

  async function handleImportBackup(file: File) {
    if (
      mode === 'replace' &&
      !confirm('Isso apaga todos os dados atuais deste aparelho e coloca no lugar o conteúdo do arquivo. Continuar?')
    ) {
      return;
    }
    try {
      const backup = parseBackup(await file.text());
      await importData(backup, mode);
      if (mode === 'replace') await novaEpoca();
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

  const n5Counts = n5CategoryCounts();
  const [n5Selected, setN5Selected] = useState<Set<string>>(new Set());
  const [n5Importing, setN5Importing] = useState(false);
  const n5SelectedCount = n5Counts
    .filter((c) => n5Selected.has(c.category))
    .reduce((sum, c) => sum + c.count, 0);

  function toggleN5Category(category: string) {
    setN5Selected((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  async function importN5() {
    if (n5Selected.size === 0 || n5Importing) return;
    setN5Importing(true);
    try {
      const chosen = N5_DECK.filter((e) => n5Selected.has(e.category));
      const existingFronts = new Set((await db.cards.toArray()).map((c) => c.front));
      const toAdd = chosen.filter((e) => !existingFronts.has(e.front));
      const skipped = chosen.length - toAdd.length;
      if (toAdd.length === 0) {
        setMsg('Esses cards já tinham sido importados antes.');
        return;
      }
      const now = Date.now();
      await db.cards.bulkAdd(
        toAdd.map((e) => ({ id: newId(), ...e, ...freshSrs(now), createdAt: now, updatedAt: now }))
      );
      setMsg(
        `${toAdd.length} card(s) do N5 importado(s).` +
          (skipped > 0 ? ` ${skipped} já existiam e foram ignorados.` : '')
      );
    } finally {
      setN5Importing(false);
    }
  }

  async function resetAll() {
    const sincronizando = (await estadoSync()).conectado;
    const aviso = sincronizando
      ? '\n\nA sincronização com o Google Drive está ligada: a cópia no Drive também fica vazia, e os outros aparelhos vão perguntar se querem apagar também.'
      : '';
    if (!confirm(`Apagar TODOS os dados deste dispositivo? Esta ação não pode ser desfeita.${aviso}`)) return;
    await Promise.all([
      db.cards.clear(),
      db.reviews.clear(),
      db.kanaProgress.clear(),
      db.kanjiProgress.clear(),
      db.wordKnowledge.clear(),
      db.readingProgress.clear(),
      db.activity.clear(),
      db.meta.clear(),
      db.deleted.clear(),
    ]);
    await novaEpoca();
    setMsg('Todos os dados foram apagados.');
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-sage">
        Sem servidor nosso: os dados ficam neste aparelho. Para levar o progresso a outro aparelho, sincronize
        pelo Google Drive ou por arquivo — os dois também servem de cópia de segurança.
      </p>

      <SyncCard
        titulo={
          <SectionTitle icon={<Cloud className="h-4 w-4" />} cor="sora">
            Sincronizar com o Google Drive
          </SectionTitle>
        }
      />

      <section className="card-surface space-y-3">
        <SectionTitle icon={<ArrowLeftRight className="h-4 w-4" />} cor="sora">
          Sincronizar entre aparelhos
        </SectionTitle>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-sage">
          <li>No outro aparelho, exporte (ou compartilhe) o backup.</li>
          <li>
            Aqui, toque em <span className="font-medium text-ink">Sincronizar com arquivo</span> e escolha esse
            arquivo: o que há nos dois lados é juntado (nada se perde) e sai um arquivo novo.
          </li>
          <li>Leve o arquivo novo de volta ao outro aparelho e sincronize lá com ele.</li>
        </ol>
        {mesclado ? (
          <div className="space-y-2 rounded-xl bg-sora/8 px-4 py-3">
            <p className="text-sm text-ink">Dados juntados. Agora salve o arquivo novo para levar ao outro aparelho:</p>
            <div className="flex flex-wrap gap-2">
              {podeCompartilhar && (
                <button className="btn-primary" onClick={() => handleShare(mesclado)}>
                  <Share2 className="h-4 w-4" /> Compartilhar
                </button>
              )}
              <button className={podeCompartilhar ? 'btn-ghost' : 'btn-primary'} onClick={() => handleSaveMerged(mesclado)}>
                <Download className="h-4 w-4" /> Baixar arquivo
              </button>
            </div>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => syncInput.current?.click()}>
            Sincronizar com arquivo
          </button>
        )}
        <input
          ref={syncInput}
          type="file"
          accept={BACKUP_ACCEPT}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) void handleSyncFile(e.target.files[0]);
            e.target.value = '';
          }}
        />
      </section>

      <section className="card-surface space-y-4">
        <div className="flex items-center gap-1.5">
          <SectionTitle icon={<DatabaseBackup className="h-4 w-4" />} cor="sora">
          Backup completo
        </SectionTitle>
          <HelpButton label="Ajuda: como funciona o backup completo" onClick={() => setBackupHelpOpen(true)} />
        </div>
        <p className="text-sm text-sage">
          Cards, histórico de revisões e progresso de kana e kanji num único arquivo JSON — serve
          tanto pra sincronizar entre aparelhos quanto pra manter uma cópia de segurança.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:divide-x sm:divide-line">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-ink">Exportar</h3>
            <p className="text-sm text-sage">Baixa um arquivo com tudo que está salvo neste aparelho agora.</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" onClick={handleExport}>
                Exportar backup
              </button>
              {podeCompartilhar && (
                <button className="btn-ghost" onClick={() => handleShare()}>
                  <Share2 className="h-4 w-4" /> Compartilhar
                </button>
              )}
            </div>
            {estadoBackup && (
              <p className="text-xs text-sage">
                {estadoBackup.ultimo === undefined
                  ? 'Nenhum backup feito neste aparelho ainda.'
                  : `Último backup: ${haQuantoTempo(estadoBackup.ultimo)}.`}
              </p>
            )}
          </div>

          <div className="space-y-2 sm:pl-4">
            <h3 className="text-sm font-semibold text-ink">Importar</h3>
            <p className="text-sm text-sage">Escolha como o arquivo se combina com o que já está salvo aqui:</p>
            <div className="segmented">
              <button
                className={`segmented-item ${mode === 'replace' ? 'segmented-item-active' : ''}`}
                onClick={() => setMode('replace')}
              >
                Substituir
              </button>
              <button
                className={`segmented-item ${mode === 'merge' ? 'segmented-item-active' : ''}`}
                onClick={() => setMode('merge')}
              >
                Mesclar
              </button>
            </div>
            <div>
              <button className="btn-ghost" onClick={() => backupInput.current?.click()}>
                Importar backup
              </button>
              <input
                ref={backupInput}
                type="file"
                accept={BACKUP_ACCEPT}
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImportBackup(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="card-surface space-y-3">
        <div className="flex items-center gap-1.5">
          <SectionTitle icon={<Upload className="h-4 w-4" />} cor="sora">
          Importar cards
        </SectionTitle>
          <HelpButton
            label="Ajuda: formatos aceitos e como exportar do Anki"
            onClick={() => setCardsHelpOpen(true)}
          />
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

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Library className="h-4 w-4" />} cor="kin">
          Vocabulário N5
        </SectionTitle>
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-sora/8 px-4 py-3">
          <p className="min-w-0 flex-1 basis-60 text-sm text-ink">
            O jeito recomendado de aprender o vocabulário N5 é em{' '}
            <span className="font-semibold">Aprender › Palavras novas</span>: 10 palavras por vez, das mais úteis
            para as menos, sem lotar a revisão.
          </p>
          <Link to="/aprender/palavras" className="btn-primary">
            Palavras novas
          </Link>
        </div>

        {/* Import em massa (categoria inteira de uma vez): continua
            disponível, mas recolhido — vai contra o ritmo do método e pode
            encher a Revisão do dia de uma vez. */}
        <details className="group rounded-xl border border-line/70 px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium text-ink/80 marker:text-sage">
            Avançado: importar categorias inteiras de uma vez
          </summary>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-sage">
              Cada card entra como novo e já vence na Revisão do dia — importar uma categoria inteira pode criar dezenas
              de revisões de uma vez. Use só se já conhece essas palavras de outro lugar.
            </p>
            <div className="flex flex-wrap gap-2">
              {n5Counts.map(({ category, count }) => {
                const active = n5Selected.has(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleN5Category(category)}
                    className={`chip ${active ? 'chip-active' : ''}`}
                  >
                    {category} <span className="text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <button
                className="btn-ghost"
                onClick={importN5}
                disabled={n5Selected.size === 0 || n5Importing}
              >
                {n5Importing ? 'Importando…' : 'Importar selecionados'}
              </button>
              {n5SelectedCount > 0 && (
                <span className="text-sm text-sage">{n5SelectedCount} card(s) selecionado(s)</span>
              )}
            </div>
          </div>
        </details>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<TriangleAlert className="h-4 w-4" />} cor="hanko">
          Zona de risco
        </SectionTitle>
        <p className="text-sm text-sage">
          Apaga tudo deste dispositivo. Faça um backup antes (seção acima) se quiser preservar.
        </p>
        <button className="btn-accent" onClick={resetAll}>
          Apagar todos os dados
        </button>
      </section>

      {backupHelpOpen && (
        <HelpModal title="Como funciona o backup completo" onClose={() => setBackupHelpOpen(false)}>
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">O que entra no arquivo</h3>
            <p className="text-sm text-sage">
              Todos os cards (e o progresso de SRS de cada um), o histórico de revisões e o
              progresso de treino de kana e do módulo de kanji. Um snapshot completo do aparelho,
              sem nada de fora.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Exportar</h3>
            <p className="text-sm text-sage">
              Só baixa o arquivo — não apaga nem altera nada neste aparelho. Pode exportar quantas
              vezes quiser.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Importar: Substituir vs. Mesclar</h3>
            <p className="text-sm text-sage">O modo escolhido só afeta a importação — a exportação é sempre um snapshot completo.</p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-sage">
              <li>
                <strong className="text-ink">Substituir</strong> — apaga tudo que está neste
                aparelho e coloca no lugar o conteúdo do arquivo. Use pra restaurar um backup ou
                "clonar" o estado de outro aparelho.
              </li>
              <li>
                <strong className="text-ink">Mesclar</strong> — combina com o que já existe aqui:
                o estudo feito nos dois aparelhos é somado, o que foi apagado num lado sai do outro, e
                quando a mesma coisa mudou nos dois vence a mudança mais recente. Pode mesclar o mesmo
                arquivo de novo sem contar nada duas vezes.
              </li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Sincronizar dois aparelhos</h3>
            <p className="text-sm text-sage">
              Use a seção <strong className="text-ink">Sincronizar entre aparelhos</strong>: ela
              mescla o arquivo do outro aparelho e já gera o arquivo juntado para levar de volta. No
              celular, <strong className="text-ink">Compartilhar</strong> manda o arquivo direto para
              o Drive, WhatsApp ou e-mail.
            </p>
          </div>
        </HelpModal>
      )}

      {cardsHelpOpen && (
        <HelpModal title="Formatos aceitos para importar cards" onClose={() => setCardsHelpOpen(false)}>
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
            <p className="text-sm text-sage">Uma linha por card, com ou sem cabeçalho:</p>
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface/70 p-2 text-xs">
              front,back,reading,category,tags{'\n'}猫,gato,ねこ,Animais,n5;substantivo
            </pre>
            <p className="text-sm text-sage">Tags separadas por ponto e vírgula (;).</p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">JSON</h3>
            <p className="text-sm text-sage">Um array de objetos de card, ex.:</p>
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface/70 p-2 text-xs">
              {'[{ "front": "猫", "back": "gato", "reading": "ねこ", "category": "Animais" }]'}
            </pre>
          </div>
        </HelpModal>
      )}

      {msg && <p className="text-sm text-indigo">{msg}</p>}
    </div>
  );
}

function HelpButton({ label, onClick }: { label: string; onClick: () => void }) {
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

function HelpModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
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

const THEME_OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: 'light', label: 'Claro' },
  { key: 'dark', label: 'Escuro' },
  { key: 'system', label: 'Sistema' },
];

const GRADE_MODE_OPTIONS: { key: GradeMode; label: string }[] = [
  { key: 'simple', label: '2 botões' },
  { key: 'full', label: '4 botões' },
];

function ConfiguracoesTab() {
  const { mode, setMode } = useTheme();
  const gradeMode = useGradeMode();
  const metaDiaria = useMetaDiaria();

  return (
    <div className="space-y-6"> 
      <section className="card-surface space-y-3">
        <SectionTitle icon={<Palette className="h-4 w-4" />} cor="fuji">
          Aparência
        </SectionTitle>
        <p className="text-sm text-sage">
          "Sistema" segue o tema do seu aparelho/navegador e muda sozinho se ele mudar.
        </p>
        <div className="segmented">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              className={`segmented-item ${mode === opt.key ? 'segmented-item-active' : ''}`}
              onClick={() => setMode(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Goal className="h-4 w-4" />} cor="matcha">
          Meta diária
        </SectionTitle>
        <p className="text-sm text-sage">
          Quantas atividades por dia você quer fazer. Cada resposta (revisão, treino de kana, quiz, kakitori…) conta 1;
          um texto lido conta {PESO_LEITURA}. Aparece no início do app, junto com a sequência de dias.
        </p>
        <div className="segmented">
          {META_OPCOES.map((opt) => (
            <button
              key={opt}
              className={`segmented-item ${metaDiaria === opt ? 'segmented-item-active' : ''}`}
              onClick={() => setMetaDiaria(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Layers className="h-4 w-4" />} cor="sora">
          Revisão (flash cards e kanji)
        </SectionTitle>
        <p className="text-sm text-sage">
          "2 botões" mostra só Não lembrei e Lembrei — menos decisão por card, e o algoritmo funciona bem assim.
          "4 botões" acrescenta Com esforço e Fácil, para quem quer ajustar o intervalo com mais precisão.
        </p>
        <div className="segmented">
          {GRADE_MODE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              className={`segmented-item ${gradeMode === opt.key ? 'segmented-item-active' : ''}`}
              onClick={() => setGradeMode(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SobreTab() {
  const { resolvedTheme } = useTheme();
  const logoFile = resolvedTheme === 'dark' ? 'logo-dark.png' : 'logo.png';

  return (
    <div className="space-y-6">
      <section className="card-hero flex flex-col items-center gap-1 text-center">
        <img src={`${import.meta.env.BASE_URL}${logoFile}`} alt="Nihongo Study" className="h-32 object-contain" />
        <p className="text-sage">Flash cards, kana, kanji, leitura e lições</p>
        <p className="badge bg-indigo/8 text-indigo">versão {__APP_VERSION__}</p>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<BookOpen className="h-4 w-4" />} cor="indigo">
          Manual do usuário
        </SectionTitle>
        <p className="text-sm text-sage">
          Um guia ilustrado de todo o app: o método, cada tela, a revisão, o backup e perguntas
          frequentes. Em PDF, para ler na tela ou imprimir. Depois de aberto uma vez, fica
          disponível também sem internet.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={manualUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <BookOpen className="h-4 w-4" />
            Abrir o manual
          </a>
          <a href={manualUrl} download="Nihongo Study - Manual do usuario.pdf" className="btn-ghost">
            <Download className="h-4 w-4" />
            Baixar PDF
          </a>
        </div>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Info className="h-4 w-4" />} cor="indigo">
          O que é o Nihongo Study
        </SectionTitle>
        <p className="text-sm text-sage">
          Este aplicativo foi desenvolvido por mim para apoiar meus estudos no curso de japonês do
          CIL (Centro Interescolar de Línguas), unidade do Gama, em Brasília. A ideia surgiu da
          minha própria necessidade de praticar flash cards com repetição espaçada e treinar
          hiragana/katakana — e acabei compartilhando gratuitamente com os colegas de turma, que
          repassaram para outras turmas com o incentivo do professor.
        </p>
        <p className="text-sm text-sage">
          É um projeto pessoal e sem fins comerciais: roda inteiramente no navegador, sem servidor,
          e os dados ficam salvos no seu aparelho — e, se você ligar a sincronização, no seu Google Drive.
        </p>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<ShieldCheck className="h-4 w-4" />} cor="indigo">
          Privacidade
        </SectionTitle>
        <p className="text-sm text-sage">
          O app não coleta nenhum dado: não tem cadastro, servidor, analytics nem anúncios. A política completa
          explica o que fica no aparelho e o que vai para o seu Google Drive quando a sincronização está ligada.
        </p>
        <a href={PRIVACIDADE_URL} target="_blank" rel="noreferrer" className="btn-ghost">
          <ShieldCheck className="h-4 w-4" />
          Política de privacidade
        </a>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Code className="h-4 w-4" />} cor="indigo">
          Código aberto
        </SectionTitle>
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
        <SectionTitle icon={<User className="h-4 w-4" />} cor="indigo">
          Autor
        </SectionTitle>
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

/** Título de seção com ícone num tile pequeno, na cor do assunto. */
function SectionTitle({ icon, cor, children }: { icon: ReactNode; cor: Cor; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 font-medium">
      <span className={`icon-tile h-8 w-8 rounded-lg ${TILE[cor]}`}>{icon}</span>
      {children}
    </h2>
  );
}

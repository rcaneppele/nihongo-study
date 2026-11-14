import { ArrowLeftRight, Cloud, DatabaseBackup, Download, Library, Share2, TriangleAlert, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { marcarBackup } from '../../db/local';
import { apagarTudo, exportData, importData, importarBackup, parseBackup, type BackupFile, type ImportMode } from '../../db/backup';
import { canShareBackup, downloadBackup, shareBackup } from '../backup/arquivo';
import { adicionarCardsNovos } from '../flashcards/cards';
import { alternar } from '../../lib/conjuntos';
import { haQuantoTempo, useEstadoBackup } from '../backup/lembrete';
import SyncCard from '../sync/SyncCard';
import { estadoSync } from '../sync/motor';
import { importarArquivoDeCards } from '../flashcards/importCards';
import { N5_DECK, n5CategoryCounts } from '../../data/seed/n5';
import { HelpButton, HelpModal, SectionTitle } from './ui';
import CopiaMigracaoCard from './CopiaMigracaoCard';
import Segmentado from '../../components/Segmentado';
import { plural } from '../../lib/plural';

/** O backup compartilhado pode ter virado .txt (ver `shareBackup`) — o conteúdo é o mesmo. */
const BACKUP_ACCEPT = 'application/json,.json,text/plain,.txt';

type Secao = 'arquivo' | 'backup' | 'cards' | 'n5' | 'risco';

/** Resultado da última ação, mostrado dentro da seção em que ela aconteceu. */
function Aviso({ aviso, secao }: { aviso: { secao: Secao; texto: string } | null; secao: Secao }) {
  if (aviso?.secao !== secao) return null;
  const falhou = aviso.texto.startsWith('Erro');
  return (
    <p
      role="status"
      className={`rounded-xl px-3 py-2 text-sm ${falhou ? 'bg-hanko/8 text-hanko' : 'bg-indigo/8 text-indigo'}`}
    >
      {aviso.texto}
    </p>
  );
}

export default function DadosTab() {
  // Mesclar vem escolhido: é o modo que não apaga nada. Substituir é uma escolha consciente (e pede confirmação).
  const [mode, setMode] = useState<ImportMode>('merge');
  // O resultado de cada ação aparece na própria seção (a página é longa: no fim dela ninguém veria).
  const [aviso, setAviso] = useState<{ secao: Secao; texto: string } | null>(null);
  const avisar = (secao: Secao, texto: string) => setAviso({ secao, texto });
  const erro = (secao: Secao, err: unknown) => avisar(secao, `Erro: ${(err as Error).message}`);
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
    avisar('backup', 'Backup exportado.');
  }

  async function handleShare(secao: Secao, backup?: BackupFile) {
    try {
      if (await shareBackup(backup ?? (await exportData()))) {
        await marcarBackup();
        avisar(secao, 'Backup compartilhado.');
        setMesclado(null);
      }
    } catch (err) {
      erro(secao, err);
    }
  }

  async function handleSyncFile(file: File) {
    try {
      await importData(parseBackup(await file.text()), 'merge');
      setMesclado(await exportData());
      setAviso(null);
    } catch (err) {
      erro('arquivo', err);
    }
  }

  async function handleSaveMerged(backup: BackupFile) {
    downloadBackup(backup);
    await marcarBackup();
    setMesclado(null);
    avisar('arquivo', 'Arquivo sincronizado salvo. Leve-o ao outro aparelho e use "Sincronizar com arquivo" lá também.');
  }

  async function handleImportBackup(file: File) {
    if (mode === 'replace') {
      const sincronizando = (await estadoSync()).conectado;
      const avisoSync = sincronizando
        ? '\n\nA sincronização com o Google Drive está ligada: a cópia no Drive também é substituída, e os outros aparelhos vão perguntar se querem ficar iguais a este.'
        : '';
      if (!confirm(`Isso apaga todos os dados atuais deste aparelho e coloca no lugar o conteúdo do arquivo. Continuar?${avisoSync}`)) {
        return;
      }
    }
    try {
      await importarBackup(parseBackup(await file.text()), mode);
      avisar('backup', `Backup importado (${mode === 'replace' ? 'substituiu tudo' : 'mesclado'}).`);
    } catch (err) {
      erro('backup', err);
    }
  }

  async function handleImportCards(file: File) {
    try {
      const { criados, ignorados } = await importarArquivoDeCards(await file.text(), file.name);
      const ignoradosMsg = ignorados > 0 ? ` ${plural(ignorados, 'já existia ou estava sem frente e foi ignorado', 'já existiam ou estavam sem frente e foram ignorados')}.` : '';
      avisar(
        'cards',
        criados === 0
          ? 'Nenhum card novo: todos os do arquivo já existiam (ou estavam sem frente).'
          : `${plural(criados, 'card importado', 'cards importados')}.${ignoradosMsg}`
      );
    } catch (err) {
      erro('cards', err);
    }
  }

  const n5Counts = n5CategoryCounts();
  const [n5Selected, setN5Selected] = useState<Set<string>>(new Set());
  const [n5Importing, setN5Importing] = useState(false);
  const n5SelectedCount = n5Counts
    .filter((c) => n5Selected.has(c.category))
    .reduce((sum, c) => sum + c.count, 0);

  function toggleN5Category(category: string) {
    setN5Selected((prev) => alternar(prev, category));
  }

  async function importN5() {
    if (n5Selected.size === 0 || n5Importing) return;
    setN5Importing(true);
    try {
      const { criados, ignorados } = await adicionarCardsNovos(N5_DECK.filter((e) => n5Selected.has(e.category)));
      avisar(
        'n5',
        criados === 0
          ? 'Esses cards já tinham sido importados antes.'
          : `${plural(criados, 'card do N5 importado', 'cards do N5 importados')}.` +
              (ignorados > 0 ? ` ${plural(ignorados, 'já existia e foi ignorado', 'já existiam e foram ignorados')}.` : '')
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
    await apagarTudo();
    avisar('risco', 'Todos os dados foram apagados.');
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
                <button className="btn-primary" onClick={() => handleShare('arquivo', mesclado)}>
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
        <Aviso aviso={aviso} secao="arquivo" />
      </section>

      <section className="card-surface space-y-4">
        <div className="flex items-center gap-1.5">
          <SectionTitle icon={<DatabaseBackup className="h-4 w-4" />} cor="sora">
          Backup completo
        </SectionTitle>
          <HelpButton label="Ajuda: como funciona o backup completo" onClick={() => setBackupHelpOpen(true)} />
        </div>
        <p className="text-sm text-sage">
          Tudo o que você fez no app — cards e revisões, kana, kanji, leituras, lições, exercícios, diário,
          conquistas e preferências — num único arquivo JSON. Serve tanto pra sincronizar entre aparelhos quanto
          pra manter uma cópia de segurança.
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
                <button className="btn-ghost" onClick={() => handleShare('backup')}>
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
            <Segmentado
              rotulo="Como importar"
              valor={mode}
              onChange={setMode}
              opcoes={[
                { valor: 'merge', rotulo: 'Mesclar' },
                { valor: 'replace', rotulo: 'Substituir' },
              ]}
            />
            <p className="text-xs text-sage">
              {mode === 'merge'
                ? 'Junta o arquivo com o que já está aqui — nada é apagado.'
                : 'Apaga o que está neste aparelho e coloca o arquivo no lugar.'}
            </p>
            <div>
              <button className="btn-ghost" onClick={() => backupInput.current?.click()}>
                Importar backup
              </button>
              <input
                ref={backupInput}
                type="file"
                accept={BACKUP_ACCEPT}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) void handleImportBackup(e.target.files[0]);
                  // Sem limpar, escolher o mesmo arquivo de novo não dispara o `change`.
                  e.target.value = '';
                }}
              />
            </div>
          </div>
        </div>
        <Aviso aviso={aviso} secao="backup" />
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
          onChange={(e) => {
            if (e.target.files?.[0]) void handleImportCards(e.target.files[0]);
            e.target.value = '';
          }}
        />
        <Aviso aviso={aviso} secao="cards" />
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
                    aria-pressed={active}
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
                <span className="text-sm text-sage">{plural(n5SelectedCount, 'card selecionado', 'cards selecionados')}</span>
              )}
            </div>
          </div>
        </details>
        <Aviso aviso={aviso} secao="n5" />
      </section>

      <CopiaMigracaoCard />

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
        <Aviso aviso={aviso} secao="risco" />
      </section>

      {backupHelpOpen && (
        <HelpModal title="Como funciona o backup completo" onClose={() => setBackupHelpOpen(false)}>
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">O que entra no arquivo</h3>
            <p className="text-sm text-sage">
              Todos os cards (e o progresso de SRS de cada um), o histórico de revisões, o progresso de
              kana e kanji, as leituras e palavras compreendidas, o progresso das lições, as respostas dos
              exercícios, o diário, as conquistas, a atividade por dia e as preferências (tema, meta diária).
              Um snapshot completo do aparelho — só a conexão com o Google Drive fica de fora.
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

    </div>
  );
}

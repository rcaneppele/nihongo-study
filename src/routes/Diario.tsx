import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChevronLeft, ChevronRight, NotebookPen, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { db, type JournalEntry } from '../db/schema';
import { LICOES } from '../licoes';
import { getPrompt, PROMPTS_DIARIO, type PromptDiario } from '../data/diario/prompts';
import { apagarEntrada, salvarEntrada } from '../features/diario/diario';

/**
 * Diário guiado (/licoes/diario): propostas curtas de escrita ligadas às
 * lições. O usuário escreve (em kana, romaji ou como conseguir) e se avalia
 * por um checklist — não há correção automática.
 */
export default function Diario() {
  const [params] = useSearchParams();
  const licao = params.get('licao');
  const entradas = useLiveQuery(() => db.journal.orderBy('createdAt').reverse().toArray(), []);
  const [aberto, setAberto] = useState<{ prompt: PromptDiario; entrada?: JournalEntry } | null>(null);

  if (aberto) {
    return (
      <Editor
        key={aberto.entrada?.id ?? aberto.prompt.id}
        prompt={aberto.prompt}
        entrada={aberto.entrada}
        onFechar={() => setAberto(null)}
      />
    );
  }

  const porPrompt = new Map<string, number>();
  for (const e of entradas ?? []) porPrompt.set(e.promptId, (porPrompt.get(e.promptId) ?? 0) + 1);
  // Com `?licao=`, as propostas daquela lição vêm primeiro.
  const grupos = LICOES.map((l) => ({ meta: l.meta, prompts: PROMPTS_DIARIO.filter((p) => p.licaoId === l.meta.id) }))
    .filter((g) => g.prompts.length > 0)
    .sort((a, b) => Number(b.meta.id === licao) - Number(a.meta.id === licao));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-4">
        <Link to="/praticar/escrever" className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Escrever
        </Link>
        <PageHeader
          icon={<NotebookPen className="h-5 w-5" />}
          cor="kin"
          title="Diário guiado"
          subtitle="Escreva frases suas com o que aprendeu nas lições. Não tem correção automática: no fim, confira o checklist de cada proposta."
        />
      </div>

      {grupos.map(({ meta, prompts }) => (
        <section key={meta.id} className="space-y-2">
          <h2 className="text-xs text-sage">
            {meta.emoji} {meta.title}
          </h2>
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => setAberto({ prompt: p })}
              className="card-surface group flex w-full items-center gap-3 text-left transition-colors hover:border-kin/40"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{p.titulo}</p>
                <p className="text-sm text-sage">{p.instrucao}</p>
              </div>
              {(porPrompt.get(p.id) ?? 0) > 0 && (
                <span className="badge shrink-0 bg-kin/12 text-kin">{porPrompt.get(p.id)} escrita(s)</span>
              )}
              <ChevronRight className="h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </section>
      ))}

      {entradas && entradas.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Suas entradas</h2>
          {entradas.map((e) => {
            const prompt = getPrompt(e.promptId);
            return (
              <div key={e.id} className="card-surface space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-sage">
                    {prompt?.titulo ?? 'Proposta removida'} · {new Date(e.createdAt).toLocaleDateString('pt-BR')}
                    {prompt && ` · checklist ${e.checked.length}/${prompt.checklist.length}`}
                  </p>
                  <div className="flex gap-1">
                    {prompt && (
                      <button
                        className="grid h-8 w-8 place-items-center rounded-full text-sage hover:bg-line/60 hover:text-ink"
                        onClick={() => setAberto({ prompt, entrada: e })}
                        aria-label="Editar entrada"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full text-sage hover:bg-hanko/10 hover:text-hanko"
                      onClick={() => void apagarEntrada(e.id)}
                      aria-label="Apagar entrada"
                      title="Apagar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-wrap font-jp text-ink">{e.text}</p>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

function Editor({ prompt, entrada, onFechar }: { prompt: PromptDiario; entrada?: JournalEntry; onFechar: () => void }) {
  const [texto, setTexto] = useState(entrada?.text ?? '');
  const [marcados, setMarcados] = useState<Set<string>>(new Set(entrada?.checked ?? []));
  const [verExemplo, setVerExemplo] = useState(false);

  function alternar(i: number) {
    setMarcados((prev) => {
      const next = new Set(prev);
      const k = String(i);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  async function salvar() {
    await salvarEntrada(prompt.id, texto.trim(), [...marcados].sort(), entrada);
    onFechar();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <button onClick={onFechar} className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
        <ChevronLeft className="h-4 w-4" />
        Diário guiado
      </button>

      <div className="card-hero space-y-4">
        <div className="space-y-1">
          <p className="font-display text-lg font-semibold tracking-tight">{prompt.titulo}</p>
          <p className="text-sm text-ink/80">{prompt.instrucao}</p>
        </div>

        {verExemplo ? (
          <div className="space-y-2 rounded-xl bg-kin/8 px-3 py-2">
            {prompt.exemplo.map((ex) => (
              <div key={ex.jp}>
                <p className="font-jp text-ink">{ex.jp}</p>
                <p className="text-xs italic text-sage">{ex.romaji}</p>
                <p className="text-xs text-sage">{ex.pt}</p>
              </div>
            ))}
          </div>
        ) : (
          <button className="text-xs text-sage hover:text-indigo hover:underline" onClick={() => setVerExemplo(true)}>
            Ver um exemplo
          </button>
        )}

        <textarea
          className="field min-h-40 font-jp text-lg"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva aqui — em kana, ou em romaji se ainda não tiver o teclado japonês."
          aria-label="Seu texto"
        />

        <div className="space-y-2">
          <p className="label">Confira o que você escreveu</p>
          {prompt.checklist.map((item, i) => (
            <label key={item} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-kin"
                checked={marcados.has(String(i))}
                onChange={() => alternar(i)}
              />
              {item}
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" disabled={texto.trim().length === 0} onClick={() => void salvar()}>
            {entrada ? 'Salvar alterações' : 'Salvar no diário'}
          </button>
          <button className="btn-ghost" onClick={onFechar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

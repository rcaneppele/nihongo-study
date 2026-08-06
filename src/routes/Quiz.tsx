import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LICOES } from '../licoes';
import { contarDisponiveis, gerarQuiz } from '../data/quiz/gerador';
import { TIPOS_QUIZ, type PerguntaGerada, type RegistroResposta, type TipoQuiz } from '../data/quiz/types';
import QuizSession from '../features/quiz/QuizSession';
import QuizResultado from '../features/quiz/QuizResultado';

const QUANTIDADE_PADRAO = 10;

export default function Quiz() {
  const licoesComQuiz = LICOES.filter(
    (l) => l.quiz && (l.quiz.frases?.length ?? 0) + (l.quiz.perguntas?.length ?? 0) > 0
  );

  const [licaoIds, setLicaoIds] = useState<Set<string>>(new Set(licoesComQuiz.map((l) => l.meta.id)));
  const [tipos, setTipos] = useState<Set<TipoQuiz>>(new Set(TIPOS_QUIZ.map((t) => t.tipo)));
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(QUANTIDADE_PADRAO);
  const [perguntas, setPerguntas] = useState<PerguntaGerada[] | null>(null);
  const [resultado, setResultado] = useState<RegistroResposta[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const disponiveis = contarDisponiveis(Array.from(licaoIds), Array.from(tipos));
  // Nunca sobrescreve o valor desejado pelo usuário — só limita o que é exibido/gerado no momento,
  // pra sobrar/voltar naturalmente se a seleção de lições/tipos mudar de novo.
  const quantidade = Math.min(quantidadeDesejada, Math.max(disponiveis, 1));

  function toggleLicao(id: string) {
    setLicaoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTipo(tipo: TipoQuiz) {
    setTipos((prev) => {
      const next = new Set(prev);
      if (next.has(tipo)) next.delete(tipo);
      else next.add(tipo);
      return next;
    });
  }

  function gerar() {
    const geradas = gerarQuiz({
      licaoIds: Array.from(licaoIds),
      tipos: Array.from(tipos),
      quantidade,
    });
    if (geradas.length === 0) {
      setErro('Nenhuma pergunta disponível para essa combinação. Tente outras lições ou tipos.');
      return;
    }
    setErro(null);
    setResultado(null);
    setPerguntas(geradas);
  }

  function finalizar(respostas: RegistroResposta[]) {
    setResultado(respostas);
    setPerguntas(null);
  }

  function desistir() {
    setPerguntas(null);
  }

  if (perguntas) {
    return (
      <div className="mx-auto max-w-2xl">
        <QuizSession perguntas={perguntas} onFinalizar={finalizar} onDesistir={desistir} />
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <QuizResultado respostas={resultado} />
        <button className="btn-primary w-full" onClick={() => setResultado(null)}>
          Novo quiz
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link to="/licoes" className="btn-ghost mb-4 inline-flex text-sm">
          ← Lições
        </Link>
        <h1 className="font-display text-2xl font-semibold">Quiz</h1>
        <p className="mt-1 text-sm text-sage">
          Escolha as lições e os tipos de pergunta, depois gere um quiz aleatório para praticar.
        </p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-ink">Lições</p>
          <div className="flex gap-3 text-sm">
            <button
              className="text-indigo hover:underline"
              onClick={() => setLicaoIds(new Set(licoesComQuiz.map((l) => l.meta.id)))}
            >
              Todas
            </button>
            <button className="text-sage hover:underline" onClick={() => setLicaoIds(new Set())}>
              Nenhuma
            </button>
          </div>
        </div>
        {licoesComQuiz.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {licoesComQuiz.map(({ meta }) => {
              const active = licaoIds.has(meta.id);
              return (
                <button
                  key={meta.id}
                  onClick={() => toggleLicao(meta.id)}
                  className={[
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    active ? 'border-indigo bg-indigo text-paper' : 'border-line text-ink hover:bg-line/40',
                  ].join(' ')}
                >
                  {meta.emoji} {meta.title}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-sage">Nenhuma lição com quiz disponível ainda.</p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Tipos de pergunta</p>
        <div className="space-y-2">
          {TIPOS_QUIZ.map(({ tipo, label, descricao }) => {
            const active = tipos.has(tipo);
            return (
              <button
                key={tipo}
                onClick={() => toggleTipo(tipo)}
                className={[
                  'flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                  active ? 'border-indigo bg-indigo/5' : 'border-line hover:bg-line/40',
                ].join(' ')}
              >
                <span
                  className={[
                    'mt-0.5 h-4 w-4 shrink-0 rounded border',
                    active ? 'border-indigo bg-indigo' : 'border-line',
                  ].join(' ')}
                  aria-hidden
                />
                <span>
                  <span className="block text-sm font-medium text-ink">{label}</span>
                  <span className="block text-xs text-sage">{descricao}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="quantidade">
          Quantidade de perguntas
        </label>
        <input
          id="quantidade"
          type="number"
          min={1}
          max={Math.max(disponiveis, 1)}
          className="field w-32"
          value={quantidade}
          onChange={(e) => setQuantidadeDesejada(Math.max(1, Number(e.target.value) || 1))}
        />
        <p className="mt-1 text-xs text-sage">
          {disponiveis} pergunta{disponiveis === 1 ? '' : 's'} disponíve{disponiveis === 1 ? 'l' : 'is'} com essa
          seleção
        </p>
      </div>

      {erro && <p className="text-sm text-hanko">{erro}</p>}

      <button
        className="btn-primary w-full"
        disabled={licaoIds.size === 0 || tipos.size === 0 || disponiveis === 0}
        onClick={gerar}
      >
        Gerar quiz
      </button>
    </div>
  );
}

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Puzzle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { LICOES } from '../licoes';
import { PONTOS_GRAMATICA } from '../data/gramatica/frases';
import { contarFrases, gerarGramatica } from '../data/gramatica/gerador';
import type { PerguntaGerada, RegistroResposta } from '../data/quiz/types';
import QuizSession from '../features/quiz/QuizSession';
import QuizResultado from '../features/quiz/QuizResultado';
import { registrarAtividade } from '../features/atividade/atividade';
import { registrarResultados } from '../features/exercicios/historico';

const QUANTIDADE_PADRAO = 10;

/**
 * "Gramática em contexto" (/licoes/gramatica): frases novas com lacuna,
 * sorteadas por ponto gramatical (src/data/gramatica/) — reconhecer o
 * padrão numa frase que nunca viu. Usa a sessão e o resultado do Quiz.
 */
export default function Gramatica() {
  const [params] = useSearchParams();
  // `?licao=<id>` pré-seleciona os pontos daquela lição.
  const licao = params.get('licao');
  const [pontoIds, setPontoIds] = useState<Set<string>>(() => {
    const daLicao = PONTOS_GRAMATICA.filter((p) => p.licaoId === licao).map((p) => p.id);
    return new Set(daLicao.length > 0 ? daLicao : PONTOS_GRAMATICA.map((p) => p.id));
  });
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(QUANTIDADE_PADRAO);
  const [perguntas, setPerguntas] = useState<PerguntaGerada[] | null>(null);
  const [resultado, setResultado] = useState<RegistroResposta[] | null>(null);

  const disponiveis = contarFrases([...pontoIds]);
  const quantidade = Math.min(quantidadeDesejada, Math.max(disponiveis, 1));

  function toggle(id: string) {
    setPontoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function gerar() {
    setResultado(null);
    setPerguntas(gerarGramatica([...pontoIds], quantidade));
  }

  function finalizar(respostas: RegistroResposta[]) {
    void registrarAtividade('praticas', respostas.length);
    void registrarResultados(
      respostas.map((r) => ({
        kind: 'gramatica',
        itemId: r.pergunta.id,
        lessonId: r.pergunta.licaoId,
        score: r.acertou ? 1 : 0,
      }))
    );
    setResultado(respostas);
    setPerguntas(null);
  }

  if (perguntas) {
    return (
      <div className="mx-auto max-w-2xl">
        <QuizSession perguntas={perguntas} onFinalizar={finalizar} onDesistir={() => setPerguntas(null)} />
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <QuizResultado respostas={resultado} titulo="Resultado — gramática em contexto" />
        <button className="btn-primary w-full" onClick={gerar}>
          Mais frases
        </button>
        <button className="btn-ghost w-full" onClick={() => setResultado(null)}>
          Mudar os pontos
        </button>
      </div>
    );
  }

  // Pontos agrupados pela lição de origem, na ordem da trilha.
  const grupos = LICOES.map((l) => ({ licao: l.meta, pontos: PONTOS_GRAMATICA.filter((p) => p.licaoId === l.meta.id) })).filter(
    (g) => g.pontos.length > 0
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-4">
        <Link to="/revisar" className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Revisar
        </Link>
        <PageHeader
          icon={<Puzzle className="h-5 w-5" />}
          cor="fuji"
          title="Gramática em contexto"
          subtitle="Frases novas, que não estão nas lições, com uma lacuna para completar. Treina reconhecer a regra — não lembrar a frase decorada. Cada resposta vem com o porquê."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink">Pontos gramaticais</p>
          <div className="flex gap-3 text-sm">
            <button className="text-indigo hover:underline" onClick={() => setPontoIds(new Set(PONTOS_GRAMATICA.map((p) => p.id)))}>
              Todos
            </button>
            <button className="text-sage hover:underline" onClick={() => setPontoIds(new Set())}>
              Nenhum
            </button>
          </div>
        </div>
        {grupos.map(({ licao: meta, pontos }) => (
          <div key={meta.id} className="space-y-2">
            <p className="text-xs text-sage">
              {meta.emoji} {meta.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {pontos.map((p) => (
                <button key={p.id} onClick={() => toggle(p.id)} className={`chip ${pontoIds.has(p.id) ? 'chip-active' : ''}`}>
                  {p.titulo}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="label" htmlFor="quantidade">
          Quantidade de frases
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
        <p className="mt-1 text-xs text-sage">{disponiveis} frase(s) disponível(is) com essa seleção</p>
      </div>

      <button className="btn-primary w-full" disabled={disponiveis === 0} onClick={gerar}>
        Começar
      </button>
    </div>
  );
}

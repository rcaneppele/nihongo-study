import { ChevronLeft, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { contarDisponiveis, gerarDiga, licoesComFrases, type ItemDiga, type RegistroDiga } from '../features/diga/gerador';
import DigaSession from '../features/diga/DigaSession';
import DigaResultado from '../features/diga/DigaResultado';
import { registrarAtividade } from '../features/atividade/atividade';
import { registrarResultados } from '../features/exercicios/historico';

const QUANTIDADE_PADRAO = 10;

export default function Diga() {
  const licoes = licoesComFrases();
  const [params] = useSearchParams();
  // `?licao=<id>` vem do atalho no fim de cada lição — pré-seleciona só ela.
  const licaoInicial = params.get('licao');
  const [licaoIds, setLicaoIds] = useState<Set<string>>(
    () =>
      new Set(
        licaoInicial && licoes.some((l) => l.meta.id === licaoInicial)
          ? [licaoInicial]
          : licoes.map((l) => l.meta.id)
      )
  );
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(QUANTIDADE_PADRAO);
  const [itens, setItens] = useState<ItemDiga[] | null>(null);
  const [registros, setRegistros] = useState<RegistroDiga[] | null>(null);

  const disponiveis = contarDisponiveis(Array.from(licaoIds));
  const quantidade = Math.min(quantidadeDesejada, Math.max(disponiveis, 1));

  function toggleLicao(id: string) {
    setLicaoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function iniciar() {
    setRegistros(null);
    setItens(gerarDiga(Array.from(licaoIds), quantidade));
  }

  if (itens) {
    return (
      <div className="mx-auto max-w-2xl">
        <DigaSession
          itens={itens}
          onFinalizar={(r) => {
            void registrarAtividade('praticas', r.length);
            void registrarResultados(
              r.map(({ item, acertou }) => ({ kind: 'diga', itemId: item.id, lessonId: item.licaoId, score: acertou ? 1 : 0 }))
            );
            setRegistros(r);
            setItens(null);
          }}
          onDesistir={() => setItens(null)}
        />
      </div>
    );
  }

  if (registros) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <DigaResultado registros={registros} />
        <button className="btn-primary w-full" onClick={iniciar}>
          Praticar de novo
        </button>
        <button className="btn-ghost w-full" onClick={() => setRegistros(null)}>
          Mudar lições
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-4">
        <Link to="/licoes" className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Lições
        </Link>
        <PageHeader icon={<MessageCircle className="h-5 w-5" />} cor="fuji" title="Diga em japonês" subtitle="Você vê uma frase em português e diz em japonês — de preferência em voz alta. Depois confere com a resposta e o áudio. É o treino de montar frases inteiras sozinho, que a leitura e os flash cards não cobrem." />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-ink">Lições</p>
          <div className="flex gap-3 text-sm">
            <button className="text-indigo hover:underline" onClick={() => setLicaoIds(new Set(licoes.map((l) => l.meta.id)))}>
              Todas
            </button>
            <button className="text-sage hover:underline" onClick={() => setLicaoIds(new Set())}>
              Nenhuma
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {licoes.map(({ meta }) => {
            const active = licaoIds.has(meta.id);
            return (
              <button
                key={meta.id}
                onClick={() => toggleLicao(meta.id)}
                className={`chip ${active ? 'chip-active' : ''}`}
              >
                {meta.emoji} {meta.title}
              </button>
            );
          })}
        </div>
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
        <p className="mt-1 text-xs text-sage">
          {disponiveis} frase{disponiveis === 1 ? '' : 's'} disponíve{disponiveis === 1 ? 'l' : 'is'} com essa seleção
        </p>
      </div>

      <button className="btn-primary w-full" disabled={disponiveis === 0} onClick={iniciar}>
        Começar
      </button>
    </div>
  );
}

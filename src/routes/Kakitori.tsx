import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contarDisponiveis, gerarKakitori, listarFontes } from '../data/kakitori/gerador';
import type { ItemKakitori, ModoKakitori, RegistroKakitori } from '../data/kakitori/types';
import { isSpeechSupported } from '../features/audio/speech';
import KakitoriSession from '../features/kakitori/KakitoriSession';
import KakitoriResultado from '../features/kakitori/KakitoriResultado';

const QUANTIDADE_PADRAO = 10;

const FONTES = listarFontes();

export default function Kakitori() {
  const [fonteIds, setFonteIds] = useState<Set<string>>(new Set(FONTES.map((f) => f.id)));
  const [modo, setModo] = useState<ModoKakitori>('digitar');
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(QUANTIDADE_PADRAO);
  const [itens, setItens] = useState<ItemKakitori[] | null>(null);
  const [registros, setRegistros] = useState<RegistroKakitori[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const disponiveis = contarDisponiveis(Array.from(fonteIds));
  // Nunca sobrescreve o valor desejado pelo usuário — só limita o que é exibido/gerado no momento.
  const quantidade = Math.min(quantidadeDesejada, Math.max(disponiveis, 1));

  function toggleFonte(id: string) {
    setFonteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function gerar() {
    const gerados = gerarKakitori({ fonteIds: Array.from(fonteIds), quantidade });
    if (gerados.length === 0) {
      setErro('Nenhum item disponível para essa combinação. Tente outras lições.');
      return;
    }
    setErro(null);
    setRegistros(null);
    setItens(gerados);
  }

  function finalizar(r: RegistroKakitori[]) {
    setRegistros(r);
    setItens(null);
  }

  function desistir() {
    setItens(null);
  }

  if (itens) {
    return (
      <div className="mx-auto max-w-2xl">
        <KakitoriSession itens={itens} modo={modo} onFinalizar={finalizar} onDesistir={desistir} />
      </div>
    );
  }

  if (registros) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <KakitoriResultado registros={registros} />
        <button className="btn-primary w-full" onClick={() => setRegistros(null)}>
          Novo ditado
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
        <h1 className="font-display text-2xl font-semibold">Kakitori (書き取り)</h1>
        <p className="mt-1 text-sm text-sage">
          Ouça e escreva o que foi dito, como no ditado do sensei. Escolha as lições, depois
          confira sua resposta contra a certa — sem correção automática.
        </p>
      </div>

      {!isSpeechSupported() && (
        <p className="rounded-lg border border-hanko/40 bg-hanko/10 p-3 text-sm text-hanko">
          Seu navegador não suporta leitura em voz alta (Web Speech API), necessária para o ditado.
        </p>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Como responder</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { valor: 'digitar' as const, label: 'Digitar' },
              { valor: 'desenhar' as const, label: 'Desenhar' },
            ]
          ).map(({ valor, label }) => (
            <button
              key={valor}
              onClick={() => setModo(valor)}
              className={[
                'rounded-full border px-3 py-1.5 text-sm transition-colors',
                modo === valor ? 'border-indigo bg-indigo text-paper' : 'border-line text-ink hover:bg-line/40',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-ink">Lições</p>
          <div className="flex gap-3 text-sm">
            <button
              className="text-indigo hover:underline"
              onClick={() => setFonteIds(new Set(FONTES.map((f) => f.id)))}
            >
              Todas
            </button>
            <button className="text-sage hover:underline" onClick={() => setFonteIds(new Set())}>
              Nenhuma
            </button>
          </div>
        </div>
        {FONTES.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {FONTES.map((fonte) => {
              const active = fonteIds.has(fonte.id);
              return (
                <button
                  key={fonte.id}
                  onClick={() => toggleFonte(fonte.id)}
                  className={[
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    active ? 'border-indigo bg-indigo text-paper' : 'border-line text-ink hover:bg-line/40',
                  ].join(' ')}
                >
                  {fonte.emoji} {fonte.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-sage">Nenhuma lição com conteúdo de ditado disponível ainda.</p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="quantidade">
          Quantidade de itens
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
          {disponiveis} item{disponiveis === 1 ? '' : 's'} disponíve{disponiveis === 1 ? 'l' : 'is'} com essa
          seleção
        </p>
      </div>

      {erro && <p className="text-sm text-hanko">{erro}</p>}

      <button
        className="btn-primary w-full"
        disabled={!isSpeechSupported() || fonteIds.size === 0 || disponiveis === 0}
        onClick={gerar}
      >
        Gerar ditado
      </button>
    </div>
  );
}

import { useState } from 'react';
import type { PerguntaGerada, RegistroResposta, Token } from '../../data/quiz/types';

export default function QuizSession({
  perguntas,
  onFinalizar,
  onDesistir,
}: {
  perguntas: PerguntaGerada[];
  onFinalizar: (respostas: RegistroResposta[]) => void;
  onDesistir: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [respostas, setRespostas] = useState<RegistroResposta[]>([]);

  const pergunta = perguntas[index];
  if (!pergunta) return null;

  const ultima = index === perguntas.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <span>
          {index + 1} de {perguntas.length}
        </span>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onDesistir}>
          Desistir e voltar
        </button>
      </div>

      <QuestionCard
        key={pergunta.id}
        pergunta={pergunta}
        ultima={ultima}
        onResponder={(r) => setRespostas((prev) => [...prev, { pergunta, ...r }])}
        onAvancar={() => (ultima ? onFinalizar([...respostas]) : setIndex((i) => i + 1))}
      />
    </div>
  );
}

interface RespostaParcial {
  acertou: boolean;
  suaResposta: string;
  respostaCorreta: string;
}

interface CardProps<T extends PerguntaGerada> {
  pergunta: T;
  ultima: boolean;
  onResponder: (r: RespostaParcial) => void;
  onAvancar: () => void;
}

function QuestionCard({ pergunta, ultima, onResponder, onAvancar }: CardProps<PerguntaGerada>) {
  switch (pergunta.tipo) {
    case 'reordenar-frase':
      return <ReordenarFrase pergunta={pergunta} ultima={ultima} onResponder={onResponder} onAvancar={onAvancar} />;
    case 'escolher-particula':
      return <EscolherParticula pergunta={pergunta} ultima={ultima} onResponder={onResponder} onAvancar={onAvancar} />;
    case 'verdadeiro-falso':
      return <VerdadeiroFalso pergunta={pergunta} ultima={ultima} onResponder={onResponder} onAvancar={onAvancar} />;
    case 'significado':
      return <MultiplaEscolha pergunta={pergunta} ultima={ultima} onResponder={onResponder} onAvancar={onAvancar} />;
  }
}

const ESTADO_CORRETO = 'border-2 border-sage bg-sage/15 font-medium text-ink';
const ESTADO_ERRADO = 'border-2 border-hanko bg-hanko/15 font-medium text-ink';
const ESTADO_NEUTRO_DIM = 'border border-line opacity-40';

function Feedback({ acertou, explicacao }: { acertou: boolean; explicacao?: string }) {
  return (
    <div className="space-y-1">
      <p className={`text-sm font-medium ${acertou ? 'text-sage' : 'text-hanko'}`}>
        {acertou ? '✓ Certo!' : '✗ Errado.'}
      </p>
      {explicacao && <p className="text-sm text-ink/80">{explicacao}</p>}
    </div>
  );
}

function TokenButton({
  token,
  onClick,
  disabled,
  estado,
}: {
  token: Token;
  onClick: () => void;
  disabled?: boolean;
  estado?: 'correta' | 'errada';
}) {
  const cor = estado === 'correta' ? ESTADO_CORRETO : estado === 'errada' ? ESTADO_ERRADO : 'border border-line bg-white/70 hover:bg-line/40';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex flex-col items-center rounded-lg px-3 py-1.5 leading-none transition-colors disabled:opacity-100 ${cor}`}
    >
      <span className="font-jp text-lg text-ink">{token.texto}</span>
      <span className="mt-0.5 text-[10px] italic text-sage">{token.romaji}</span>
    </button>
  );
}

function TokenDisplay({ token, tom = 'neutro' }: { token: Token; tom?: 'neutro' | 'correta' }) {
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className={`font-jp text-lg ${tom === 'correta' ? 'text-sage' : 'text-ink'}`}>{token.texto}</span>
      <span className="mt-0.5 text-[10px] italic text-sage">{token.romaji}</span>
    </span>
  );
}

function ReordenarFrase({ pergunta, ultima, onResponder, onAvancar }: CardProps<Extract<PerguntaGerada, { tipo: 'reordenar-frase' }>>) {
  const [ordem, setOrdem] = useState<Token[]>([]);
  const [respondida, setRespondida] = useState(false);
  const [acertou, setAcertou] = useState(false);

  const restantes = pergunta.tokensEmbaralhados.filter((t) => !ordem.includes(t));

  function conferir() {
    const certo = ordem.every((t, i) => t.texto === pergunta.respostaCorreta[i]?.texto);
    setAcertou(certo);
    setRespondida(true);
    onResponder({
      acertou: certo,
      suaResposta: ordem.map((t) => t.texto).join(''),
      respostaCorreta: pergunta.respostaCorreta.map((t) => t.texto).join(''),
    });
  }

  return (
    <div className="card-surface space-y-4">
      <p className="text-sm text-sage">Toque nas palavras na ordem certa para formar a frase:</p>
      <p className="text-sm text-ink">{pergunta.pt}</p>

      <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-lg border border-dashed border-line bg-paper/60 p-3">
        {ordem.length === 0 && <span className="text-sm text-sage">Toque nas palavras abaixo</span>}
        {ordem.map((t, i) => (
          <TokenButton
            key={i}
            token={t}
            disabled={respondida}
            estado={respondida ? (t.texto === pergunta.respostaCorreta[i]?.texto ? 'correta' : 'errada') : undefined}
            onClick={() => setOrdem((o) => o.filter((_, j) => j !== i))}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {restantes.map((t, i) => (
          <TokenButton key={i} token={t} disabled={respondida} onClick={() => setOrdem((o) => [...o, t])} />
        ))}
      </div>

      {respondida && !acertou && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink/70">Resposta correta:</span>
          {pergunta.respostaCorreta.map((t, i) => (
            <TokenDisplay key={i} token={t} tom="correta" />
          ))}
        </div>
      )}
      {respondida && <Feedback acertou={acertou} />}

      {!respondida ? (
        <button className="btn-primary w-full" disabled={restantes.length > 0} onClick={conferir}>
          Conferir
        </button>
      ) : (
        <button className="btn-primary w-full" onClick={onAvancar}>
          {ultima ? 'Finalizar' : 'Próxima'}
        </button>
      )}
    </div>
  );
}

function EscolherParticula({ pergunta, ultima, onResponder, onAvancar }: CardProps<Extract<PerguntaGerada, { tipo: 'escolher-particula' }>>) {
  const [escolhida, setEscolhida] = useState<string | null>(null);

  function escolher(alt: string) {
    if (escolhida) return;
    setEscolhida(alt);
    const antesText = pergunta.antes.map((t) => t.texto).join('');
    const depoisText = pergunta.depois.map((t) => t.texto).join('');
    onResponder({
      acertou: alt === pergunta.correta,
      suaResposta: `${antesText}${alt}${depoisText}`,
      respostaCorreta: `${antesText}${pergunta.correta}${depoisText}`,
    });
  }

  const acertou = escolhida === pergunta.correta;

  return (
    <div className="card-surface space-y-4">
      <p className="text-sm text-sage">Escolha a partícula correta:</p>

      <div className="flex flex-wrap items-end gap-1.5">
        {pergunta.antes.map((t, i) => (
          <TokenDisplay key={`a${i}`} token={t} />
        ))}
        <span
          className={[
            'mx-1 inline-flex min-w-9 flex-col items-center rounded px-1 pb-0.5 text-center',
            !escolhida ? 'border-b-2 border-indigo' : acertou ? ESTADO_CORRETO : ESTADO_ERRADO,
          ].join(' ')}
        >
          <span className="font-jp text-lg text-ink">{escolhida ?? '？'}</span>
        </span>
        {pergunta.depois.map((t, i) => (
          <TokenDisplay key={`d${i}`} token={t} />
        ))}
      </div>

      <p className="text-sm text-ink/80">{pergunta.pt}</p>

      <div className="grid grid-cols-4 gap-2">
        {pergunta.alternativas.map((alt) => {
          const estado = !escolhida
            ? ''
            : alt === pergunta.correta
              ? ESTADO_CORRETO
              : alt === escolhida
                ? ESTADO_ERRADO
                : ESTADO_NEUTRO_DIM;
          return (
            <button
              key={alt}
              onClick={() => escolher(alt)}
              disabled={!!escolhida}
              className={`rounded-lg border border-line bg-white/70 py-2 font-jp text-lg text-ink transition-colors disabled:opacity-100 ${estado}`}
            >
              {alt}
            </button>
          );
        })}
      </div>

      {escolhida && !acertou && <p className="text-sm text-ink/70">Partícula correta: <span className="font-jp text-sage">{pergunta.correta}</span></p>}
      {escolhida && <Feedback acertou={acertou} />}

      {escolhida && (
        <button className="btn-primary w-full" onClick={onAvancar}>
          {ultima ? 'Finalizar' : 'Próxima'}
        </button>
      )}
    </div>
  );
}

function MultiplaEscolha({ pergunta, ultima, onResponder, onAvancar }: CardProps<Extract<PerguntaGerada, { tipo: 'significado' }>>) {
  const [escolhida, setEscolhida] = useState<number | null>(null);

  function escolher(i: number) {
    if (escolhida !== null) return;
    setEscolhida(i);
    onResponder({
      acertou: i === pergunta.correta,
      suaResposta: pergunta.alternativas[i],
      respostaCorreta: pergunta.alternativas[pergunta.correta],
    });
  }

  return (
    <div className="card-surface space-y-4">
      <p className="text-base text-ink">{pergunta.pergunta}</p>

      <div className="space-y-2">
        {pergunta.alternativas.map((alt, i) => {
          const estado =
            escolhida === null
              ? ''
              : i === pergunta.correta
                ? ESTADO_CORRETO
                : i === escolhida
                  ? ESTADO_ERRADO
                  : ESTADO_NEUTRO_DIM;
          return (
            <button
              key={i}
              onClick={() => escolher(i)}
              disabled={escolhida !== null}
              className={`w-full rounded-lg border border-line bg-white/70 px-4 py-2.5 text-left font-jp text-base text-ink transition-colors disabled:opacity-100 ${estado}`}
            >
              {alt}
            </button>
          );
        })}
      </div>

      {escolhida !== null && <Feedback acertou={escolhida === pergunta.correta} explicacao={pergunta.explicacao} />}

      {escolhida !== null && (
        <button className="btn-primary w-full" onClick={onAvancar}>
          {ultima ? 'Finalizar' : 'Próxima'}
        </button>
      )}
    </div>
  );
}

function VerdadeiroFalso({ pergunta, ultima, onResponder, onAvancar }: CardProps<Extract<PerguntaGerada, { tipo: 'verdadeiro-falso' }>>) {
  const [resposta, setResposta] = useState<boolean | null>(null);

  function responder(v: boolean) {
    if (resposta !== null) return;
    setResposta(v);
    onResponder({
      acertou: v === pergunta.correta,
      suaResposta: v ? 'Verdadeiro' : 'Falso',
      respostaCorreta: pergunta.correta ? 'Verdadeiro' : 'Falso',
    });
  }

  function estadoBotao(valor: boolean) {
    if (resposta === null) return '';
    if (valor === pergunta.correta) return ESTADO_CORRETO;
    if (valor === resposta) return ESTADO_ERRADO;
    return ESTADO_NEUTRO_DIM;
  }

  return (
    <div className="card-surface space-y-4">
      <p className="text-base text-ink">{pergunta.afirmacao}</p>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => responder(true)}
          disabled={resposta !== null}
          className={`btn-ghost disabled:opacity-100 ${estadoBotao(true)}`}
        >
          Verdadeiro
        </button>
        <button
          onClick={() => responder(false)}
          disabled={resposta !== null}
          className={`btn-ghost disabled:opacity-100 ${estadoBotao(false)}`}
        >
          Falso
        </button>
      </div>

      {resposta !== null && <Feedback acertou={resposta === pergunta.correta} explicacao={pergunta.explicacao} />}

      {resposta !== null && (
        <button className="btn-primary w-full" onClick={onAvancar}>
          {ultima ? 'Finalizar' : 'Próxima'}
        </button>
      )}
    </div>
  );
}

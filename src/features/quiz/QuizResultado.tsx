import type { PerguntaGerada, RegistroResposta } from '../../data/quiz/types';

export default function QuizResultado({ respostas }: { respostas: RegistroResposta[] }) {
  const acertos = respostas.filter((r) => r.acertou).length;

  return (
    <div className="space-y-4">
      <div className="card-surface text-center">
        <p className="font-display text-xl">
          Você acertou {acertos} de {respostas.length}
        </p>
      </div>

      <ul className="space-y-2">
        {respostas.map((r, i) => {
          const jp = r.pergunta.tipo === 'reordenar-frase' || r.pergunta.tipo === 'escolher-particula';
          return (
            <li
              key={i}
              className={`card-surface space-y-1.5 border-l-4 ${r.acertou ? 'border-l-sage' : 'border-l-hanko'}`}
            >
              <p className="text-sm text-ink">{enunciado(r.pergunta)}</p>
              <p className={`text-sm ${r.acertou ? 'text-sage' : 'text-hanko'}`}>
                {r.acertou ? '✓' : '✗'} Sua resposta:{' '}
                <span className={jp ? 'font-jp' : 'font-medium'}>{r.suaResposta}</span>
              </p>
              {!r.acertou && (
                <p className="text-sm text-sage">
                  Resposta correta: <span className={jp ? 'font-jp' : 'font-medium'}>{r.respostaCorreta}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function enunciado(pergunta: PerguntaGerada): string {
  switch (pergunta.tipo) {
    case 'reordenar-frase':
    case 'escolher-particula':
      return pergunta.pt;
    case 'significado':
      return pergunta.pergunta;
    case 'verdadeiro-falso':
      return pergunta.afirmacao;
  }
}

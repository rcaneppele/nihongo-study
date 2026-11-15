import { n5Homonimos, leituraEmKana } from '../../data/seed/n5';
import { emDestaque, formasDaPalavra, useEscritaDosCards } from './formas';

type PalavraDoCard = { front: string; reading?: string; kanji?: string };

/**
 * Uma palavra japonesa como o app a mostra: a forma em destaque (kana, por
 * padrão) e, pequena e discreta, a de apoio (o kanji — "pode ignorar por
 * enquanto", como nas tabelas das lições). Qual vai em destaque é a
 * preferência de Configurações (`useEscritaDosCards`).
 *
 * `apoio="so-kanji"`: na pergunta de uma revisão, o apoio só aparece quando
 * é o kanji — com kanji em destaque, o kana ao lado entregaria a leitura.
 */
export function Palavra({
  palavra,
  className = '',
  apoioClassName = 'text-base',
  apoio = 'sempre',
  emLinha = false,
  fixa = false,
}: {
  palavra: PalavraDoCard;
  className?: string;
  apoioClassName?: string;
  apoio?: 'sempre' | 'so-kanji' | 'nunca';
  /** Apoio ao lado, não embaixo (listas). */
  emLinha?: boolean;
  /** Mostra a frente como está (ver `StudyItem.frenteFixa`). */
  fixa?: boolean;
}) {
  const escrita = useEscritaDosCards();
  const { principal, apoio: outra } = fixa ? { principal: palavra.front, apoio: undefined } : emDestaque(formasDaPalavra(palavra), escrita);
  const mostrarApoio = outra !== undefined && (apoio === 'sempre' || (apoio === 'so-kanji' && escrita === 'kana'));
  const rotulo = escrita === 'kana' ? 'kanji' : 'leitura';
  return (
    <span className={emLinha ? 'inline-flex items-baseline gap-2' : 'inline-flex flex-col items-center'}>
      <span className={`font-jp ${className}`}>{principal}</span>
      {mostrarApoio && (
        <span className={`font-jp text-sage ${apoioClassName}`} title={`${rotulo}: ${outra}`}>
          <span className="sr-only">{rotulo}: </span>
          {outra}
        </span>
      )}
    </span>
  );
}

/**
 * A leitura que falta ver depois da resposta: o romaji (o aluno ainda está
 * aprendendo kana) e, com kanji em destaque, o kana antes dele.
 */
export function LeituraDaPalavra({
  palavra,
  className = '',
  fixa = false,
}: {
  palavra: PalavraDoCard;
  className?: string;
  /** Mostra a leitura do card como está (ver `StudyItem.frenteFixa`). */
  fixa?: boolean;
}) {
  const escrita = useEscritaDosCards();
  const formas = formasDaPalavra(palavra);
  const partes = fixa
    ? [palavra.reading].filter(Boolean)
    : [escrita === 'kanji' && formas.kanji ? formas.kana : undefined, formas.romaji].filter(Boolean);
  if (partes.length === 0) return null;
  return <p className={`font-jp text-sage ${className}`}>{partes.join(' · ')}</p>;
}

/**
 * Homônimos do deck N5 (はし: 橋 "ponte" e 箸 "hashi"): em kana as duas se
 * escrevem igual, então a resposta mostra a outra — pra quem lembrou do
 * outro sentido saber que não errou a leitura, só a palavra.
 */
export function Homonimos({ front }: { front: string }) {
  const outras = n5Homonimos(front);
  if (outras.length === 0) return null;
  return (
    <p className="mt-2 text-xs text-sage">
      Mesma leitura, outra palavra:{' '}
      {outras.map((e, i) => (
        <span key={e.front}>
          {i > 0 && '; '}
          <span className="font-jp text-ink">{leituraEmKana(e) === e.front ? e.front : `${leituraEmKana(e)}（${e.front}）`}</span> — {e.back}
        </span>
      ))}
    </p>
  );
}

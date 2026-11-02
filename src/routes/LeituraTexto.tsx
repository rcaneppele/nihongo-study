import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getTextoById, rotuloNivel } from '../data/leitura/textos';
import type { ReadingLine, ReadingText, ReadingWord } from '../data/leitura/types';
import Furigana from '../components/Furigana';
import AudioButton from '../components/AudioButton';
import SaveWordForm from '../features/flashcards/SaveWordForm';
import ReadAloudBar from '../features/leitura/ReadAloudBar';
import { useReadAloud, type ReadAloudMode } from '../features/leitura/useReadAloud';
import { finishReading, knownPercent, textWords, useKnownWords, wordKey } from '../features/leitura/knowledge';
import { registrarResultados } from '../features/exercicios/historico';
import { registrarAtividade } from '../features/atividade/atividade';
import { CheckCircle2, ChevronLeft, Mic, X } from 'lucide-react';

/** Autoavaliação depois de escutar com o texto escondido (nota da escuta). */
const NOTAS_ESCUTA = [
  { score: 1, label: 'Quase tudo' },
  { score: 0.5, label: 'Uma parte' },
  { score: 0, label: 'Pouco' },
] as const;

// Na palavra, guarda a linha e a posição também — pra salvar o card com a
// frase de contexto e a palavra destacada nela.
type Selection =
  | { kind: 'word'; word: ReadingWord; line: ReadingLine; lineIndex: number; wordIndex: number }
  | { kind: 'line'; line: ReadingLine };

export default function LeituraTexto() {
  const { id } = useParams<{ id: string }>();
  const texto = id ? getTextoById(id) : undefined;
  const [showFurigana, setShowFurigana] = useState(true);
  const [selection, setSelection] = useState<Selection | null>(null);
  // `?modo=` vem da lista de leitura aberta por um hub do método:
  // "ouvir" = escutar antes de ler (texto escondido); "shadowing" = modo
  // shadowing já selecionado.
  const [params] = useSearchParams();
  const modoDaUrl = params.get('modo');
  const [readMode, setReadMode] = useState<ReadAloudMode>(modoDaUrl === 'shadowing' ? 'shadowing' : 'normal');
  const [hideText, setHideText] = useState(modoDaUrl === 'ouvir');
  // Escutou com o texto escondido: ao mostrar o texto, pergunta quanto entendeu.
  const [ouviuEscondido, setOuviuEscondido] = useState(false);
  const [avaliandoEscuta, setAvaliandoEscuta] = useState(false);
  const [shadowingFeito, setShadowingFeito] = useState(false);
  const lineTexts = (texto?.lines ?? []).map((line) => line.words.map((w) => w.text).join(''));
  const readAloud = useReadAloud(lineTexts, readMode, (modo) => {
    if (modo !== 'shadowing' || !texto) return;
    void registrarResultados([{ kind: 'shadowing', itemId: texto.id }]);
    void registrarAtividade('praticas', 1);
    setShadowingFeito(true);
  });
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeLine = readAloud.state.status === 'idle' ? null : readAloud.state.line;
  // Palavras tocadas nesta leitura (chave = wordKey) — ao concluir, contam
  // como "consultadas"; as demais, como "compreendidas".
  const [lookedUp, setLookedUp] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState<{ understood: number; lookedUp: number } | null>(null);
  const known = useKnownWords();

  // Acompanha a linha sendo lida, pra ela não sair da tela em textos longos.
  useEffect(() => {
    if (readAloud.state.status !== 'playing') return;
    lineRefs.current[readAloud.state.line]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [readAloud.state.status, readAloud.state.line]);

  function ouvir() {
    if (hideText) setOuviuEscondido(true);
    readAloud.play();
  }

  function mostrarTexto() {
    if (ouviuEscondido) setAvaliandoEscuta(true);
    else setHideText(false);
  }

  function avaliarEscuta(score: number | null) {
    if (score !== null && texto) {
      void registrarResultados([{ kind: 'escuta', itemId: texto.id, score }]);
      void registrarAtividade('praticas', 1);
    }
    setOuviuEscondido(false);
    setAvaliandoEscuta(false);
    setHideText(false);
  }

  function select(next: Selection) {
    if (next.kind === 'word') {
      const key = wordKey(next.word);
      if (key) setLookedUp((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
    }
    // Sem rolar a página: no desktop o cartão fica fixo no topo da coluna
    // (sticky) e no celular vira um painel fixo no rodapé.
    setSelection(next);
  }

  if (!texto) {
    return (
      <div className="card-surface text-center">
        <p className="text-sage">Texto não encontrado.</p>
        <Link to="/leitura" className="btn-ghost mt-3 inline-block">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${selection ? 'pb-64 md:pb-0' : ''}`}>
      <Link
        to={`/leitura${modoDaUrl ? `?modo=${modoDaUrl}` : ''}`}
        className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" />
        Todos os textos
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1.5">
          <h1 className="font-jp text-2xl font-medium">{texto.title}</h1>
          <div className="flex flex-wrap gap-1.5">
            <span className="badge bg-matcha/12 text-matcha">{rotuloNivel(texto.level)}</span>
            {known && <span className="badge bg-line/70 text-sage">conhece ~{knownPercent(texto, known)}%</span>}
          </div>
        </div>
        <button
          className={`chip ${showFurigana ? 'chip-active' : ''}`}
          aria-pressed={showFurigana}
          onClick={() => setShowFurigana((v) => !v)}
          title="Leitura em hiragana em cima dos kanji"
        >
          Furigana
        </button>
      </div>

      <ReadAloudBar
        state={readAloud.state}
        totalLines={texto.lines.length}
        mode={readMode}
        onModeChange={setReadMode}
        hideText={hideText}
        onHideTextChange={(hide) => (hide ? setHideText(true) : mostrarTexto())}
        onPlay={ouvir}
        onPause={readAloud.pause}
        onRestart={readAloud.restart}
      />

      <div
        className={[
          'card-surface min-h-20 md:sticky md:top-4 md:z-10',
          selection
            ? 'fixed inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] z-30 max-h-[60vh] overflow-y-auto shadow-xl md:inset-x-auto md:bottom-auto md:max-h-none md:shadow-card'
            : '',
        ].join(' ')}
      >
        {selection ? (
          <div className="relative space-y-1 pr-8">
            <button
              className="absolute right-0 top-0 grid h-7 w-7 place-items-center rounded-full text-sage hover:bg-line/60 hover:text-ink"
              onClick={() => setSelection(null)}
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
              {selection.kind === 'word' ? (
                <Furigana
                  segments={[{ text: selection.word.text, reading: selection.word.reading }]}
                  className="font-jp text-xl"
                />
              ) : (
                selection.line.words.map((word, j) => (
                  <Furigana
                    key={j}
                    segments={[{ text: word.text, reading: showFurigana ? word.reading : undefined }]}
                    className="font-jp text-xl"
                  />
                ))
              )}
              <AudioButton
                text={
                  selection.kind === 'word'
                    ? selection.word.text
                    : selection.line.words.map((w) => w.text).join('')
                }
                size="sm"
              />
            </div>
            <p className="text-sm text-ink">
              {selection.kind === 'word'
                ? (selection.word.meaning ?? '(sem tradução — palavra gramatical)')
                : selection.line.translation}
            </p>
            {selection.kind === 'word' && selection.word.meaning && (
              <div className="pt-2">
                <SaveWordForm
                  key={`${selection.lineIndex}-${selection.wordIndex}`}
                  word={selection.word}
                  wordIndex={selection.wordIndex}
                  line={selection.line}
                  texto={texto}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-sage">
            Toque numa palavra para ver o significado, ou em <span className="font-semibold">PT</span> para ver a
            frase completa.
          </p>
        )}
      </div>

      <div className="card-surface space-y-5">
        {shadowingFeito && (
          <p className="flex items-center gap-1.5 rounded-xl bg-sakura/8 px-3 py-2 text-sm text-sakura">
            <Mic className="h-4 w-4" />
            Shadowing do texto inteiro registrado — conta no seu nível de Falar.
          </p>
        )}
        {hideText && avaliandoEscuta && (
          <div className="space-y-2 rounded-xl bg-sora/8 px-3 py-2 text-sm">
            <p className="font-medium text-ink">Quanto você entendeu só de ouvido?</p>
            <div className="flex flex-wrap gap-2">
              {NOTAS_ESCUTA.map((n) => (
                <button key={n.label} className="btn-ghost px-3 py-1 text-xs" onClick={() => avaliarEscuta(n.score)}>
                  {n.label}
                </button>
              ))}
              <button className="px-2 py-1 text-xs text-sage hover:text-ink" onClick={() => avaliarEscuta(null)}>
                Pular
              </button>
            </div>
          </div>
        )}
        {hideText && !avaliandoEscuta && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-matcha/8 px-3 py-2 text-sm">
            <span className="text-sage">Texto escondido — ouça e tente entender antes de ler.</span>
            <button className="btn-ghost px-3 py-1 text-xs" onClick={mostrarTexto}>
              Mostrar texto
            </button>
          </div>
        )}
        {texto.lines.map((line, i) => (
          <div
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={`-mx-3 flex flex-wrap items-start gap-x-1 gap-y-2 rounded-r-xl border-l-4 px-2 py-1 transition-colors ${
              activeLine === i ? 'border-matcha bg-matcha/8' : 'border-transparent'
            }`}
          >
            <AudioButton text={lineTexts[i]} size="sm" />
            <div
              className={`contents ${hideText ? '[&>*]:pointer-events-none [&>*]:select-none [&>*]:blur' : ''}`}
              aria-hidden={hideText}
            >
              <button
                type="button"
                onClick={() => select({ kind: 'line', line })}
                className="inline-flex h-6 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tracking-wide text-sage transition-colors hover:bg-matcha/10 hover:text-matcha"
                aria-label="PT — ver tradução da frase completa"
                title="Ver tradução da frase completa"
              >
                PT
              </button>
              {line.words.map((word, j) => (
                <button
                  key={j}
                  onClick={() => select({ kind: 'word', word, line, lineIndex: i, wordIndex: j })}
                  className={`rounded px-0.5 leading-relaxed transition-colors hover:bg-matcha/10 ${
                    selection?.kind === 'word' && selection.lineIndex === i && selection.wordIndex === j
                      ? 'bg-matcha/15'
                      : ''
                  }`}
                >
                  <Furigana
                    segments={[{ text: word.text, reading: showFurigana ? word.reading : undefined }]}
                    className="font-jp text-lg"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {finished ? (
        <ReadingSummary
          texto={texto}
          result={finished}
          lookedUp={lookedUp}
          onReadAgain={() => {
            setFinished(null);
            setLookedUp(new Set());
            setSelection(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <div className="card-surface flex flex-wrap items-center justify-between gap-3">
          <span className="icon-tile bg-matcha/12 text-matcha">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <p className="min-w-0 flex-1 text-sm text-sage">
            {lookedUp.size === 0
              ? 'Leu até o fim? Registre a leitura — as palavras que você não precisou consultar contam como compreendidas.'
              : `Você consultou ${lookedUp.size} palavra(s) nesta leitura. As demais contam como compreendidas.`}
          </p>
          <button
            className="btn-primary"
            onClick={async () => {
              readAloud.stop();
              await finishReading(texto, lookedUp);
              const total = textWords(texto).length;
              const consulted = textWords(texto).filter((w) => lookedUp.has(w.key)).length;
              setFinished({ understood: total - consulted, lookedUp: consulted });
            }}
          >
            Terminei a leitura
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Resumo depois de "Terminei a leitura": quantas palavras foram lidas sem
 * consultar e a lista das consultadas, cada uma com "Salvar nos flash cards"
 * — as candidatas naturais a virar card.
 */
function ReadingSummary({
  texto,
  result,
  lookedUp,
  onReadAgain,
}: {
  texto: ReadingText;
  result: { understood: number; lookedUp: number };
  lookedUp: Set<string>;
  onReadAgain: () => void;
}) {
  const consulted = textWords(texto).filter((w) => lookedUp.has(w.key));

  return (
    <div className="card-hero space-y-4">
      <div className="flex items-center gap-3">
        <span className="icon-tile h-11 w-11 rounded-2xl bg-matcha/12 text-matcha">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <p className="font-display text-lg font-semibold tracking-tight">Leitura registrada</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="badge bg-matcha/12 text-xs text-matcha">{result.understood} compreendida(s)</span>
            <span className="badge bg-kin/12 text-xs text-kin">{result.lookedUp} consultada(s)</span>
          </div>
        </div>
      </div>

      {consulted.length > 0 && (
        <div className="space-y-3">
          <p className="label">Palavras que você consultou</p>
          {consulted.map((w) => (
            <div key={w.key} className="space-y-1.5 border-t border-line pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <Furigana segments={[{ text: w.word.text, reading: w.word.reading }]} className="font-jp text-lg" />
                <AudioButton text={w.word.text} size="sm" />
                <span className="text-sm text-ink">{w.word.meaning}</span>
              </div>
              <SaveWordForm word={w.word} wordIndex={w.wordIndex} line={w.line} texto={texto} />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button className="btn-ghost" onClick={onReadAgain}>
          Ler de novo
        </button>
        <Link to="/leitura" className="btn-primary">
          Escolher outro texto
        </Link>
      </div>
    </div>
  );
}

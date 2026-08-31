import { useEffect, useRef, useState } from 'react';
import { useHoldToPauseAdvance } from '../../lib/useHoldToPauseAdvance';
import { speakJapanese } from '../audio/speech';
import KanaCanvas from '../../components/KanaCanvas';
import type { ItemKakitori, ModoKakitori, RegistroKakitori } from '../../data/kakitori/types';

const AUTO_ADVANCE_MS = 1400;

export default function KakitoriSession({
  itens,
  modo,
  onFinalizar,
  onDesistir,
}: {
  itens: ItemKakitori[];
  modo: ModoKakitori;
  onFinalizar: (registros: RegistroKakitori[]) => void;
  onDesistir: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [registros, setRegistros] = useState<RegistroKakitori[]>([]);

  const item = itens[index];
  if (!item) return null;

  const ultimo = index === itens.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <span>
          {index + 1} de {itens.length}
        </span>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onDesistir}>
          Desistir e voltar
        </button>
      </div>

      <ItemCard
        key={item.id}
        item={item}
        modo={modo}
        ultimo={ultimo}
        onResponder={(r) => setRegistros((prev) => [...prev, r])}
        onAvancar={() => (ultimo ? onFinalizar([...registros]) : setIndex((i) => i + 1))}
      />
    </div>
  );
}

function ItemCard({
  item,
  modo,
  ultimo,
  onResponder,
  onAvancar,
}: {
  item: ItemKakitori;
  modo: ModoKakitori;
  ultimo: boolean;
  onResponder: (r: RegistroKakitori) => void;
  onAvancar: () => void;
}) {
  const [resposta, setResposta] = useState('');
  const [revelado, setRevelado] = useState(false);
  const [avaliado, setAvaliado] = useState<boolean | null>(null);

  // Toca o áudio assim que o item aparece, pra imitar o sensei ditando — o botão fica disponível
  // pra repetir quantas vezes o usuário quiser.
  useEffect(() => {
    speakJapanese(item.audioText);
  }, [item.id, item.audioText]);

  function avaliar(acertou: boolean) {
    setAvaliado(acertou);
    onResponder({ item, acertou, suaResposta: modo === 'desenhar' ? '(desenhado)' : resposta });
  }

  return (
    <div className="card-surface space-y-4">
      <span className="inline-block rounded-full bg-line px-2 py-0.5 text-xs text-sage">{item.origemLabel}</span>

      <div className="flex flex-col items-center gap-2 py-2">
        <button
          type="button"
          className="btn-primary inline-flex items-center gap-2"
          onClick={() => speakJapanese(item.audioText)}
        >
          🔊 Ouvir
        </button>
        <p className="text-xs text-sage">Toque quantas vezes quiser antes de responder</p>
      </div>

      {modo === 'digitar' ? (
        !revelado ? (
          <>
            <div>
              <label className="label" htmlFor="resposta-kakitori">
                Escreva o que você ouviu
              </label>
              <input
                id="resposta-kakitori"
                className="field w-full"
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setRevelado(true)}
                autoFocus
                autoComplete="off"
              />
            </div>
            <button className="btn-primary w-full" onClick={() => setRevelado(true)}>
              Revelar resposta
            </button>
          </>
        ) : (
          <div className="space-y-1 rounded-lg border border-line bg-paper/60 p-3">
            <p className="text-xs text-sage">Sua resposta</p>
            <p className="font-jp text-base text-ink">
              {resposta.trim() ? resposta : <span className="italic text-sage">(em branco)</span>}
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-sage">Desenhe o que você ouviu</p>
          <KanaCanvas />
          {!revelado && (
            <button className="btn-primary w-full" onClick={() => setRevelado(true)}>
              Revelar resposta
            </button>
          )}
        </div>
      )}

      {revelado && (
        <div className="space-y-3">
          <div className="space-y-1 rounded-lg border border-sage/40 bg-sage/10 p-3">
            <p className="text-xs text-sage">Resposta certa</p>
            <p className="font-jp text-lg text-ink">{item.kana}</p>
            {item.kanji && <p className="font-jp text-sm text-ink/70">{item.kanji}</p>}
            {item.romaji && <p className="text-sm italic text-sage">{item.romaji}</p>}
            <p className="text-sm text-ink/80">{item.pt}</p>
          </div>

          {avaliado === null ? (
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-ghost border-hanko/40 text-hanko" onClick={() => avaliar(false)}>
                ✗ Errei
              </button>
              <button className="btn-ghost border-sage/40 text-sage" onClick={() => avaliar(true)}>
                ✓ Acertei
              </button>
            </div>
          ) : (
            <AvancarAuto acertou={avaliado} ultimo={ultimo} onAvancar={onAvancar} />
          )}
        </div>
      )}
    </div>
  );
}

/** Mesmo padrão de avanço automático do quiz (`QuizSession`): dá tempo de conferir a marcação antes
 * de seguir, mas o usuário pode tocar "Próxima" a qualquer momento ou segurar a tela pra pausar. */
function AvancarAuto({ acertou, ultimo, onAvancar }: { acertou: boolean; ultimo: boolean; onAvancar: () => void }) {
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const paused = useHoldToPauseAdvance(AUTO_ADVANCE_MS, onAvancar);

  useEffect(() => {
    const focusId = setTimeout(() => nextBtnRef.current?.focus(), 0);
    return () => clearTimeout(focusId);
  }, []);

  return (
    <div className="space-y-1">
      <p className={`text-center text-sm font-medium ${acertou ? 'text-sage' : 'text-hanko'}`}>
        {acertou ? '✓ Marcado como acerto' : '✗ Marcado como erro'}
      </p>
      <button ref={nextBtnRef} className="btn-primary w-full" onClick={onAvancar}>
        {ultimo ? 'Finalizar' : 'Próxima'}
      </button>
      <div className="h-1 w-full overflow-hidden rounded-full bg-line">
        <div
          className={`countdown-bar h-full bg-indigo/50 ${paused ? 'paused' : ''}`}
          style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
        />
      </div>
      <p className="text-center text-[11px] text-sage/70">
        {paused ? 'Pausado — solte para continuar' : 'Toque e segure para pausar'}
      </p>
    </div>
  );
}

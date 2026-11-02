import { useEffect, useMemo, useState } from 'react';
import AudioButton from '../../components/AudioButton';
import SessionHeader from '../../components/SessionHeader';
import StudyCard from '../../components/StudyCard';
import { useShortcuts } from '../../lib/useShortcuts';
import { embaralhar } from '../../lib/aleatorio';
import { speakJapanese } from '../audio/speech';
import { kanaAudio, kanaExibicao, romaji, type ItemDiga, type RegistroDiga } from './gerador';

/**
 * Sessão do "Diga em japonês": português → (dica opcional com as palavras
 * embaralhadas) → revelar kana + romaji + áudio → "Errei"/"Acertei".
 * Mesmos atalhos das revisões: Espaço revela e, revelado, conta como acerto;
 * 1/2 = Errei/Acertei; Ctrl+Z volta uma frase.
 */
export default function DigaSession({
  itens,
  onFinalizar,
  onDesistir,
}: {
  itens: ItemDiga[];
  onFinalizar: (registros: RegistroDiga[]) => void;
  onDesistir: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const [dica, setDica] = useState(false);
  const [registros, setRegistros] = useState<RegistroDiga[]>([]);
  const item = itens[index];

  const embaralhadas = useMemo(
    () => (item ? embaralhar(item.tokens.map((t) => t.texto)) : []),
    [item]
  );

  // Ouvir a frase faz parte da conferência — toca sozinha ao revelar.
  useEffect(() => {
    if (revelado && item) speakJapanese(kanaAudio(item.tokens));
  }, [revelado, item]);

  function responder(acertou: boolean) {
    const novos = [...registros, { item, acertou }];
    setRegistros(novos);
    setRevelado(false);
    setDica(false);
    if (index + 1 >= itens.length) onFinalizar(novos);
    else setIndex(index + 1);
  }

  function voltar() {
    setRegistros((r) => r.slice(0, -1));
    setIndex((i) => i - 1);
    setRevelado(true);
    setDica(false);
  }

  useShortcuts({
    undo: index > 0 ? voltar : undefined,
    ' ': revelado ? () => responder(true) : () => setRevelado(true),
    Enter: revelado ? () => responder(true) : () => setRevelado(true),
    '1': revelado ? () => responder(false) : undefined,
    '2': revelado ? () => responder(true) : undefined,
  });

  if (!item) return null;

  return (
    <div className="space-y-4">
      <SessionHeader index={index} total={itens.length} onUndo={index > 0 ? voltar : undefined} onQuit={onDesistir} />

      <StudyCard
        etiqueta={
          <span className="badge bg-fuji/12 text-xs text-fuji">
            {item.emoji} {item.origem}
          </span>
        }
      >
        <div className="w-full space-y-4">
        <p className="label">Diga em japonês — em voz alta ou de cabeça</p>
        <p className="text-2xl">{item.pt}</p>

        {!revelado &&
          (dica ? (
            <div className="flex flex-wrap justify-center gap-2">
              {embaralhadas.map((t, i) => (
                <span key={i} className="rounded-lg border border-line px-2.5 py-1 font-jp text-lg">
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <button className="text-xs text-sage hover:text-indigo hover:underline" onClick={() => setDica(true)}>
              Travou? Ver as palavras embaralhadas
            </button>
          ))}

        {revelado && (
          <div className="space-y-1 border-t border-line pt-4">
            <div className="flex items-center justify-center gap-2">
              <p className="font-jp text-3xl">{kanaExibicao(item.tokens)}</p>
              <AudioButton text={kanaAudio(item.tokens)} />
            </div>
            <p className="text-sm text-sage">{romaji(item.tokens)}</p>
          </div>
        )}
        </div>
      </StudyCard>

      {!revelado ? (
        <button className="btn-primary w-full" onClick={() => setRevelado(true)}>
          Mostrar resposta <kbd className="kbd">Espaço</kbd>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <button className="btn flex-col gap-0.5 border border-hanko/30 bg-hanko/5 py-2.5 text-hanko hover:bg-hanko/10" onClick={() => responder(false)} title="Não consegui dizer, ou disse diferente">
            <span className="flex items-center gap-1.5">
              Errei <kbd className="kbd">1</kbd>
            </span>
            <span className="text-xs font-normal opacity-75">dá pra salvar no fim</span>
          </button>
          <button className="btn-primary flex-col gap-0.5 py-2.5" onClick={() => responder(true)} title="Disse a frase certa (pequenas variações naturais contam)">
            <span className="flex items-center gap-1.5">
              Acertei <kbd className="kbd">2</kbd> <kbd className="kbd">Espaço</kbd>
            </span>
            <span className="text-xs font-normal opacity-75">próxima frase</span>
          </button>
        </div>
      )}
    </div>
  );
}

import { Target } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type KanaType } from '../../db/schema';
import { KANA_FAMILIES, familyPreview, getKanaByFamilies, type KanaGroup } from '../../data/kana';
import { desempenhoPorFamilia, type DesempenhoFamilia, type ModoKana } from './desempenho';
import type { Escrita } from './treino';
import Segmentado from '../../components/Segmentado';

/** Tela de configuração do treino de kana: modo, escrita, famílias e "praticar fracos". */
export default function KanaConfig({
  mode,
  setMode,
  script,
  setScript,
  selected,
  onToggleFamily,
  onSetGroupSelection,
  onStart,
  weakCount,
  onStartWeak,
}: {
  mode: ModoKana;
  setMode: (m: ModoKana) => void;
  script: Escrita;
  setScript: (s: Escrita) => void;
  selected: Set<string>;
  onToggleFamily: (key: string) => void;
  onSetGroupSelection: (group: KanaGroup, on: boolean) => void;
  onStart: () => void;
  weakCount: number;
  onStartWeak: () => void;
}) {
  const single = KANA_FAMILIES.filter((f) => f.group === 'single');
  const composite = KANA_FAMILIES.filter((f) => f.group === 'composite');
  const previewType: KanaType = script === 'katakana' ? 'katakana' : 'hiragana';
  const selectedCount = getKanaByFamilies(script, selected).length;
  const progresso = useLiveQuery(() => db.kanaProgress.toArray(), []);
  const desempenho = desempenhoPorFamilia(progresso ?? [], script, mode);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="label">Modo de treino</p>
          <Segmentado
            rotulo="Modo de treino"
            valor={mode}
            onChange={setMode}
            opcoes={[
              { valor: 'romaji', rotulo: 'Digitar romaji' },
              { valor: 'escolha', rotulo: 'Múltipla escolha' },
              { valor: 'desenho', rotulo: 'Desenhar' },
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <p className="label">Escrita</p>
          <Segmentado
            rotulo="Escrita"
            valor={script}
            onChange={setScript}
            opcoes={[
              { valor: 'hiragana', rotulo: 'Hiragana' },
              { valor: 'katakana', rotulo: 'Katakana' },
              { valor: 'both', rotulo: 'Ambos' },
            ]}
          />
        </div>
      </div>

      <div className="card-surface flex flex-wrap items-center gap-4">
        <span className="icon-tile bg-sakura/12 text-sakura">
          <Target className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">Praticar pontos fracos</p>
          <p className="text-xs text-sage">
            {weakCount > 0
              ? `${weakCount} kana com mais erros no modo "${mode === 'romaji' ? 'digitar romaji' : mode === 'escolha' ? 'múltipla escolha' : 'desenhar'}"`
              : 'Pratique um pouco primeiro para identificarmos seus pontos fracos'}
          </p>
        </div>
        <button className="btn-ghost shrink-0" disabled={weakCount === 0} onClick={onStartWeak}>
          Praticar fracos
        </button>
      </div>

      <FamilyGroup
        title="Básicos (seion, dakuten, handakuten)"
        families={single}
        selected={selected}
        previewType={previewType}
        onToggle={onToggleFamily}
        desempenho={desempenho}
        onSelectAll={() => onSetGroupSelection('single', true)}
        onSelectNone={() => onSetGroupSelection('single', false)}
      />

      <FamilyGroup
        title="Combinados (yōon)"
        families={composite}
        selected={selected}
        previewType={previewType}
        onToggle={onToggleFamily}
        desempenho={desempenho}
        onSelectAll={() => onSetGroupSelection('composite', true)}
        onSelectNone={() => onSetGroupSelection('composite', false)}
      />

      <p className="text-xs text-sage">
        A barrinha em cada família é o seu acerto no modo escolhido:{' '}
        <span className="font-medium text-matcha">verde</span> a partir de 85%,{' '}
        <span className="font-medium text-kin">âmbar</span> a partir de 60%,{' '}
        <span className="font-medium text-hanko">vermelho</span> abaixo. Sem barra = ainda não praticou.
      </p>

      <div className="card-surface flex items-center justify-between gap-3">
        <p className="text-sm text-sage">
          <span className="font-semibold text-ink">{selectedCount}</span> kana selecionados
        </p>
        <button className="btn-primary" disabled={selectedCount === 0} onClick={onStart}>
          Iniciar teste
        </button>
      </div>
    </div>
  );
}

function FamilyGroup({
  title,
  families,
  selected,
  previewType,
  onToggle,
  desempenho,
  onSelectAll,
  onSelectNone,
}: {
  title: string;
  families: Array<{ key: string; group: KanaGroup }>;
  selected: Set<string>;
  previewType: KanaType;
  onToggle: (key: string) => void;
  desempenho: Map<string, DesempenhoFamilia>;
  onSelectAll: () => void;
  onSelectNone: () => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-ink">{title}</p>
        <div className="flex gap-3 text-sm">
          <button className="text-indigo hover:underline" onClick={onSelectAll}>
            Todos
          </button>
          <button className="text-sage hover:underline" onClick={onSelectNone}>
            Nenhum
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {families.map((f) => {
          const active = selected.has(f.key);
          const d = desempenho.get(f.key);
          return (
            <button
              key={f.key}
              onClick={() => onToggle(f.key)}
              title={
                d
                  ? `Acerto ${Math.round(d.taxa * 100)}% · ${d.praticados} de ${d.total} praticados`
                  : 'Ainda não praticado neste modo'
              }
              className={[
                'rounded-xl border p-2 text-center transition-colors',
                active ? 'border-kin/60 bg-kin/8' : 'border-line/70 bg-surface hover:border-kin/30',
              ].join(' ')}
            >
              <p className="font-jp text-lg leading-tight">{familyPreview(previewType, f.key)}</p>
              <p className="text-xs text-sage">{f.key}</p>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-line/70">
                {d && (
                  <span
                    className={`block h-full rounded-full ${
                      d.taxa >= 0.85 ? 'bg-matcha' : d.taxa >= 0.6 ? 'bg-kin' : 'bg-hanko/80'
                    }`}
                    style={{ width: `${Math.max(8, (d.praticados / d.total) * 100)}%` }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

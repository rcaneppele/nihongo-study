import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import PageHeader from '../components/PageHeader';
import { KANA_FAMILIES, getKanaByFamilies, type KanaEntry, type KanaGroup } from '../data/kana';
import type { ModoKana } from '../features/kana/desempenho';
import { montarSessao, type Escrita, type RespostaKana } from '../features/kana/treino';
import { getWeakKana, progressoDe, sessaoDeFracos } from '../features/kana/progresso';
import KanaConfig from '../features/kana/KanaConfig';
import KanaTeste from '../features/kana/KanaTeste';
import KanaResultado from '../features/kana/KanaResultado';
import { alternar, definirVarios } from '../lib/conjuntos';

type Etapa = 'config' | 'test' | 'result';

const SINGLE_FAMILIES = KANA_FAMILIES.filter((f) => f.group === 'single').map((f) => f.key);

export default function Kana() {
  const [stage, setStage] = useState<Etapa>('config');
  // `?modo=` vem dos hubs do método (ex.: Praticar › Escrever abre em "desenho").
  const [params] = useSearchParams();
  const modoDaUrl = params.get('modo');
  const [mode, setMode] = useState<ModoKana>(
    modoDaUrl === 'romaji' || modoDaUrl === 'escolha' || modoDaUrl === 'desenho' ? modoDaUrl : 'romaji'
  );
  const [script, setScript] = useState<Escrita>('hiragana');
  const [selected, setSelected] = useState<Set<string>>(new Set(SINGLE_FAMILIES));
  const [pool, setPool] = useState<KanaEntry[]>([]);
  const [answers, setAnswers] = useState<RespostaKana[]>([]);
  const [source, setSource] = useState<'normal' | 'weak'>('normal');
  const weakKana = useLiveQuery(() => getWeakKana(script, mode), [script, mode], [] as KanaEntry[]);

  function toggleFamily(key: string) {
    setSelected((prev) => alternar(prev, key));
  }

  function setGroupSelection(group: KanaGroup, on: boolean) {
    const keys = KANA_FAMILIES.filter((f) => f.group === group).map((f) => f.key);
    setSelected((prev) => definirVarios(prev, keys, on));
  }

  async function runTest(entries: KanaEntry[], applyWeighting: boolean) {
    setPool(montarSessao(entries, applyWeighting ? await progressoDe(entries) : [], mode, applyWeighting));
    setAnswers([]);
    setStage('test');
  }

  function startTest() {
    setSource('normal');
    return runTest(getKanaByFamilies(script, selected), true);
  }

  async function startWeakTest() {
    if (weakKana.length === 0) return;
    setSource('weak');
    // Sem repetição ponderada aqui: esse pool já É só os piores kana, então
    // pesar de novo por cima (como no teste normal) inflava demais a sessão
    // — 5 kana fracos viravam 17 perguntas. padWeakPool ainda garante um
    // mínimo de variedade quando há poucos kana fracos de verdade.
    return runTest(await sessaoDeFracos(weakKana, script, mode), false);
  }

  function restartTest() {
    return source === 'weak' ? startWeakTest() : startTest();
  }

  function finishTest(result: RespostaKana[]) {
    setAnswers(result);
    setStage('result');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<span className="font-jp text-xl">あ</span>}
        cor="kin"
        title="Treino de kana"
        subtitle="Hiragana e katakana"
      />

      {stage === 'config' && (
        <KanaConfig
          mode={mode}
          setMode={setMode}
          script={script}
          setScript={setScript}
          selected={selected}
          onToggleFamily={toggleFamily}
          onSetGroupSelection={setGroupSelection}
          onStart={startTest}
          weakCount={weakKana.length}
          onStartWeak={startWeakTest}
        />
      )}

      {stage === 'test' && (
        <KanaTeste pool={pool} mode={mode} onFinish={finishTest} onCancel={() => setStage('config')} />
      )}

      {stage === 'result' && (
        <KanaResultado
          answers={answers}
          onRestart={restartTest}
          onBackToConfig={() => setStage('config')}
        />
      )}
    </div>
  );
}

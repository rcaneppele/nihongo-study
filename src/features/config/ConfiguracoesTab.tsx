import { Goal, Layers, Palette } from 'lucide-react';
import { useTheme, type ThemeMode } from '../../lib/useTheme';
import { setGradeMode, useGradeMode, type GradeMode } from '../srs/gradeMode';
import { META_OPCOES, PESO_LEITURA, setMetaDiaria, useMetaDiaria } from '../atividade/atividade';
import { SectionTitle } from './ui';
import Segmentado, { type OpcaoSegmentada } from '../../components/Segmentado';

const THEME_OPTIONS: OpcaoSegmentada<ThemeMode>[] = [
  { valor: 'light', rotulo: 'Claro' },
  { valor: 'dark', rotulo: 'Escuro' },
  { valor: 'system', rotulo: 'Sistema' },
];

const GRADE_MODE_OPTIONS: OpcaoSegmentada<GradeMode>[] = [
  { valor: 'simple', rotulo: '2 botões' },
  { valor: 'full', rotulo: '4 botões' },
];

export default function ConfiguracoesTab() {
  const { mode, setMode } = useTheme();
  const gradeMode = useGradeMode();
  const metaDiaria = useMetaDiaria();

  return (
    <div className="space-y-6"> 
      <section className="card-surface space-y-3">
        <SectionTitle icon={<Palette className="h-4 w-4" />} cor="fuji">
          Aparência
        </SectionTitle>
        <p className="text-sm text-sage">
          "Sistema" segue o tema do seu aparelho/navegador e muda sozinho se ele mudar.
        </p>
        <Segmentado rotulo="Tema" opcoes={THEME_OPTIONS} valor={mode} onChange={setMode} />
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Goal className="h-4 w-4" />} cor="matcha">
          Meta diária
        </SectionTitle>
        <p className="text-sm text-sage">
          Quantas atividades por dia você quer fazer. Cada resposta (revisão, treino de kana, quiz, kakitori…) conta 1;
          um texto lido conta {PESO_LEITURA}. Aparece no início do app, junto com a sequência de dias.
        </p>
        <Segmentado
          rotulo="Meta diária"
          opcoes={META_OPCOES.map((n) => ({ valor: n, rotulo: n }))}
          valor={metaDiaria}
          onChange={setMetaDiaria}
        />
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Layers className="h-4 w-4" />} cor="sora">
          Revisão (flash cards e kanji)
        </SectionTitle>
        <p className="text-sm text-sage">
          "2 botões" mostra só Não lembrei e Lembrei — menos decisão por card, e o algoritmo funciona bem assim.
          "4 botões" acrescenta Com esforço e Fácil, para quem quer ajustar o intervalo com mais precisão.
        </p>
        <Segmentado rotulo="Botões de nota" opcoes={GRADE_MODE_OPTIONS} valor={gradeMode} onChange={setGradeMode} />
      </section>
    </div>
  );
}

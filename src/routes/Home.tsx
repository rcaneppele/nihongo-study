import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ArrowRight,
  BookOpen,
  BookOpenText,
  ChevronRight,
  Copy,
  Eye,
  Flame,
  MessageCircle,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { db, type ReadingProgress } from '../db/schema';
import { ALL_KANA } from '../data/kana';
import { KANJI_N5 } from '../data/kanji';
import { LEITURA_TEXTOS } from '../data/leitura/textos';
import { LICOES } from '../licoes';
import { buildReviewQueue } from '../features/flashcards/stages';
import { knownPercent, useKnownWords, type KnownWords } from '../features/leitura/knowledge';
import { PESO_LEITURA, useMetaDiaria, useResumoDia, type ResumoDia } from '../features/atividade/atividade';
import { carregarPontosFracos } from '../features/pontos-fracos/pontosFracos';
import StatCard from '../components/StatCard';
import ProgressRing from '../components/ProgressRing';
import { TILE, type Cor } from '../lib/cores';

/**
 * Início: saudação, bloco "Hoje" (meta diária + semana + sequência),
 * sugestão do que fazer agora, contadores de vocabulário/escrita e atalhos
 * por módulo. Visual descrito em docs/proposta-visual.md §4 (mockup em
 * docs/visual/mockup-home.html).
 */
export default function Home() {
  const known = useKnownWords();
  const resumo = useResumoDia();
  const meta = useMetaDiaria();
  // Mesma fila do "Estudar" em /flashcards (reconhecimento + produção).
  const dueCards = useLiveQuery(async () => buildReviewQueue(await db.cards.toArray()).length, [], 0);
  const kanaPracticed = useLiveQuery(() => db.kanaProgress.count(), [], 0);
  const kanjiDue = useLiveQuery(
    () => db.kanjiProgress.where('dueDate').belowOrEqual(Date.now()).count(),
    [],
    0
  );
  const kanjiLearned = useLiveQuery(() => db.kanjiProgress.count(), [], 0);
  const readingProgress = useLiveQuery(() => db.readingProgress.toArray(), []);
  const pontosFracos = useLiveQuery(async () => {
    const dados = await carregarPontosFracos();
    return Object.values(dados).reduce((n, lista) => n + lista.length, 0);
  }, []);
  const sugestoes = sugerir(dueCards, kanjiDue, known, readingProgress);

  return (
    <div className="space-y-5">
      <Saudacao />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {resumo && <Hoje resumo={resumo} meta={meta} />}
        {sugestoes.length > 0 && <ProximaAcao principal={sugestoes[0]} alternativa={sugestoes[1]} />}
      </div>

      <section className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatCard
          icon={<Eye className="h-[18px] w-[18px]" />}
          cor="matcha"
          valor={known?.understood.size ?? 0}
          label="Palavras compreendidas"
          crescimento={known?.understoodWeek}
          hint="Seu vocabulário passivo: palavras que você leu sem precisar consultar o significado, mais as dos flash cards que você já revisou. O selo mostra quantas entraram nos últimos 7 dias."
        />
        <StatCard
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
          cor="sora"
          valor={known?.canSay.size ?? 0}
          label="Palavras que sei dizer"
          crescimento={known?.canSayWeek}
          hint="Seu vocabulário ativo: flash cards no estágio Sei dizer ou Domino — você consegue dizer a palavra em japonês partindo do português. O selo mostra quantas entraram nos últimos 7 dias."
        />
        <StatCard
          icon={<span className="font-jp">あ</span>}
          cor="kin"
          valor={kanaPracticed}
          total={ALL_KANA.length}
          label="Kana praticados"
        />
        <StatCard
          icon={<span className="font-jp">字</span>}
          cor="hanko"
          valor={kanjiLearned}
          total={KANJI_N5.length}
          label="Kanji aprendidos"
        />
      </section>

      <section className="pt-3">
        <h2 className="mb-3 font-semibold">Continuar estudando</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Modulo
            to="/flashcards"
            icon={<Copy className="h-5 w-5" />}
            cor="sora"
            titulo="Flash cards"
            desc="Revisar e treinar a dizer"
            pendente={dueCards > 0 ? `${dueCards} hoje` : undefined}
          />
          <Modulo
            to="/leitura"
            icon={<BookOpenText className="h-5 w-5" />}
            cor="matcha"
            titulo="Leitura"
            desc={`${LEITURA_TEXTOS.length} textos · ${readingProgress?.length ?? 0} lido(s)`}
          />
          <Modulo
            to="/licoes"
            icon={<BookOpen className="h-5 w-5" />}
            cor="fuji"
            titulo="Lições"
            desc={`${LICOES.length} assuntos · quiz e "Diga em japonês"`}
          />
          <Modulo
            to="/kanji"
            icon={<span className="font-jp text-lg">字</span>}
            cor="hanko"
            titulo="Kanji"
            desc="Significado, leitura e traço"
            pendente={kanjiDue > 0 ? `${kanjiDue}` : undefined}
          />
          <Modulo
            to="/kana"
            icon={<span className="font-jp text-lg">あ</span>}
            cor="kin"
            titulo="Kana"
            desc="Hiragana e katakana"
          />
          <Modulo
            to="/pontos-fracos"
            icon={<Target className="h-5 w-5" />}
            cor="sakura"
            titulo="Pontos fracos"
            desc={pontosFracos ? `${pontosFracos} item(ns) para reforçar` : 'O que você mais erra, para reforçar'}
          />
        </div>
      </section>
    </div>
  );
}

/**
 * Saudação pela hora do dia, em japonês, com leitura e tradução pequenas —
 * o app não sabe o nome do usuário, e assim a saudação também ensina.
 */
function Saudacao() {
  const agora = new Date();
  const hora = agora.getHours();
  const [jp, romaji, pt] =
    hora < 11
      ? ['おはようございます', 'ohayou gozaimasu', 'bom dia']
      : hora < 18
        ? ['こんにちは', 'konnichiwa', 'boa tarde']
        : ['こんばんは', 'konbanwa', 'boa noite'];
  const data = agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header>
      <p className="text-sm text-sage">{data.charAt(0).toUpperCase() + data.slice(1)}</p>
      <h1 className="mt-0.5 font-jp text-2xl font-bold tracking-tight sm:text-3xl">{jp}</h1>
      <p className="text-xs text-sage">
        {romaji} — {pt}
      </p>
    </header>
  );
}

const DIAS_DA_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

/** Bloco "Hoje": anel da meta diária, o que foi feito hoje, faixa dos últimos 7 dias e sequência. */
function Hoje({ resumo, meta }: { resumo: ResumoDia; meta: number }) {
  const { hoje, pontos, sequencia, estudouHoje, semana } = resumo;
  const batida = pontos >= meta;

  const chips = [
    { n: hoje.revisoes, texto: 'revisões', classe: 'bg-sora/12 text-sora' },
    { n: hoje.novos, texto: 'novos', classe: 'bg-fuji/12 text-fuji' },
    { n: hoje.praticas, texto: 'práticas', classe: 'bg-kin/12 text-kin' },
    { n: hoje.leituras, texto: hoje.leituras === 1 ? 'texto lido' : 'textos lidos', classe: 'bg-matcha/12 text-matcha' },
  ].filter((c) => c.n > 0);

  return (
    <section className="card-hero">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Hoje</p>
        {sequencia > 0 && (
          <span className="badge bg-hanko/10 text-xs text-hanko">
            <Flame className="h-3.5 w-3.5" />
            {sequencia} {sequencia === 1 ? 'dia seguido' : 'dias seguidos'}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-5">
        <ProgressRing fracao={pontos / meta} cor={batida ? 'matcha' : 'indigo'}>
          <div>
            <p className="text-2xl font-semibold">{pontos}</p>
            <p className="mt-0.5 text-[11px] text-sage">de {meta}</p>
          </div>
        </ProgressRing>
        <div className="min-w-0 space-y-2">
          <p className="text-sm text-sage">
            {batida ? (
              <span className="font-semibold text-matcha">Meta de hoje batida — bom trabalho!</span>
            ) : (
              <>
                Faltam <span className="font-semibold text-ink">{meta - pontos} atividades</span> para a meta de hoje.
              </>
            )}
          </p>
          {chips.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <span key={c.texto} className={`badge text-xs ${c.classe}`}>
                  {c.n} {c.texto}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-sage">Cada resposta conta 1; um texto lido conta {PESO_LEITURA}.</p>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
        {semana.map((d, i) => {
          const ehHoje = i === semana.length - 1;
          return (
            <div
              key={d.day}
              className={[
                'rounded-2xl py-2',
                ehHoje ? 'bg-ink text-paper' : d.estudou ? 'bg-indigo/8 text-indigo' : 'text-ink/40',
              ].join(' ')}
              title={d.estudou ? 'Dia com estudo' : 'Sem estudo'}
            >
              <p className={`text-[11px] ${ehHoje ? 'text-paper/60' : 'text-sage'}`}>
                {DIAS_DA_SEMANA[d.diaDaSemana]}
              </p>
              <p className="font-semibold">{d.diaDoMes}</p>
              <span
                className={[
                  'mx-auto mt-1 block h-1.5 w-1.5 rounded-full',
                  d.estudou ? (ehHoje ? 'bg-hanko' : 'bg-indigo') : 'bg-transparent',
                ].join(' ')}
              />
            </div>
          );
        })}
      </div>
      {!estudouHoje && sequencia > 0 && (
        <p className="mt-3 text-xs text-hanko">Estude hoje para manter a sequência.</p>
      )}
    </section>
  );
}

interface Sugestao {
  to: string;
  titulo: string;
  porque: string;
  /** Rótulo curto pra aparecer como alternativa ("ou …"). */
  curto: string;
  icone: LucideIcon;
}

const DIA_MS = 24 * 60 * 60 * 1000;

/**
 * Próxima ação sugerida, em ordem de prioridade: revisões vencidas (são o
 * que segura o que já foi aprendido), depois leitura — input compreensível
 * é o centro do estudo —, e por fim palavras novas. O texto sugerido é o de
 * maior "% conhecido", penalizando os lidos nos últimos 3 dias e os já
 * relidos várias vezes.
 */
function sugerir(
  dueCards: number,
  kanjiDue: number,
  known: KnownWords | undefined,
  progress: ReadingProgress[] | undefined
): Sugestao[] {
  const lista: Sugestao[] = [];
  if (dueCards > 0) {
    lista.push({
      to: '/flashcards',
      titulo: `Revisar ${dueCards} flash card(s)`,
      porque: 'Revisão em dia é o que segura o que você já aprendeu — e leva poucos minutos.',
      curto: `revisar ${dueCards} flash card(s)`,
      icone: Copy,
    });
  }
  if (kanjiDue > 0) {
    lista.push({
      to: '/kanji',
      titulo: `Revisar ${kanjiDue} kanji`,
      porque: 'Kanji vencidos para revisão.',
      curto: `revisar ${kanjiDue} kanji`,
      icone: Sparkles,
    });
  }
  if (known && progress) {
    const porId = new Map(progress.map((p) => [p.textId, p]));
    const agora = Date.now();
    let melhor: { id: string; title: string; percent: number; score: number } | null = null;
    for (const t of LEITURA_TEXTOS) {
      const percent = knownPercent(t, known);
      const p = porId.get(t.id);
      const recente = p && agora - p.lastReadAt < 3 * DIA_MS;
      const score = percent - (recente ? 50 : 0) - (p?.timesRead ?? 0) * 5;
      if (!melhor || score > melhor.score) melhor = { id: t.id, title: t.title, percent, score };
    }
    if (melhor) {
      lista.push({
        to: `/leitura/${melhor.id}`,
        titulo: `Ler 「${melhor.title}」`,
        porque:
          melhor.percent >= 85
            ? `Você conhece ~${melhor.percent}% das palavras — no ponto para ler com fluidez e ainda aprender algo.`
            : melhor.percent > 0
              ? `É o texto em que você mais conhece palavras (~${melhor.percent}%). Toque nas que não souber.`
              : 'Ler textos curtos do seu nível é a forma mais natural de fixar vocabulário. Toque nas palavras que não souber.',
        curto: 'ler um texto',
        icone: BookOpenText,
      });
    }
  }
  lista.push({
    to: '/flashcards?tab=vocabulario',
    titulo: 'Aprender palavras novas',
    porque: 'O mapa de vocabulário sugere as próximas palavras mais úteis.',
    curto: 'aprender palavras novas',
    icone: Sparkles,
  });
  return lista;
}

/** Bloco "o que fazer agora": uma ação principal clara e uma alternativa discreta. */
function ProximaAcao({ principal, alternativa }: { principal: Sugestao; alternativa?: Sugestao }) {
  const Icone = principal.icone;
  return (
    <section className="card-hero flex flex-col justify-between gap-5">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="icon-tile h-9 w-9 bg-hanko text-paper">
            <Icone className="h-[18px] w-[18px]" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Sugestão para agora</p>
        </div>
        <p className="mt-4 text-xl font-semibold tracking-tight">{principal.titulo}</p>
        <p className="mt-1 text-sm leading-relaxed text-sage">{principal.porque}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link to={principal.to} className="btn-dark">
          Começar <ArrowRight className="h-4 w-4" />
        </Link>
        {alternativa && (
          <Link to={alternativa.to} className="text-sm text-sage underline-offset-4 hover:text-ink hover:underline">
            ou {alternativa.curto}
          </Link>
        )}
      </div>
    </section>
  );
}

/** Atalho de módulo: tile de ícone na cor do módulo, título com selo de pendência, descrição e seta. */
function Modulo({
  to,
  icon,
  cor,
  titulo,
  desc,
  pendente,
}: {
  to: string;
  icon: ReactNode;
  cor: Cor;
  titulo: string;
  desc: string;
  pendente?: string;
}) {
  return (
    <Link
      to={to}
      className="card-surface group flex min-w-0 items-center gap-4 p-4 transition-colors hover:border-indigo/40"
    >
      <span className={`icon-tile h-11 w-11 rounded-2xl ${TILE[cor]}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-medium">
          {titulo}
          {pendente && <span className="badge bg-hanko/10 text-hanko">{pendente}</span>}
        </span>
        <span className="block truncate text-sm text-sage">{desc}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChevronRight, Flame } from 'lucide-react';
import { db } from '../db/schema';
import { LEITURA_TEXTOS } from '../data/leitura/textos';
import { useKnownWords } from '../features/leitura/knowledge';
import { PESO_LEITURA, useMetaDiaria, useResumoDia, type ResumoDia } from '../features/atividade/atividade';
import { SECOES, type Secao, type SecaoId } from '../features/metodo/estrutura';
import { usePendencias } from '../features/metodo/pendencias';
import PlanoDoDia from '../features/metodo/PlanoDoDia';
import LembreteBackup from '../features/backup/LembreteBackup';
import AvisoInstalacao from '../features/backup/AvisoInstalacao';
import AvisoMudancaEndereco from '../features/backup/AvisoMudancaEndereco';
import AvisoSync from '../features/sync/AvisoSync';
import ProgressRing from '../components/ProgressRing';
import { TILE, type Cor } from '../lib/cores';

/**
 * "Hoje" (Início): saudação, bloco da meta diária (semana + sequência), o
 * plano do dia (Revisar → Aprender → Praticar, ver PlanoDoDia) e atalhos
 * para os hubs do método. Regras em regras-negocio.md §5d; visual em
 * docs/guia-visual.md.
 */
export default function Home() {
  const known = useKnownWords();
  const resumo = useResumoDia();
  const meta = useMetaDiaria();
  const pendencias = usePendencias();
  const readingProgress = useLiveQuery(() => db.readingProgress.toArray(), []);

  // Uma frase por hub, com um número do momento quando ajuda a decidir.
  const descricoes: Record<Exclude<SecaoId, 'hoje'>, string> = {
    aprender: 'Lições, palavras novas, kanji e os alfabetos',
    praticar: `Ler · ouvir · falar · escrever — ${readingProgress?.length ?? 0} de ${LEITURA_TEXTOS.length} textos lidos`,
    revisar: pendencias.revisao > 0 ? 'Revisão do dia, pontos fracos e testes' : 'Tudo em dia · pontos fracos e testes',
    progresso: `${known?.understood.size ?? 0} palavras compreendidas · ${known?.canSay.size ?? 0} que sei dizer`,
  };

  return (
    <div className="space-y-5">
      <Saudacao />
      <AvisoMudancaEndereco />

      {resumo && (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Hoje resumo={resumo} meta={meta} />
          <PlanoDoDia hoje={resumo.hoje} />
        </div>
      )}

      <AvisoSync />
      <AvisoInstalacao />
      <LembreteBackup />

      <section className="pt-3">
        <h2 className="mb-3 font-semibold">Seu método</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SECOES.filter((s): s is Secao & { id: Exclude<SecaoId, 'hoje'> } => s.id !== 'hoje').map((s) => (
            <Modulo
              key={s.id}
              to={s.to}
              icon={<s.icone className="h-5 w-5" />}
              cor={s.cor}
              titulo={s.label}
              desc={descricoes[s.id]}
              pendente={s.id === 'revisar' && pendencias.revisao > 0 ? `${pendencias.revisao} hoje` : undefined}
            />
          ))}
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
                ehHoje ? 'bg-ink text-paper' : d.estudou ? 'bg-indigo/8 text-indigo' : 'text-sage',
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
        <span className="block text-sm text-sage">{desc}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

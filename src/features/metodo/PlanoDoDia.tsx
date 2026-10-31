import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Check } from 'lucide-react';
import type { Activity } from '../../db/schema';
import { TEXTO, TILE, type Cor } from '../../lib/cores';
import { usePendencias } from './pendencias';
import { useProximoPasso, type Passo } from './proximoPasso';

interface PassoDoPlano {
  etapa: string;
  cor: Cor;
  feito: boolean;
  /** Resumo do que já foi feito hoje (aparece quando `feito`). */
  resumo: string;
  passo: Passo;
}

/**
 * "Plano do dia" da Home: o ciclo do método em 3 passos — Revisar →
 * Aprender → Praticar —, cada um com a recomendação que o hub já calcula e
 * marcado como feito pela atividade registrada hoje (tabela `activity`):
 *
 * - Revisar: feito quando não há nada vencido (cards + kanji).
 * - Aprender: feito quando há algum item novo hoje (`novos` > 0).
 * - Praticar: feito quando houve leitura ou prática hoje.
 *
 * O primeiro passo não feito é o atual (botão escuro); os outros ficam com
 * um link discreto. Nada novo é gravado.
 */
export default function PlanoDoDia({ hoje }: { hoje: Activity }) {
  const pendencias = usePendencias();
  const aprender = useProximoPasso('aprender');
  const praticar = useProximoPasso('praticar');
  if (!aprender || !praticar) return null;

  const vencidos = pendencias.revisao;
  const passos: PassoDoPlano[] = [
    {
      etapa: 'Revisar',
      cor: 'sora',
      feito: vencidos === 0,
      resumo:
        hoje.revisoes > 0
          ? `Revisão em dia — ${hoje.revisoes} revisão(ões) hoje.`
          : 'Nada vencido hoje.',
      passo: {
        titulo: `Revisar ${vencidos} item(ns)`,
        porque: [
          pendencias.cards > 0 && `${pendencias.cards} flash card(s)`,
          pendencias.kanji > 0 && `${pendencias.kanji} kanji`,
        ]
          .filter(Boolean)
          .join(' · ')
          .concat(' — o que segura o que você já aprendeu.'),
        to: '/revisar',
        icone: CalendarClock,
        cor: 'sora',
      },
    },
    {
      etapa: 'Aprender',
      cor: 'fuji',
      feito: hoje.novos > 0,
      resumo: `${hoje.novos} item(ns) novo(s) aprendido(s) hoje.`,
      passo: aprender,
    },
    {
      etapa: 'Praticar',
      cor: 'matcha',
      feito: hoje.leituras > 0 || hoje.praticas > 0,
      resumo: [
        hoje.leituras > 0 && `${hoje.leituras} texto(s) lido(s)`,
        hoje.praticas > 0 && `${hoje.praticas} prática(s)`,
      ]
        .filter(Boolean)
        .join(' · ')
        .concat(' hoje.'),
      passo: praticar,
    },
  ];
  const atual = passos.findIndex((p) => !p.feito);
  const feitos = passos.filter((p) => p.feito).length;

  return (
    <section className="card-hero space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Plano do dia</p>
        <span className={`badge ${feitos === passos.length ? 'bg-matcha/12 text-matcha' : 'bg-line/70 text-sage'}`}>
          {feitos} de {passos.length}
        </span>
      </div>

      <ol className="space-y-3">
        {passos.map((p, i) => (
          <PassoItem key={p.etapa} numero={i + 1} item={p} atual={i === atual} />
        ))}
      </ol>

      {atual === -1 && (
        <p className="text-sm font-medium text-matcha">
          Plano do dia completo! Se quiser continuar, qualquer atividade dos hubs conta para a meta.
        </p>
      )}
    </section>
  );
}

function PassoItem({ numero, item, atual }: { numero: number; item: PassoDoPlano; atual: boolean }) {
  const { etapa, cor, feito, resumo, passo } = item;
  return (
    <li
      className={[
        'flex gap-3 rounded-2xl border p-3 transition-colors',
        atual ? 'border-line bg-paper/60' : 'border-transparent',
      ].join(' ')}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
          feito ? 'bg-matcha text-paper' : atual ? TILE[cor] : 'bg-line/70 text-sage'
        }`}
        aria-hidden
      >
        {feito ? <Check className="h-4 w-4" /> : numero}
      </span>
      <div className="min-w-0 flex-1 space-y-1">
        <p className={`text-[11px] font-semibold uppercase tracking-wider ${feito ? 'text-sage' : TEXTO[cor]}`}>{etapa}</p>
        {feito ? (
          <p className="text-sm text-sage">{resumo}</p>
        ) : (
          <>
            <p className={`font-medium ${atual ? 'text-ink' : 'text-ink/70'}`}>{passo.titulo}</p>
            {atual && <p className="text-sm text-sage">{passo.porque}</p>}
            <Acao atual={atual} to={passo.to}>
              {atual ? 'Começar' : 'Fazer agora'}
            </Acao>
          </>
        )}
      </div>
    </li>
  );
}

function Acao({ atual, to, children }: { atual: boolean; to: string; children: ReactNode }) {
  return atual ? (
    <Link to={to} className="btn-dark mt-2">
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  ) : (
    <Link to={to} className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
      {children} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}


import type { ReactNode } from 'react';
import { Award, BookOpen, Bug, Code, Download, Info, Mail, ShieldCheck, User } from 'lucide-react';
import { useTheme } from '../../lib/useTheme';
import { MANUAL_URL } from '../../lib/manual';
import { PRIVACIDADE_URL } from '../../lib/privacidade';
import { AVISOS_TERCEIROS_URL, ISSUES_URL, linkRelatarErro, REPO_URL } from '../../lib/contato';
import { Field, SectionTitle } from './ui';

function Externo({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-indigo underline underline-offset-2">
      {children}
    </a>
  );
}

export default function SobreTab() {
  const { resolvedTheme } = useTheme();
  const logoFile = resolvedTheme === 'dark' ? 'logo-dark.png' : 'logo.png';

  return (
    <div className="space-y-6">
      <section className="card-hero flex flex-col items-center gap-1 text-center">
        <img src={`${import.meta.env.BASE_URL}${logoFile}`} alt="Nihongo Study" className="h-32 object-contain" />
        <p className="text-sage">Flash cards, kana, kanji, leitura e lições</p>
        <p className="badge bg-indigo/8 text-indigo">versão {__APP_VERSION__}</p>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<BookOpen className="h-4 w-4" />} cor="indigo">
          Manual do usuário
        </SectionTitle>
        <p className="text-sm text-sage">
          Um guia ilustrado de todo o app: o método, cada tela, a revisão, o backup e perguntas
          frequentes. Em PDF, para ler na tela ou imprimir. Depois de aberto uma vez, fica
          disponível também sem internet.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={MANUAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <BookOpen className="h-4 w-4" />
            Abrir o manual
          </a>
          <a href={MANUAL_URL} download="Nihongo Study - Manual do usuario.pdf" className="btn-ghost">
            <Download className="h-4 w-4" />
            Baixar PDF
          </a>
        </div>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Info className="h-4 w-4" />} cor="indigo">
          O que é o Nihongo Study
        </SectionTitle>
        <p className="text-sm text-sage">
          Este aplicativo foi desenvolvido por mim para apoiar meus estudos no curso de japonês do
          CIL (Centro Interescolar de Línguas), unidade do Gama, em Brasília. A ideia surgiu da
          minha própria necessidade de praticar flash cards com repetição espaçada e treinar
          hiragana/katakana — e acabei compartilhando gratuitamente com os colegas de turma, que
          repassaram para outras turmas.
        </p>
        <p className="text-sm text-sage">
          É um projeto pessoal, independente e sem fins comerciais: não é um produto oficial do CIL nem tem
          vínculo com a escola. Roda inteiramente no navegador, sem servidor, e os dados ficam salvos no seu
          aparelho — e, se você ligar a sincronização, no seu Google Drive.
        </p>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Bug className="h-4 w-4" />} cor="indigo">
          Encontrou um erro?
        </SectionTitle>
        <p className="text-sm text-sage">
          Um japonês errado numa lição ou algo que não funciona: conte para eu corrigir. Por e-mail não precisa de
          nenhuma conta; no GitHub, dá para ver o que já foi relatado.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={linkRelatarErro(__APP_VERSION__)} className="btn-primary">
            <Mail className="h-4 w-4" />
            Reportar por e-mail
          </a>
          <a href={ISSUES_URL} target="_blank" rel="noreferrer" className="btn-ghost">
            <Code className="h-4 w-4" />
            Reportar no GitHub
          </a>
        </div>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<ShieldCheck className="h-4 w-4" />} cor="indigo">
          Privacidade
        </SectionTitle>
        <p className="text-sm text-sage">
          O app não coleta nenhum dado: não tem cadastro, servidor, analytics nem anúncios. A política completa
          explica o que fica no aparelho e o que vai para o seu Google Drive quando a sincronização está ligada.
        </p>
        <a href={PRIVACIDADE_URL} target="_blank" rel="noreferrer" className="btn-ghost">
          <ShieldCheck className="h-4 w-4" />
          Política de privacidade
        </a>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Code className="h-4 w-4" />} cor="indigo">
          Código aberto
        </SectionTitle>
        <p className="text-sm text-sage">
          O código-fonte é público e distribuído sob a licença MIT — você pode usar, copiar,
          modificar e redistribuir livremente, mantendo o aviso de copyright original. Os dados
          de terceiros listados em “Créditos” seguem as licenças deles.
        </p>
        <Field label="Repositório (código e contribuições)">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo underline underline-offset-2"
          >
            {REPO_URL}
          </a>
        </Field>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Award className="h-4 w-4" />} cor="indigo">
          Créditos
        </SectionTitle>
        <ul className="space-y-3 text-sm text-sage">
          <li>
            <strong className="text-ink">Ordem e forma dos traços:</strong> dados adaptados do{' '}
            <Externo href="https://kanjivg.tagaini.net/">KanjiVG</Externo>, © 2009–2026 Ulrich Apel, sob a licença{' '}
            <Externo href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</Externo>. Os dados adaptados são
            distribuídos sob a mesma licença.
          </li>
          <li>
            <strong className="text-ink">Vocabulário N5:</strong> lista traduzida para o português a partir de{' '}
            <Externo href="https://github.com/jamsinclair/open-anki-jlpt-decks">open-anki-jlpt-decks</Externo>, baseada em{' '}
            <Externo href="https://github.com/chyyran/jlpt-anki-decks">jlpt-anki-decks</Externo> e em listas do site tanos.co.uk.
          </li>
          <li>
            <strong className="text-ink">Fontes:</strong> Inter e Noto Sans JP, sob a licença SIL Open Font License 1.1.
          </li>
          <li>
            <strong className="text-ink">Bibliotecas:</strong> React, Dexie, ts-fsrs, Lucide e outras —{' '}
            <Externo href={AVISOS_TERCEIROS_URL}>lista completa e licenças</Externo>.
          </li>
        </ul>
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<User className="h-4 w-4" />} cor="indigo">
          Autor
        </SectionTitle>
        <Field label="Nome">
          <span className="text-sm text-ink">Rodrigo da Silva Ferreira Caneppele</span>
        </Field>
      </section>
    </div>
  );
}

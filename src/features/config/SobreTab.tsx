import { BookOpen, Code, Download, Info, ShieldCheck, User } from 'lucide-react';
import { useTheme } from '../../lib/useTheme';
// O manual vive em docs/ (fonte única); o `?url` faz o build publicá-lo com hash no nome,
// então trocar o PDF e publicar o app já entrega a versão nova, sem cache velho.
import manualUrl from '../../../docs/manual-do-usuario.pdf?url';
import { PRIVACIDADE_URL } from '../../lib/privacidade';
import { Field, SectionTitle } from './ui';

const REPO_URL = 'https://github.com/rcaneppele/nihongo-study';

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
          <a href={manualUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <BookOpen className="h-4 w-4" />
            Abrir o manual
          </a>
          <a href={manualUrl} download="Nihongo Study - Manual do usuario.pdf" className="btn-ghost">
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
          repassaram para outras turmas com o incentivo do professor.
        </p>
        <p className="text-sm text-sage">
          É um projeto pessoal e sem fins comerciais: roda inteiramente no navegador, sem servidor,
          e os dados ficam salvos no seu aparelho — e, se você ligar a sincronização, no seu Google Drive.
        </p>
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
          modificar e redistribuir livremente, mantendo o aviso de copyright original.
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
        <SectionTitle icon={<User className="h-4 w-4" />} cor="indigo">
          Autor
        </SectionTitle>
        <Field label="Nome">
          <span className="text-sm text-ink">Rodrigo da Silva Ferreira Caneppele</span>
        </Field>
        <Field label="E-mail">
          <a
            href="mailto:r.caneppele@gmail.com"
            className="text-sm text-indigo underline underline-offset-2"
          >
            r.caneppele@gmail.com
          </a>
        </Field>
      </section>
    </div>
  );
}

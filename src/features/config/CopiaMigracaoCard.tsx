import { useLiveQuery } from 'dexie-react-hooks';
import { History } from 'lucide-react';
import { useState } from 'react';
import { restaurarCopiaDeMigracao } from '../../db/backup';
import { DIAS_COPIA, lerCopia } from '../../db/copiaMigracao';
import { SectionTitle } from './ui';

/** Só aparece quando há cópia de antes de uma atualização dos dados (ver `copiaMigracao.ts`). */
export default function CopiaMigracaoCard() {
  const copia = useLiveQuery(lerCopia, []);
  const [msg, setMsg] = useState<string | null>(null);

  async function restaurar() {
    if (!confirm('Isso substitui todos os dados atuais pelos da cópia. O que você estudou depois dela será perdido. Continuar?')) return;
    try {
      await restaurarCopiaDeMigracao();
      setMsg('Cópia restaurada.');
    } catch (err) {
      setMsg(`Erro: ${(err as Error).message}`);
    }
  }

  if (!copia) return msg && <p className="text-sm text-indigo">{msg}</p>;

  return (
    <section className="card-surface space-y-3">
      <SectionTitle icon={<History className="h-4 w-4" />} cor="sora">
        Cópia de antes da atualização
      </SectionTitle>
      <p className="text-sm text-sage">
        Em {new Date(copia.criadaEm).toLocaleDateString('pt-BR')}, antes de atualizar a forma como guarda os seus dados, o
        app salvou uma cópia deles neste aparelho. Se algo parecer errado no seu progresso desde então, você pode voltar
        para ela. O que estudou depois dessa data será perdido. A cópia é apagada sozinha {DIAS_COPIA} dias depois de criada.
      </p>
      <button className="btn-ghost" onClick={restaurar}>
        Restaurar cópia
      </button>
      {msg && <p className="text-sm text-indigo">{msg}</p>}
    </section>
  );
}

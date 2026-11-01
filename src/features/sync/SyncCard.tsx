import { useState, type ReactNode } from 'react';
import { ErroAutorizacao } from './destino';
import {
  apagarDoDrive,
  conectar,
  desconectar,
  sincronizar,
  syncDisponivel,
  useEstadoSync,
  useStatusSync,
  type EstadoSync,
  type StatusSync,
} from './motor';
import { entrarNoGoogle } from './googleAuth';
import { tempoDesde } from '../backup/lembrete';

function textoStatus(status: StatusSync, estado: EstadoSync): string {
  const pendente = status.pendente ? ' · há alterações a enviar' : '';
  switch (status.fase) {
    case 'sincronizando':
      return 'Sincronizando…';
    case 'offline':
      return `Sem internet — sincroniza quando a conexão voltar${pendente}.`;
    case 'precisaLogin':
      return `O acesso ao Google venceu — entre de novo para continuar sincronizando${pendente}.`;
    case 'erro':
      return `Não deu para sincronizar: ${status.erro}${pendente}`;
    default:
      return (estado.ultimoSync ? `Sincronizado ${tempoDesde(estado.ultimoSync)}` : 'Ainda não sincronizou') + pendente;
  }
}

/** Cartão "Sincronizar com o Google Drive" de Config › Dados. Some se a versão não tiver o Client ID configurado. */
export default function SyncCard({ titulo }: { titulo: ReactNode }) {
  const estado = useEstadoSync();
  const status = useStatusSync();
  const [msg, setMsg] = useState<string | null>(null);
  if (!syncDisponivel || !estado) return null;

  async function handleDesconectar() {
    if (!confirm('Desconectar do Google Drive? Nada é apagado — nem aqui, nem no Drive.')) return;
    await desconectar();
    setMsg('Desconectado. Os dados deste aparelho continuam aqui.');
  }

  async function handleApagar() {
    if (
      !confirm(
        'Apagar a cópia dos seus dados no Google Drive e desconectar este aparelho? Os dados deste aparelho ' +
          'continuam aqui.'
      )
    )
      return;
    try {
      await apagarDoDrive();
      setMsg('Cópia no Drive apagada e aparelho desconectado.');
    } catch (err) {
      setMsg(err instanceof ErroAutorizacao ? 'Entre de novo no Google para apagar.' : `Erro: ${(err as Error).message}`);
    }
  }

  return (
    <section className="card-surface space-y-3">
      {titulo}
      {!estado.conectado ? (
        <>
          <p className="text-sm text-sage">
            Mantém seus aparelhos iguais sem precisar exportar e importar: os dados vão para uma pasta oculta do app no
            seu Google Drive (ela não aparece no Drive, e o app não enxerga nenhum outro arquivo seu). Sem servidor nosso
            no meio.
          </p>
          <p className="text-sm text-sage">
            Ao conectar, os dados deste aparelho e os que já estiverem no Drive são <strong className="text-ink">juntados</strong>{' '}
            — nada é apagado.
          </p>
          <p className="rounded-xl bg-kin/10 px-3 py-2 text-xs text-ink/80">
            No iPhone, com o app instalado na tela de início, a sincronização pode não funcionar bem (o login do Google
            às vezes não volta para o app). No Android e no computador funciona normalmente.
          </p>
          <button className="btn-primary" onClick={conectar}>
            Conectar com o Google
          </button>
        </>
      ) : (
        <>
          {estado.conta && (
            <p className="text-sm text-sage">
              Conectado como <span className="font-medium text-ink">{estado.conta}</span>
            </p>
          )}
          <p className={`text-sm ${status.fase === 'erro' || status.fase === 'precisaLogin' ? 'text-hanko' : 'text-ink'}`}>
            {textoStatus(status, estado)}
          </p>
          <div className="flex flex-wrap gap-2">
            {status.fase === 'precisaLogin' ? (
              <button className="btn-primary" onClick={() => entrarNoGoogle(false)}>
                Entrar de novo no Google
              </button>
            ) : (
              <button
                className="btn-primary"
                disabled={status.fase === 'sincronizando'}
                onClick={() => void sincronizar('manual')}
              >
                Sincronizar agora
              </button>
            )}
            <button className="btn-ghost" onClick={handleDesconectar}>
              Desconectar
            </button>
          </div>
          <p className="text-xs text-sage">
            Sincroniza sozinho ao abrir o app, ao voltar para ele e logo depois que você estuda. O acesso ao Google dura
            1 hora; depois disso, ao abrir o app ele passa rapidinho pela página do Google e volta.
          </p>
          <details className="rounded-xl border border-line/70 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-ink/80 marker:text-sage">
              Apagar a cópia no Drive
            </summary>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-sage">
                Remove o arquivo do app no seu Drive e desconecta este aparelho. Os dados deste aparelho não são
                tocados. Se outro aparelho continuar conectado, ele cria a cópia de novo — desconecte-o também.
              </p>
              <button className="btn-accent" onClick={handleApagar}>
                Apagar dados do Drive
              </button>
            </div>
          </details>
        </>
      )}
      {msg && <p className="text-sm text-sage">{msg}</p>}
    </section>
  );
}

import { Link } from 'react-router-dom';
import { ExternalLink, MoveRight } from 'lucide-react';
import { TILE } from '../../lib/cores';
import { estaNoEnderecoAntigo, NOVO_ENDERECO } from './mudancaEndereco';

/**
 * Só no endereço antigo, na Home. Não pode ser dispensado: enquanto a pessoa
 * estuda aqui, o progresso continua preso a este endereço.
 */
export default function AvisoMudancaEndereco() {
  if (!estaNoEnderecoAntigo(window.location.hostname)) return null;
  return (
    <section className="card-surface space-y-3">
      <div className="flex items-start gap-3">
        <span className={`icon-tile h-9 w-9 shrink-0 ${TILE.sora}`}>
          <MoveRight className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-ink">O Nihongo Study mudou de endereço</h2>
          <p className="text-xs text-sage">
            Agora ele fica em nihongostudy.app. Seu progresso está guardado neste endereço e não vai sozinho para o novo.
          </p>
        </div>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-xs text-sage">
        <li>
          <strong className="text-ink">Usa o Google Drive?</strong> Conecte a mesma conta no novo endereço, e seus dados voltam.
        </li>
        <li>
          <strong className="text-ink">Não usa?</strong> Exporte o backup aqui e, no novo endereço, importe o arquivo em
          Configurações › Dados.
        </li>
        <li>
          <strong className="text-ink">Instalou o app?</strong> Instale de novo a partir do novo endereço.
        </li>
      </ul>
      <div className="flex flex-wrap gap-2">
        <a href={NOVO_ENDERECO} target="_blank" rel="noreferrer" className="btn-primary">
          <ExternalLink className="h-4 w-4" />
          Abrir o novo endereço
        </a>
        <Link to="/config?tab=dados" className="btn-ghost">
          Exportar backup
        </Link>
      </div>
    </section>
  );
}

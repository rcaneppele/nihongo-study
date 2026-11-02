import { Settings } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DadosTab from '../features/config/DadosTab';
import ConfiguracoesTab from '../features/config/ConfiguracoesTab';
import SobreTab from '../features/config/SobreTab';


type TabKey = 'dados' | 'config' | 'sobre';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'dados', label: 'Dados' },
  { key: 'config', label: 'Configurações' },
  { key: 'sobre', label: 'Sobre o App' },
];

export default function Config() {
  const [params, setParams] = useSearchParams();
  const tab = asTabKey(params.get('tab')) ?? 'dados';

  function setTab(key: TabKey) {
    setParams(key === 'dados' ? {} : { tab: key }, { replace: true });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Settings className="h-5 w-5" />}
        cor="indigo"
        title="Configurações"
        subtitle="Dados, preferências e informações sobre o app."
      />

      <div role="tablist" aria-label="Seções de configuração" className="segmented">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`segmented-item px-4 ${tab === t.key ? 'segmented-item-active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'dados' && <DadosTab />}
        {tab === 'config' && <ConfiguracoesTab />}
        {tab === 'sobre' && <SobreTab />}
      </div>
    </div>
  );
}

function asTabKey(value: string | null): TabKey | null {
  return TABS.some((t) => t.key === value) ? (value as TabKey) : null;
}

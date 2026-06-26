import { useState } from 'react';
import { db, newId } from '../db/schema';
import { freshSrs } from '../features/srs/sm2';

export default function Settings() {
  const [msg, setMsg] = useState<string | null>(null);

  async function seedExample() {
    const now = Date.now();
    const examples = [
      { front: '猫', back: 'gato', reading: 'ねこ', category: 'Animais' },
      { front: '犬', back: 'cachorro', reading: 'いぬ', category: 'Animais' },
      { front: '水', back: 'água', reading: 'みず', category: 'N5' },
      { front: '本', back: 'livro', reading: 'ほん', category: 'N5' },
      { front: 'ありがとう', back: 'obrigado(a)', reading: 'arigatō', category: 'Saudações' },
    ];
    await db.cards.bulkAdd(
      examples.map((e) => ({ id: newId(), tags: [], ...e, ...freshSrs(now), createdAt: now, updatedAt: now }))
    );
    setMsg('Cards de exemplo adicionados.');
  }

  async function resetAll() {
    if (!confirm('Apagar TODOS os dados deste dispositivo? Esta ação não pode ser desfeita.')) return;
    await Promise.all([db.cards.clear(), db.reviews.clear(), db.kanaProgress.clear(), db.meta.clear()]);
    setMsg('Todos os dados foram apagados.');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Config</h1>
        <p className="text-sm text-sage">Nihongo Study · v0.1.0</p>
      </div>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Começar com exemplos</h2>
        <p className="text-sm text-sage">Adiciona alguns cards para você testar o fluxo.</p>
        <button className="btn-ghost" onClick={seedExample}>
          Adicionar cards de exemplo
        </button>
      </section>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Zona de risco</h2>
        <p className="text-sm text-sage">
          Apaga tudo deste dispositivo. Faça um backup antes (aba Dados) se quiser preservar.
        </p>
        <button className="btn-accent" onClick={resetAll}>
          Apagar todos os dados
        </button>
      </section>

      {msg && <p className="text-sm text-indigo">{msg}</p>}
    </div>
  );
}

import { describe, expect, it } from 'vitest';
import { FRASES_GRAMATICA, PONTOS_GRAMATICA } from './frases';
import { lerFrase } from './gerador';
import { LICOES } from '../../licoes';

describe('banco da gramática em contexto', () => {
  it('cada frase tem uma lacuna, romaji em todo bloco e alternativas distintas da resposta', () => {
    const ids = new Set<string>();
    for (const f of FRASES_GRAMATICA) {
      expect(ids.has(f.id), f.id).toBe(false);
      ids.add(f.id);
      expect(f.frase.match(/\[/g), f.id).toHaveLength(1);
      expect(f.frase.match(/\]/g), f.id).toHaveLength(1);
      const { antes, correta, depois } = lerFrase(f.frase);
      for (const t of [...antes, correta, ...depois]) expect(t.romaji, `${f.id}: ${t.texto}`).not.toBe('');
      expect(f.distratoras, f.id).not.toContain(correta.texto);
      expect(new Set(f.distratoras).size, f.id).toBe(f.distratoras.length);
      expect(PONTOS_GRAMATICA.some((p) => p.id === f.ponto), f.id).toBe(true);
    }
  });

  it('todo ponto aponta para uma lição existente e tem frases', () => {
    for (const p of PONTOS_GRAMATICA) {
      expect(LICOES.some((l) => l.meta.id === p.licaoId), p.id).toBe(true);
      expect(FRASES_GRAMATICA.filter((f) => f.ponto === p.id).length, p.id).toBeGreaterThan(2);
    }
  });
});

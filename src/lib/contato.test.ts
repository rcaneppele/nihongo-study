import { describe, expect, it } from 'vitest';
import { EMAIL_CONTATO, linkRelatarErro } from './contato';

describe('linkRelatarErro', () => {
  it('abre um e-mail para o contato do projeto, com a versão no assunto e no corpo', () => {
    const link = new URL(linkRelatarErro('2.10.0'));
    expect(link.protocol).toBe('mailto:');
    expect(link.pathname).toBe(EMAIL_CONTATO);
    expect(link.searchParams.get('subject')).toBe('Erro no Nihongo Study (v2.10.0)');
    expect(link.searchParams.get('body')).toContain('Versão do app: 2.10.0');
  });

  it('mantém as quebras de linha do modelo (o espaço não vira "+")', () => {
    const link = linkRelatarErro('2.10.0');
    expect(link).toContain('%0A');
    expect(link).not.toContain('+');
  });
});

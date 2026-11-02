/** @type {import('tailwindcss').Config} */

// Cores lidas de CSS variables (definidas em src/index.css para os temas claro/escuro),
// no formato "R G B" — isso permite trocar o tema com uma classe `.dark` em vez de reescrever
// classes em cada componente, e ainda preserva os modificadores de opacidade do Tailwind
// (bg-line/40, bg-sage/15, etc.).
function withOpacity(variable) {
  return ({ opacityValue }) =>
    opacityValue === undefined ? `rgb(var(${variable}))` : `rgb(var(${variable}) / ${opacityValue})`;
}

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Identidade: tinta índigo sobre papel, vermelho de carimbo (hanko) como acento.
        paper: withOpacity('--color-paper'),
        surface: withOpacity('--color-surface'), // fundo de cards/superfícies elevadas (era "white")
        ink: withOpacity('--color-ink'),
        indigo: {
          DEFAULT: withOpacity('--color-indigo'),
          soft: withOpacity('--color-indigo-soft'),
        },
        hanko: withOpacity('--color-hanko'), // acento, usar com parcimônia
        sage: withOpacity('--color-sage'),
        line: withOpacity('--color-line'),
        // Uma cor de apoio por módulo — só em ícones, badges e barras (ver src/index.css).
        sora: withOpacity('--color-sora'),
        matcha: withOpacity('--color-matcha'),
        fuji: withOpacity('--color-fuji'),
        kin: withOpacity('--color-kin'),
        sakura: withOpacity('--color-sakura'),
      },
      // Texto em ouro/rosa usa um tom mais escuro (contraste WCAG AA); o resto das
      // classes (bg-, border-, stroke-…) segue a cor do módulo (ver src/index.css).
      textColor: {
        kin: withOpacity('--color-kin-texto'),
        sakura: withOpacity('--color-sakura-texto'),
      },
      opacity: {
        8: '0.08',
        12: '0.12',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow-color) / 0.04), 0 8px 24px -12px rgb(var(--shadow-color) / 0.14)',
      },
      fontFamily: {
        // Títulos e números: Inter (moderna, combina com o corpo); japonês cai
        // pro Noto Sans JP pela pilha. Fontes empacotadas via @fontsource-variable
        // (ver src/main.tsx).
        display: ['"Inter Variable"', '"Noto Sans JP Variable"', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', '"Noto Sans JP Variable"', 'system-ui', 'sans-serif'],
        jp: ['"Noto Sans JP Variable"', '"Hiragino Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

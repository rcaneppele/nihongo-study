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
      },
      fontFamily: {
        display: ['"Shippori Mincho"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

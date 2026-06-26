/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Identidade: tinta índigo sobre papel, vermelho de carimbo (hanko) como acento.
        paper: '#F7F5F0',
        ink: '#1B2430',
        indigo: {
          DEFAULT: '#1E3A5F',
          soft: '#2D4A7C',
        },
        hanko: '#D7472F', // acento, usar com parcimônia
        sage: '#7C8A7E',
        line: '#E4DFD4',
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

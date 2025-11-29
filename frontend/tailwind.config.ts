import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFCF8', // Cream background
        brand: {
          orange: '#EF9C66',
          yellow: '#FCDC94',
          green: '#C8CFA0',
          teal: '#78ABA8', // Accents
          text: '#2D2D2D', // Main text
        },
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF1E3',
        brand: {
          orange: '#EF9C66',
          yellow: '#FCDC94',
          green: '#C8CFA0',
          teal: '#78ABA8',
          text: '#2D2D2D',
          outline: '#957139',
        },
      },
    },
  },
  plugins: [],
};
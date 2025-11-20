/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#f5f5f7',
        ink: '#1d1d1f',
        ivory: '#ffffff',
        accent: '#0404cd',
      },
    },
  },
  plugins: [],
}

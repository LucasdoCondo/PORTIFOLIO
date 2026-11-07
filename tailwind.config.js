/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        body: ['"Roboto"', 'sans-serif'],
      },
      colors: {
        bg: '#0a0a0f',
        card: '#161621',
        accent: '#00d4aa',
        border: '#2a2a3a',
        'muted-foreground': '#9ca3af',
      },
    },
  },
  plugins: [],
}
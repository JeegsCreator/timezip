/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        text: '#030E1F',
        primary: '#277EFF',
        secondary: '#6254FF'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        emoji: ['Noto Color Emoji', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateRows: {
        body: '3.5rem 1fr',
        popup: '2.5rem 1fr'
      },
      spacing: {
        select: 'calc(100% - 40px)'
      }
    }
  },
  plugins: []
}

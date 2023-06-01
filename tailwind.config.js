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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        emoji: ['Noto Color Emoji', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateRows: {
        body: '3.5rem 1fr 3.5rem',
        popup: '2.5rem 1fr'
      },
      spacing: {
        select: 'calc(100% - 40px)'
      }
    }
  },
  plugins: []
}

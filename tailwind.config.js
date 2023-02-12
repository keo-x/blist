/** @type {import('tailwindcss').Config} */
const {createGlobPatternsForDependencies} = require('@nrwl/next/tailwind')
const {join} = require('path')

module.exports = {
  mode: 'jit',
  purge: [
    join(__dirname, 'apps/backend/src/client/pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'media',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

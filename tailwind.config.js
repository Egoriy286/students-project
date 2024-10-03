/** @type {import('tailwindcss').Config} */
/** @type {import('daisyui').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
}

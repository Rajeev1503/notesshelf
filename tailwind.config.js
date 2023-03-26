/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-light-background' : '#23293d',
        'app-dark-background' : '#0A0A1A',
        'gray-background' : '#374151',
        'accent-background' : '#896bff',
        'accent-color' : '#3568d4',
        'card-light' : '#303855',
        'card-dark' : '#28293d',
        'main-text': '#000',
        'sub-text': '#000',
        'sub-text': '#000',
        'gray-text': '#adadad',
        'border-light': '#eff3f4',
        'border-dark': '#374151',
      },
      fontSize: {
        'xxs': '0.6rem',
    },
    },
  },
  plugins: [],
}

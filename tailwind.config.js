/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-background' : '#13131e',
        'accent-background' : '#896bff  ',
        'gray-background' : '#374151',
        'accent-color' : '#896bff',
        'card-light' : '#131313',
        'card-dark' : '#1a1a2e',
        'navbar' : '#131313',
        'text': 'white',
        'lighttext': '#e2e4e4',
        'darktext': '#bfbfbf',
        'gray-text': '#adadad',
        'border-light': '#eff3f4',
        'border-dark': '#374151',
      }
    },
  },
  plugins: [],
}

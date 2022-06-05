module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

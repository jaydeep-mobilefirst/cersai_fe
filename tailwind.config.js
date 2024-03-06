/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'footer-gradient-custom': 'linear-gradient(90deg, #54AD47 9.87%, #338118 99.55%)',
      })
    }
  },
  plugins: [],
}


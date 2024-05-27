/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        "custom-thead-background": "#E7F0FF",
      },
      zIndex: {
        100: 100,
        200: 200,
        // Add more custom values as needed
      },
    },
  },
  plugins: [],
};

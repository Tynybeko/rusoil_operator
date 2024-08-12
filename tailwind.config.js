/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          300: "rgb(52, 183, 78, 0.60)",
          500: "rgb(52, 183, 78, 0.80)",
          700: "rgb(52, 183, 78)",
        },
        "secondary": {
          300: "rgb(228, 0, 15, 0.6)",
          500: "rgb(228, 0, 15, 0.8)",
          700: "rgb(228, 0, 15)",
        },
      },
      screens: {
        'mi': '500px',
      }
    },
  },
  plugins: [],
}


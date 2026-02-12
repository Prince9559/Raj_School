/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      margin: {
        '400': '400px', // Custom margin value for 160px
      },
      backgroundColor: {
        'custom-blue': '#053f87', // Custom background color with hex value
        
      },
      screens: {
        'ex': {'max': '639px'}, // Custom range between 600px and 900px
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"font-btn"', "serif"], 
        poppins: ['"poppins"', "sans"],
        roboto: ['"roboto"', "sans"],
        montserrat: ['"montserrat"', "sans"],
        varela: ['"varela"', "sans"],
        lexend_Deca: ['"lexend_Deca"'],
        rubik: ['"rubik"'],
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',  /* Safari and Chrome */
        },
      });
    },
    
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        },
      });
    },
  ]
}

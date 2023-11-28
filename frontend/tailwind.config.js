/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "425px" },
        sm: { max: "426px" },
        md: { max: "769px" },
        lg: { max: "1440px" },
        xl: { max: "2560px" },
        mdl: { max: "1024px" },
        laptop: { max: "1165px" },
      },
      backgroundImage:{
        'home':"linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/image/task.jpg')",
      }
    },

  },
  plugins: [],
};

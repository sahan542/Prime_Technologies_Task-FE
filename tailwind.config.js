/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "360px", // small phones
      sm: "480px", // phones
        sms: "560px",
      md: "768px", // tablets
      lg: "1024px", // small laptops
      xl: "1280px", // desktops
      "2xl": "1536px",
    },
    extend: {
      colors: {
        accent: "#F97316",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lilac:   "#D8B4FE",
        blush:   "#F9A8D4",
        beige:   "#FEF3C7",
        skyblue: "#BAE6FD",
        mint:    "#BBF7D0",
        cream:   "#FFFBF5",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
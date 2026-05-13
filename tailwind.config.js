/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#100F0F",
      primary: {
        200: "#E1F8E1",
        300: "#7322AE",
        400: "#7322AE",
        DEFAULT: "#7322AE",
      },
      secondary: {
        200: "#55F9D5",
        300: "#26E8BE",
        400: "#0BE1B2",
        DEFAULT: "#04DBAC",
        600: "#17B996",
        blue: "#129AE8",
      },
      gray: {
        300: "#fafafa",
        400: "#f2f2f2",
        500: "#e5e5e5",
        600: "#b2b2b2",
        700: "#808080",
        800: "#333333",
        900: "#212020",
        DEFAULT: "#141414",
      },
      alert: {
        danger: "#FF4E4E",
        success: "#10E649",
        warning: "#FFB300",
      },
    },

    fontSize: {
      "5xl": "48px",
      "4xl": "36px",
      "3xl": "30px",
      "2xl": "24px",
      xl: "20px",
      lg: "18px",
      base: "16px",
      sm: "14px",
    },

    borderRadius: {
      DEFAULT: "10px",
      full: "50%",
    },

    extend: {
      boxShadow: {
        "primary-400": "0 0 25px",
        "secondary": "0 0 25px",
        "darkgray": "0 0 25px #444",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
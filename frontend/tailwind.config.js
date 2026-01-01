/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
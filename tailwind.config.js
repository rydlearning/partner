/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-yellow': 'rgba(255, 255, 0, 0.147)', 
      },
    },
  },
  plugins: [],
};

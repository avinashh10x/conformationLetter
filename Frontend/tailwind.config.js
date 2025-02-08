/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'horizontal-bounce': 'horizontal-bounce 1s infinite',
      },
    },
  },  
  plugins: [], // ✅ Moved outside `theme`
};

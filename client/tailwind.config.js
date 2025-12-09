/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        slate: '#475569',
        primary: '#2563eb',
      },
      boxShadow: {
        glass: '0 10px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};


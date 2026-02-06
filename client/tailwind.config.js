/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // 👈 Important: Enables the dark mode toggle to work
  theme: {
    extend: {
      colors: {
        // ❌ REMOVED 'slate': '#...' so default slate-50 to slate-900 works again.
        
        // ✅ ADDED: The Deep Midnight palette we used in the React components
        midnight: {
          950: '#0B1121', // Main Background
          900: '#0f1623', // Editor Background
          800: '#151e32', // Card/Navbar Background
        },
        
        // Your custom aliases
        ink: '#0f172a',
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
      },
      boxShadow: {
        // Updated for dark mode depth
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'], // For the editor
      }
    },
  },
  plugins: [],
};
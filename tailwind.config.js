/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#4A90D9', hover: '#3a7bc8' },
        expense: '#EF4444',
        income: '#10B981',
      },
    },
  },
  plugins: [],
}


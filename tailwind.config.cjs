/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./contexts/**/*.{js,ts,jsx,tsx}",
        "./App.tsx"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'brand-background': '#0C022D',
                'brand-surface': '#21115C',
                'brand-primary': '#D400FF',
                'brand-primary-hover': '#a100c2',
                'brand-text-primary': '#F8F8F8',
                'brand-text-secondary': '#A9A1D1',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'neon-glow': 'neon-glow 2.5s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
            },
            keyframes: {
                'neon-glow': {
                    'from': { 'box-shadow': '0 0 5px #D400FF, 0 0 10px #D400FF, 0 0 15px #D400FF' },
                    'to': { 'box-shadow': '0 0 10px #D400FF, 0 0 20px #D400FF, 0 0 30px #D400FF' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}

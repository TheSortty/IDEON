/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // ---- Capa 1: la paleta de marca. Se mantiene tal cual para no
                // romper nada, pero los componentes nuevos deben usar los roles
                // de abajo, no estos nombres.
                'brand-background': '#0C022D',
                'brand-surface': '#21115C',
                'brand-primary': '#D400FF',
                'brand-primary-hover': '#a100c2',
                'brand-text-primary': '#F8F8F8',
                'brand-text-secondary': '#A9A1D1',

                // ---- Capa 2: los roles. Apuntan a las custom properties de
                // src/index.css, así que cambian solos con el tema y no hace
                // falta duplicar cada clase con su variante `dark:`.
                'surface-base': 'rgb(var(--bg) / <alpha-value>)',
                'surface-raised': 'rgb(var(--surface) / <alpha-value>)',
                'content': 'rgb(var(--text) / <alpha-value>)',
                'content-muted': 'rgb(var(--text-muted) / <alpha-value>)',
                'accent': 'rgb(var(--accent) / <alpha-value>)',
                'accent-hover': 'rgb(var(--accent-hover) / <alpha-value>)',
                'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
            },
            borderColor: {
                'line': 'var(--border)',
                'line-strong': 'var(--border-strong)',
            },
            transitionTimingFunction: {
                'out-token': 'var(--ease-out)',
                'emphasis': 'var(--ease-emphasis)',
            },
            transitionDuration: {
                'fast': 'var(--dur-fast)',
                'medium': 'var(--dur-medium)',
                'long': 'var(--dur-long)',
                'theme': 'var(--dur-theme)',
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

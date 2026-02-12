/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'app-blue': '#4CC9F0',
                'app-pink': '#F72585',
                'app-yellow': '#FFD166',
                'app-green': '#06D6A0',
                'app-purple': '#7209B7',
                'app-background': '#F0F3FA',
            },
            fontFamily: {
                sans: ['"M PLUS Rounded 1c"', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
            }
        },
    },
    plugins: [],
}

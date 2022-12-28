/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "src/maintenance.html"
    ],
    theme: {
        colors: {
            'color-active-page-header': '#f2da5b',
            'color-pink': '#f22277'
        },
    },
    plugins: [],
}

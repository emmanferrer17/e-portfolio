/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#FAF3EB',
        surface: '#FFFFFF',
        hairline: '#E4DBD0',
        'dark-teal': '#0F3D3A',
        maroon: '#7A1C24',
        ink: '#1E1B18',
        'warm-beige': '#FAF3EB', // Aliased to Refined Parchment
        charcoal: '#1E1B18',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(30, 27, 24, 0.05)',
        'drawer': '-4px 0 24px -2px rgba(15, 61, 58, 0.12)',
      },
    },
  },
  plugins: [],
}

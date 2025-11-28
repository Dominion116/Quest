/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#8B5CF6',
          'primary-hover': '#7C3AED',
          accent: '#A78BFA',
          background: '#0a0a0a',
          surface: '#1a1a1a',
          'surface-light': '#2a2a2a',
          border: '#333333',
        },
      },
    },
    plugins: [],
  }
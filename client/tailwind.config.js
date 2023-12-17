/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "primary": '#B3D3C1',
        "secondary": '#306E5E',
        "accent": "#1fa85a",
        "dark-primary": '#3C584B',
        "dark-secondary": '#184037'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        fira: ['Fira Code', 'monospce'],
        inter: ['Inter', 'sans-serif'],
        libre: ['Libre Franklin','sans-serif'],
      },
      fontSize: {
        '5xs': ['4px', '6px'],
        '4xs': ['6px', '8px'], 
        '3xs': ['8px', '10px'], 
        '2xs': ['10px', '12px'],
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        md: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['32px', '40px'],
        '3xl': ['40px', '48px'],
        '4xl': ['48px', '56px'],
        '5xl': ['50px', '52px'],
      },
      screens: {
        'xs': '0px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}


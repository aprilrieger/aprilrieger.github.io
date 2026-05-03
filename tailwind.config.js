/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/**/*.{js,jsx,ts,tsx}`, `./content/**/*.md`, `./content/**/*.mdx`],
  theme: {
    extend: {
      fontFamily: {
        sans: [`ui-sans-serif`, `system-ui`, `"Segoe UI"`, `Roboto`, `sans-serif`],
      },
      colors: {
        brand: {
          50: `#f0fdfa`,
          100: `#ccfbf1`,
          600: `#0d9488`,
          700: `#0f766e`,
          900: `#134e4a`,
        },
      },
    },
  },
  plugins: [],
};

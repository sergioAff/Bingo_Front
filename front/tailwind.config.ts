import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FCCB3D", // Amarillo dorado
        secondary: "#FF6F61", // Rojo coral
        accent: "#4C4C9B", // Azul oscuro
        neutral: "#F0F0F0", // Gris claro
        darkBlue: "#2E3A8C", // Azul marino
        mintGreen: "#2A9D8F", // Verde menta
      },
    },
  },
  plugins: [],
};

export default config;

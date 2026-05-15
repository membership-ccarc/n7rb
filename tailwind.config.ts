import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#eef7f0",
          100: "#d7eadb",
          500: "#39724f",
          700: "#25513a",
          900: "#173727",
        },
        mountain: {
          50: "#eef5f8",
          100: "#d8e9ef",
          700: "#24556f",
          900: "#12364a",
        },
        gold: {
          100: "#f8e9bd",
          300: "#e9bf55",
          500: "#c7861f",
        },
        stonewarm: {
          50: "#faf7f1",
          100: "#eee6d7",
          700: "#60584b",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(18, 54, 74, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

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
        skyBlue: '#87CEEB',
        lightGray: '#D3D3D3',
        darkGray: '#A9A9A9',
        sunnyYellow: '#FFD700',
        blue: '#1E90FF',
        deepBlue: '#4682B4',
        softGrayBlue: '#B0C4DE',
        white: '#FFFFFF',
        red: '#FF4500',
        green: '#32CD32',
      },
    },
  },
  plugins: [],
};
export default config;

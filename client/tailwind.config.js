import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // DaisyUI plugin yahan add hogaya
  ],
  // Optional: DaisyUI ki themes config
  daisyui: {
    themes: ["light", "dark", "cupcake"], 
  },
}
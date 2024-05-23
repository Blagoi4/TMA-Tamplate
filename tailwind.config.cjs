import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tg-bg": "var(--tg-theme-bg-color)",
        "tg-bg-secondary": "var(--tg-theme-section-bg-color)",
        "tg-bg-section-witch-secondary": "var(--tg-theme-section-bg-color)",
        "tg-text": "var(--tg-theme-text-color)",
        "tg-button": "var(--tg-theme-button-color)",
        "tg-button-text": "var(--tg-theme-button-text-color)",
      },
      spacing: {
        7.5: "30px", // для qrscan-button
      },
    },
  },
  plugins: [forms, typography],
};

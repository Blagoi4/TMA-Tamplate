import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        gold: "0 2px 2px -1px rgba(255, 215, 0, 0.5), 0 2px 4px -1px rgba(255, 215, 0, 0.25)",
      },
      colors: {
        "tg-bg": "var(--tg-theme-bg-color)",
        "tg-bg-theme": "var(--tg-theme-header-bg-color)",
        "tg-bg-section-witch-secondary": "var(--tg-theme-section-bg-color)",
        "tg-text": "var(--tg-theme-text-color)",
        "tg-button": "var(--tg-theme-button-color)",
        "tg-button-text": "var(--tg-theme-button-text-color)",
        "tg-subtitle": "var(--tg-theme-subtitle-text-color)",
        "tg-header-title-text": "var(--tg-theme-section-header-text-color)",
      },
      spacing: {
        7.5: "30px", // для qrscan-button
      },
    },
  },
  plugins: [forms, typography],
};

const plugin = require("tailwindcss/plugin");

const mainColors = {
  orange: "#EC8A27",
  blue: "#121054",
  lightBlue: "#c0dffa",
  lightOrange: "#edd0b2",
};

const flip = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

module.exports = {
  content: [
    "./app/assets/**/*.css",
    "./app/components/**/*.{vue,js}",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/**/*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM sans", "ui-sans-serif", "system-ui", "Helvetica", "Arial"],
      },

      colors: {
        "main-orange": "rgb(var(--color-main-orange) / <alpha-value>)",
        "main-orange-light":
          "rgb(var(--color-main-light-orange) / <alpha-value>)",
        "main-blue": "rgb(var(--color-main-blue) / <alpha-value>)",
        "main-blue-light": "rgb(var(--color-main-light-blue) / <alpha-value>)",
        "main-header": "var(--color-main-header)",
        "main-header-dark": "var(--color-main-header-dark)",
        github: "var(--color-github)",
        linkedin: "var(--color-linkedin)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-bold": mainColors.orange,
            "--tw-prose-invert-body": "#fff",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), flip],
};

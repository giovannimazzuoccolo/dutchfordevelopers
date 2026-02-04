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
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1f2937",
            "--tw-prose-bold": mainColors.orange,
            "--tw-prose-headings": mainColors.blue,
            "--tw-prose-links": mainColors.orange,
            "--tw-prose-invert-body": "#f3f4f6",
            "--tw-prose-invert-headings": "#fff",
            "--tw-prose-invert-bold": mainColors.orange,
            "--tw-prose-invert-links": mainColors.orange,
            lineHeight: "1.8",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), flip],
};

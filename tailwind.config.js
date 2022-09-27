module.exports = {
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'DM sans',
                    'ui-sans-serif',
                    'system-ui',
                    'Helvetica',
                    'Arial',
                ],
            },

            colors: {
                'main-orange': '#EC8A27',
                'main-blue': '#121054',
                'main-header': 'rgba(255,255,255,0.8)',
                'github': '#171515', // from https://gist.github.com/leemunroe/9162404
                'linkedin': '#0e76a8'
            },
        },
    },
}

/*module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}*/

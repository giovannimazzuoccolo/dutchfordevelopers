const plugin = require('tailwindcss/plugin')

const mainColors = {
    orange: '#EC8A27',
    blue: '#121054',
    lightBlue: '#c0dffa',
    lightOrange: '#edd0b2',
}

const flip = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-y-180': {
            transform: 'rotateY(180deg)',
        },
        '.preserve-3d': {
            transformStyle: 'preserve-3d',
        },
        '.perspective': {
            perspective: '1000px',
        },
        '.backface-hidden': {
            backfaceVisibility: 'hidden',
        },
    })
})

module.exports = {
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM sans', 'ui-sans-serif', 'system-ui', 'Helvetica', 'Arial'],
            },

            colors: {
                'main-orange': mainColors.orange,
                'main-orange-light': mainColors.lightOrange,
                'main-blue': mainColors.blue,
                'main-blue-light': mainColors.lightBlue,
                'main-header': 'rgba(255,255,255,0.8)',
                'main-header-dark': 'rgba(11,11,11,0.8)',
                github: '#171515', // from https://gist.github.com/leemunroe/9162404
                linkedin: '#0e76a8',
            },
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-bold': mainColors.orange,
                        '--tw-prose-invert-body': '#fff',
                    },
                },
            },
        },
    },
    content: ['./pages/learn/**'],
    plugins: [require('@tailwindcss/typography'), flip],
}

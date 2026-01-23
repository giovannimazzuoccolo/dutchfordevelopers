type Phrase = {
    intro: {
        nl: string
        en: string
    }
    questions: {
        nl: string
        en: string
    }[]
    solution?: string
    answer?: {
        nl: string
        en: string
    }
}

export type Phrases = Phrase[]

export const route1: Phrases = [
    {
        intro: {
            nl: '1) Je vraagt de koningin of ze iets gezien heeft',
            en: '1) You are asking the queen if she saw something',
        },
        questions: [
            {
                nl: '🕵️ Heb je iets gezien?',
                en: '🕵️ Have you seen something?',
            },
            {nl: '🕵️ Heb U iets gezien?', en: '🕵️ Have you seen something?'},
        ],
        solution: '🕵️ Heb U iets gezien?',
        answer: {
            nl: '👸 Ik zag iemand naar de bibliotheek rennen.',
            en: '👸 I saw someone running to the library',
        },
    },
    {
        intro: {
            nl: '🕵️ Je gaat naar de bibliotheek, en je vindt een oorbel, die dezelfde is als de dochter van de koningin, de prinses en je praat met haar',
            en: "🕵️ You go to the library, and you find an earring, which is the same as the Queen's daughter, the princess and you ask her",
        },
        questions: [
            {
                nl: '🕵️ Je hebt de kroon gestolen!',
                en: '🕵️ You stole the crown!',
            },
            {nl: '🕵️ Jij hebt de kroon gestolen!', en: '🕵️ You stole the crown!'},
        ],
        solution: '🕵️ Jij hebt de kroon gestolen!',
        answer: {
            nl: '👧 Het spijt me, het is zo glanzend!.',
            en: '👧 I am sorry, it is so shiny!',
        },
    },
    {
        intro: {
            nl: '2) Je vraagt de koningin of ze iets gezien heeft',
            en: '2) You are asking the queen if she saw something',
        },
        questions: [
            {
                nl: '🕵️ Heb je iets gezien?',
                en: '🕵️ Have you seen something?',
            },
            {nl: '🕵️ Heb U iets gezien?', en: '🕵️ Have you seen something?'},
        ],
        solution: '🕵️ Heb U iets gezien?',
        answer: {
            nl: '👧 Ik zie iemand uit het raam springen.',
            en: '👧 I see someone jumping out from the window',
        },
    },
    {
        intro: {
            nl: '🕵️ Je gaat het raam inspecteren, en je ziet een grote voetstap met wat vuil eraan.',
            en: '🕵️ You go to inspect the window, and you see a big footstep with some dirt attached to it.',
        },
        questions: [
            {
                nl: '🕵️ Uw tuinman is de dief!',
                en: '🕵️ Your gardener is the thief!',
            },
            {nl: '🕵️ Jouw tuinman is de dief!', en: '🕵️ Your gardener is the thief!'},
        ],
        solution: '🕵️ Uw tuinman is de dief!',
        answer: {
            nl: '👸 Het lijkt erop dat ik een nieuwe tuinman nodig heb...',
            en: '👸 It seems that I need a new gardener...',
        },
    },
]

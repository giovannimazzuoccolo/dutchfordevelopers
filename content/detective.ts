type Phrase = {
    nl: string,
    en: string,
    reset: boolean,
    questions?: {
        nl:string,
        en: string
    }[],
    solution?: string,
    answer?: {
        nl:string,
        en: string
    }
}

type Phrases = Phrase[];

const startingPhrase:Phrase = {
    nl: '🕵️ Je bent een detective',
    en: "🕵️ You are a detective",
    reset: false
}

export const route1:Phrases = [
    {
        nl: '🕵️ You ask ',
        en: "🕵️ You ask the queen if she saw something",
        questions: [{
            nl: "🕵️ Heb je iets gezien?",
            en: "🕵️ Have you seen something?"
        },{ nl:
            "🕵️ Heb U iets gezien?",
            en: "🕵️ Have you seen something?"
    }],
        solution: "🕵️ Heb U iets gezien?",
        answer: {
            nl: '👸 Ik zag iemand naar de bibliotheek rennen.',
            en: '👸 I saw someone running to the library'
        },
        reset: false
    },{
        nl: '🕵️ Je gaat naar de bibliotheek, en je vindt een oorbel, die dezelfde is als de dochter van de koningin, de prinses ',
        en: "🕵️ You go to the library, and you find an earring, which is the same as the Queen's daughter, the princess en je praat met haar",
        questions: [{
            nl: "🕵️ je hebt de kroon gestolen!",
            en: "🕵️ You stole the crown!"
        },{ nl:
            "🕵️ Jij hebt de kroon gestolen!",
            en: "🕵️ You stole the crown!"
    }],
        solution: "🕵️ Jij hebt de kroon gestolen!",
        reset: true
    },
    
]
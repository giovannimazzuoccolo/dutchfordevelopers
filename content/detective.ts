type Phrase = {
    intro: {
        nl: string,
        en: string,
    },
    reset: boolean,
    questions: {
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



export const route1:Phrases = [
    {
        intro: {
        nl: 'Je vraagt de koningin of ze iets gezien heeft',
        en: "You are asking the queen if she saw something",
        },
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
        intro: {
        nl: '🕵️ Je gaat naar de bibliotheek, en je vindt een oorbel, die dezelfde is als de dochter van de koningin, de prinses en je praat met haar',
        en: "🕵️ You go to the library, and you find an earring, which is the same as the Queen's daughter, the princess and you ask her",
         }, questions: [{
            nl: "🕵️ Je hebt de kroon gestolen!",
            en: "🕵️ You stole the crown!"
        },{ nl:
            "🕵️ Jij hebt de kroon gestolen!",
            en: "🕵️ You stole the crown!"
    }],
        solution: "🕵️ Jij hebt de kroon gestolen!",
        reset: true
    },
    
]
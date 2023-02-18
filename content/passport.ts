
export enum TENSE {
    'PRESENT' = 'present',
    'PAST' = 'past',
    'FUTURE' = 'future',
    'PAST_PARTICIPLE' = 'past_participle',
}

export enum PERSON {
    'FIRST_SINGULAR' = 'first_singular',
    'SECOND_SINGULAR' = 'second_singular',
    'THIRD_SINGULAR' = 'third_singular',
    'FIRST_PLURAL' = 'first_plural',
    'SECOND_PLURAL' = 'second_plural',
    'THIRD_PLURAL' = 'third_plural',
}

export enum REGULAR_IRREGULAR {
    'REGULAR' = 'regular',
    'IRREGULAR' = 'irregular',
}

export const wordList = [
    { verb: 'je werkt', translation: 'You work', tense: TENSE.PRESENT, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.SECOND_SINGULAR },
    { verb: 'ik fiets', translation: 'I cycle', tense:  TENSE.PRESENT, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.FIRST_SINGULAR},
    { verb: 'wij studeren', translation: 'We study', tense:  TENSE.PRESENT, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.FIRST_PLURAL},
    { verb: 'jullie kopen', translation: 'You buy', tense:  TENSE.PRESENT, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.SECOND_PLURAL},
    { verb: 'ik ben', translation: 'I am', tense:  TENSE.PRESENT, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.FIRST_SINGULAR},
    { verb: 'jij hebt', translation: 'You have', tense:  TENSE.PRESENT, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.SECOND_SINGULAR},
    { verb: 'hij gaat', translation: 'He goes', tense:  TENSE.PRESENT, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.THIRD_SINGULAR},
    { verb: 'wij waren', translation: 'We were', tense:  TENSE.PAST, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.FIRST_PLURAL},
    { verb: 'zij las', translation: 'She read', tense: TENSE.PAST, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.THIRD_SINGULAR},
    { verb: 'jij zal lopen', translation: 'You will walk', tense: TENSE.FUTURE, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.SECOND_SINGULAR },
    { verb: 'ik zal zijn', translation: 'I will be', tense: TENSE.FUTURE, regular: REGULAR_IRREGULAR.IRREGULAR, person:  PERSON.FIRST_SINGULAR},
    { verb: 'zij heeft gehad', translation: 'She has had', tense: TENSE.PAST_PARTICIPLE, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.THIRD_SINGULAR },
    { verb: 'wij hebben gespeeld', translation: 'We have played', tense: TENSE.PAST_PARTICIPLE, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.SECOND_PLURAL },
    { verb: 'jullie zullen vinden', translation: 'You will find', tense: TENSE.FUTURE, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.SECOND_PLURAL },
    { verb: 'hij heeft gezien', translation: 'He has seen', tense: TENSE.PAST_PARTICIPLE, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.THIRD_SINGULAR },
    { verb: 'jullie zullen moeten', translation: 'You will have to', tense: TENSE.FUTURE, regular: REGULAR_IRREGULAR.REGULAR, person:  PERSON.SECOND_PLURAL},
    { verb: 'zij is geweest', translation: 'She has been', tense: TENSE.PAST_PARTICIPLE, regular: REGULAR_IRREGULAR.IRREGULAR, person: PERSON.THIRD_SINGULAR },
    { verb: 'ik heb gedacht', translation: 'I have thought', tense: TENSE.PAST_PARTICIPLE, regular: REGULAR_IRREGULAR.REGULAR, person: PERSON.FIRST_SINGULAR }
  ];
  
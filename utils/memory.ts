import { Memory } from '../content/memory';
import { addUuidToObject } from './uuid'

export const shuffler = (memoryCards: Memory[]) => {
        //shuffle array
        const shuffled = memoryCards.sort(
            () => 0.5 - Math.random()
        )

        //get 4 random elements from array
        const singleCards = shuffled.slice(0, 4)

        //duplicate all the elements from the array
        const doubleCards = singleCards.reduce(
            (res: any, current) => {
                return res.concat([addUuidToObject(current), addUuidToObject(current)])
            },
            []
        )

        return doubleCards.sort(
            () => 0.5 - Math.random()
        )

} 
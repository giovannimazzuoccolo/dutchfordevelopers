import { v4 as uuidv4 } from 'uuid'

export function addUuidToObject(object: object) {
    return { ...object, id: uuidv4() }
}

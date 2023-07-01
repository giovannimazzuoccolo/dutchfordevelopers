import {randomUUID} from "crypto";
export function addUuidToObject(object: object) {
    return { ...object, id: randomUUID() }
}

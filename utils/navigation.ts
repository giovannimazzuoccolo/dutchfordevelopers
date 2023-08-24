export const ERROR_ROUTE = '/error'

export function isAlreadyInPath(obtThis: any, params: any) {
    let from = obtThis.$router.fullPath
    let to = obtThis.$router.resolve(params).route.fullPath

    if (from === to) {
        // handle any error due the redundant navigation here
        // or handle any other param modification and route afterwards
        return true
    } else {
        return false
    }
}

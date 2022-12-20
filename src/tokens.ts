function storeToken(key: string, value: string) {
    localStorage[key] = `Bearer ${value}`
}

function getToken(key: string): string {
    return localStorage[key]
}
const token = {
    set : storeToken,
    get : getToken
}


export default token
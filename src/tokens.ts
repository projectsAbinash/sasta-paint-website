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

export function makeRequestData(): object {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token.get('registrationToken')
        },
        body : {}
    }
}

export default token
import { users } from "../common/constants/routes"

export async function fetchUser(credentials) {
    try {
        return fetch(`${users}?email=${credentials.username}&&password=${credentials.password}`).then(res => res.json())
    }
    catch (error) {
        return error
    }
}

export async function registerUser(user) {
    try{
        return fetch (`${users}`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
    catch (error) {
        return error
    }
}
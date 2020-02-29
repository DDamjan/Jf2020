import * as userRoutes from '../common/constants/routes';

export async function fetchUser(credentials) {
    try {
        return fetch(`${userRoutes.login}`, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
        .catch( error => console.log(error))
    }
    catch (error) {
        return error
    }
}

export async function fetchUserById() {
    try{
        return fetch(`${userRoutes.refresh}`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ userID: parseInt(sessionStorage.getItem("id"))})
        }).then( res => res.json())
    }
    catch(error){
        return error
    }
}

export async function addField(route, data){
    try{
        return fetch(route, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then( res => res.json())
    }
    catch(error){
        return error
    }
}

export async function registerUser(user) {
    try{
        
        return fetch (`${userRoutes.register}`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        }).then( res => {
            return res
        })
        .catch(error => {return error})
    }
    catch (error) {
        return error
    }
}

export async function updateUserInfo(payload) {
    try{
        return fetch(`${userRoutes.update}`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
    }).then(res => {return res.json()})
        .catch(error => {return error})
    }
    catch(error){
        return error
    }
}
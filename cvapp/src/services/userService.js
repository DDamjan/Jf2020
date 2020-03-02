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
 
//Dupliran kod, jbg
export async function removeField(data){
    try{
        return fetch(userRoutes.remove, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    }
    catch(error){
        console.log(error) 
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

export async function verifyAccount(token) {
    try{
        return fetch(`${userRoutes.verification}`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(token)
        }).then(res => {return res.json()})
    }
    catch(error){
        return error
    }
}

export async function forgotPassword(email) {
    try{
        return fetch(`${userRoutes.forgottenPassword}`, {
            method: 'POST',
            //mode: 'no-cors',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(email)
        }).then(res => {return res.json()})
    }
    catch(error){
        console.log(error)
    }
}

export async function resetPassword(credentials) {
    try{
        return fetch(`${userRoutes.resetPassword}`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res =>{return res.json()})
    }
    catch(error){
        console.log(error);
    }
}

export async function sendFile(file, route) {
    try{
        let formData = new FormData();
        formData.append('fileUpload', file);

        return fetch(`${route}/?userid=${parseInt(sessionStorage.getItem('id'))}`, {
            method: 'POST',
            body: formData
        }).then(res => {return res.json()})
    }
    catch(error){
        console.log(error)
    }
}

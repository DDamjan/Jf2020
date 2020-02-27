import * as userActionTypes from '../constants/userActionsTypes';

export const loginRequest = credentials => ({
    type: userActionTypes.FETCH_USER,
    credentials
})

export const loginApproved = user => ({
    type: userActionTypes.LOGIN_SUCCESSFUL,
    user
})

export const loginFailed = () => ({
    type: userActionTypes.LOGIN_FAIL
})

export const registerUser = data => ({
    type: userActionTypes.REGISTER_USER,
    data
})

export const isUserLoggedIn = () => ({
    type: userActionTypes.IS_USER_LOGGED_IN
})

export const infoUpdateRequest = ( data) => ({
    type: userActionTypes.INFO_UPDATE_REQUEST,
    data
})

export const openModal = id => ({
    type: userActionTypes.OPEN_MODAL,
    id
})

export const submitFromModal = data => ({
    type: userActionTypes.SUBMIT_FROM_MODAL,
    data
})
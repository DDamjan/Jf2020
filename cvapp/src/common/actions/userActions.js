
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
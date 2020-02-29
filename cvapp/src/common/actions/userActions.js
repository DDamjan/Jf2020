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

export const changeProfilePicture = picture => ({
    type: userActionTypes.CHANGE_PROFILE_PICTURE,
    picture
})

export const changeCV = file => ({
    type: userActionTypes.CHANGE_CV,
    file
})

export const openExperienceModal = modal => ({
    type: userActionTypes.OPEN_EXPERIENCE_MODAL,
    modal
})

export const prepareForDeletion = modal => ({
    type: userActionTypes.PREPARE_FOR_DELETION,
    modal
})

export const sendForDeletion = modal => ({
    type: userActionTypes.SEND_FOR_DELETION,
    modal
})
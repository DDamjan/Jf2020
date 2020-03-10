import * as userActionTypes from '../constants/userActionsTypes';

export const loginRequest = credentials => ({
    type: userActionTypes.FETCH_USER,
    credentials
})

export const loginApproved = user => ({
    type: userActionTypes.LOGIN_SUCCESSFUL,
    user
})

export const loginFailed = message => ({
    type: userActionTypes.LOGIN_FAIL,
    message
})

export const verifyAccount = token => ({
    type: userActionTypes.VERIFY_ACCOUNT,
    token
})

export const verifyAccountResult = message => ({
    type: userActionTypes.VERIFY_ACCOUNT_RESULT,
    message
})

export const logout = () => ({
    type: userActionTypes.LOGOUT
})

export const registerUser = data => ({
    type: userActionTypes.REGISTER_USER,
    data
})

export const registerUserFail = errorMessage => ({
    type: userActionTypes.REGISTER_USER_FAIL,
    errorMessage
})

export const registerUserSuccess = () => ({
    type: userActionTypes.REGISTER_USER_SUCCESS
})

export const forgotPassword = email => ({
    type: userActionTypes.FORGOT_PASSWORD,
    email
})

export const forgotPasswordConfirm = () => ({
    type: userActionTypes.FORGOT_PASSWORD_CONFIRM
})

export const forgotPasswordDenied = () => ({
    type: userActionTypes.FORGOT_PASSWORD_DENIED
})

export const resetPassword = credentials => ({
    type: userActionTypes.RESET_PASSWORD,
    credentials
})

export const isUserLoggedIn = () => ({
    type: userActionTypes.IS_USER_LOGGED_IN
})

export const userLogedInResult = user => ({
    type: userActionTypes.USER_LOGGED_IN_RESULT,
    user
})

export const infoUpdateRequest = ( data) => ({
    type: userActionTypes.INFO_UPDATE_REQUEST,
    data
})

export const infoUpdateSuccess = data => ({
    type: userActionTypes.INFO_UPDATE_SUCCESS,
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

export const submitFromModalCallback = response => ({
    type: userActionTypes.SUBMIT_FROM_MODAL_CALLBACK,
    response
})

export const changeProfilePicture = picture => ({
    type: userActionTypes.CHANGE_PROFILE_PICTURE,
    picture
})

export const sendProfilePicture = picture => ({
    type: userActionTypes.SEND_PROFILE_PICTURE,
    picture
})

export const changeCV = file => ({
    type: userActionTypes.CHANGE_CV,
    file
})

export const fileUploaded = (field, link) => ({
    type: userActionTypes.FILE_UPLOADED,
    field,
    link
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

export const modalDeleted = modal => ({
    type: userActionTypes.MODAL_DELETED,
    modal
})

// REDUDANTNO: Ovo mozda nece trebati ipak
export const setModalMessage = message => ({
    type: userActionTypes.SET_MODAL_MESSAGE,
    message
})

export const oldAccount = message => ({
    type: userActionTypes.OLD_ACCOUNT,
    message
})
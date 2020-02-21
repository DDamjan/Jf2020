import * as userActionsTypes from '../constants/userActionsTypes';

const initialState = {
    proccessing: false,
    error: false
}

const userReducer = ( state = initialState, action) => {
    switch (action.type) {
        case userActionsTypes.FETCH_USER: {
            return{
                ...state,
                proccessing: true
            }
        }

        case userActionsTypes.LOGIN_FAIL: {
            return {
                ...state,
                proccessing: false,
                error: true
            }
        }

        case userActionsTypes.LOGIN_SUCCESSFUL: {
            const {user} = action;

            return {
                ...state,
                proccessing: false,
                error: false
            }
        }
        default:
            return state
    }
}

export default userReducer;
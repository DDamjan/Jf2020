import * as userActionsTypes from '../constants/userActionsTypes';

const initialState =  {
    authenticationProccessing: false,
    proccessing: false,
    error: false,
    modalId: null,
    licniPodaci: {
            ime: '',
            prezime: '',
            imeRoditelja: '',
            datumRodjenja: '',
            profilnaSlika: null,
            cv: null
    },
    kontakt: {
        telefon: '',
        linkedIn: '',
    },
    prebivaliste: {
        drzava: '',
        grad: '',
        adresa: '',
    },
    boraviste: {
        drzava: '',
        grad: '',
        adresa: '',
    },
    srednjeObrazovanje: [],
    visokoObrazovanje: [],
    iskustvo: {
        radnoIskustvo: [],
        strucnoUsavrsavanje: [],
        radNaRacunaru: [],
        radNaProjektu:[],
        poznavanjeJezika: [],
        ostaleVestine: []
    },
    experienceModalSelected: null,

    modalForDeletion: null,

    errorMessage: null,
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

            const {message} = action;

            return {
                ...state,
                proccessing: false,
                error: true,
                errorMessage: message
            }
        }

        case userActionsTypes.LOGIN_SUCCESSFUL: {
            const {user} = action;
            
            sessionStorage.setItem('id', user.userID);
            sessionStorage.setItem('token', user.token);
            return {
                ...state,
                proccessing: false,
                error: false,

            }
        }

        case userActionsTypes.LOGOUT: {
            sessionStorage.clear();

            return initialState
        }

        case userActionsTypes.REGISTER_USER: {

            return {
                ...state,
                proccessing: true,
                registerErrorMessage: null,
            }
        }

        case userActionsTypes.REGISTER_USER_FAIL: {
            const {errorMessage} = action;

            return {
                ...state,
                proccessing: false,
                registerErrorMessage: errorMessage
            }
        }

        case userActionsTypes.REGISTER_USER_SUCCESS: {

            return{
                ...state,
                proccessing: false,
            }
        }

        case userActionsTypes.INFO_UPDATE_REQUEST: {

            return {
                ...state,
                proccessing: true
            }
        }

        case userActionsTypes.INFO_UPDATE_SUCCESS: {
            const {data} = action;

            console.log(data);
            const pom = {...state};
            pom[`${data.field}`] = data.payload
            return {
                ...pom,
                proccessing: false,

            }

        }

        case userActionsTypes.IS_USER_LOGGED_IN: {
 
            return{
                ...state,
                authenticationProccessing: true

            }
        }

        case userActionsTypes.USER_LOGGED_IN_RESULT: {

            const {user} = action;

            if (user !== undefined){
                return {
                    ...state,
                    ...user,
                    authenticationProccessing: false
                }
            }
            
            return {
                ...state,
                authenticationProccessing: false,
            }

        }
        case userActionsTypes.OPEN_MODAL: {
            const {id} = action;

            return{
                ...state,
                modalId: id
            }
        }

        case userActionsTypes.OPEN_EXPERIENCE_MODAL:{
            const {modal} = action;

            return{
                ...state,
                experienceModalSelected: modal
            }
        }

        case userActionsTypes.SUBMIT_FROM_MODAL: {
            const {data} = action;
            
            return {
                ...state,
                modalId: null
            }
        }

        case userActionsTypes.SUBMIT_FROM_MODAL_CALLBACK: {
            const {response} = action;
            console.log(response)
            switch(response.field){
                case 'srednjeObrazovanje':{

                    return{
                        ...state,
                        srednjeObrazovanje:  [...state.srednjeObrazovanje.filter(el => el.id !== response.payload.id), 
                            response.payload]
                    }
                }

                case 'visokoObrazovanje': {
                    
                    return {
                        ...state,
                        visokoObrazovanje: [...state.visokoObrazovanje.filter(el => el.id !== response.payload.id), 
                                            response.payload]
                    }
                }

                default: return state
            }
        }

        case userActionsTypes.CHANGE_PROFILE_PICTURE:{
            const {picture} = action;

            return{
                ...state,
                licniPodaci: {...state.licniPodaci, profilnaSlika: URL.createObjectURL(picture)}
            }
        }

        case userActionsTypes.CHANGE_CV: {
            const {file} = action;
            
            return {
                ...state,
                licniPodaci: {...state.licniPodaci, cv: URL.createObjectURL(file)}
            }
        }

        case userActionsTypes.PREPARE_FOR_DELETION: {
            const {modal} = action;
            console.log(modal);

            const forServer = {
                field: modal.field,
                payload: {
                    id: modal.id
                }
            }

            return {
                ...state,
                modalForDeletion: forServer
            }
        }

        case userActionsTypes.MODAL_DELETED: {
            const {modal} = action;

            switch(modal.field) {
                case 'srednjeObrazovanje':{
                    return{
                        ...state,
                        srednjeObrazovanje: [...state.srednjeObrazovanje.filter(el => el.id !== modal.payload.id)]
                    }
                }

                case 'visokoObrazovanje': {
                    return {
                        ...state,
                        visokoObrazovanje: [...state.visokoObrazovanje.filter(el => el.id === modal.payload.id)]
                    }
                }

                default: return state
            }

        }

        default:
            return state
    }
}

export default userReducer;
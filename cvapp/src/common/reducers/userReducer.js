import * as userActionsTypes from '../constants/userActionsTypes';

const initialState =  {
    proccessing: false,
    error: false,
    modalId: null,
    licniPodaci: {
        ime: '',
        prezime: '',
        imeRoditelja: '',
        datumRodjenja: '',

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
    visokoObrazovanje: []
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
            
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('id', user.id)
            return {
                ...state,
                proccessing: false,
                error: false,

            }
        }

        case userActionsTypes.IS_USER_LOGGED_IN: {
            if (sessionStorage.getItem('user') === null) {
                window.location.replace("/");
                return state;
                //Svestan sam da je ovo bocan efekat u reduceru i da ne treba ali 
                //neka stoji za sad dok ne smislim nesto drugo
            }
            const user = {...JSON.parse(sessionStorage.getItem('user'))};
            return{
                ...state,
                licniPodaci: { ...user['licniPodaci']},
                prebivaliste: {...user['prebivaliste']},
                boraviste: {...user['boraviste']},
                kontakt: {...user['kontakt']},
                srednjeObrazovanje: [...user['srednjeObrazovanje']],
                visokoObrazovanje: [...user['visokoObrazovanje']]
            }
        }

        case userActionsTypes.OPEN_MODAL: {
            const {id} = action;

            return{
                ...state,
                modalId: id
            }
        }

        case userActionsTypes.SUBMIT_FROM_MODAL: {
            const {data} = action;

            return {
                ...state,
                modalId: null
            }
        }
        default:
            return state
    }
}

export default userReducer;
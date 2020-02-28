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
    experienceModalSelected: null
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
                ...user
                // licniPodaci: { ...user['licniPodaci']},
                // prebivaliste: {...user['prebivaliste']},
                // boraviste: {...user['boraviste']},
                // kontakt: {...user['kontakt']},
                // srednjeObrazovanje: [...user['srednjeObrazovanje']],
                // visokoObrazovanje: [...user['visokoObrazovanje']]
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
            console.log(data);
            return {
                ...state,
                modalId: null
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
        default:
            return state
    }
}

export default userReducer;
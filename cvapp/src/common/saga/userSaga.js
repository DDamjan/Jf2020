import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userActionTypes from '../constants/userActionsTypes'
import * as userActions from '../actions/userActions';
import * as userService from '../../services/userService';

function *fetchUser(action) {
    try{
        const user = yield call(userService.fetchUser, action.credentials);
        if (user.length === 0){
            yield put(userActions.loginFailed());
        }
        else {
            window.location.replace("/cvForma");

            yield put(userActions.loginApproved(user[0]))
        }
    }
    catch (error) {
        console.log(error);
    }
}

function *registerUser(action) {
    try{
               // 0 - name, 1 - middleName, 2 - surname, 3 - Date of birth
               // 4 - phone number, 5 - linkedIn
               // 8 - Country, 9 - City, 10 - Adress  --- Permament residsence
               // 12 - Contry, 13 - City, 14 - Adress --- Current residence
               // 16 - email, 17- password, 18 - confirm password
        const {data} = action;
        const user = {
            email: data[16],
            password: data[17],
            licniPodaci: {
                ime: data[0],
                prezime: data[2],
                imeRoditelja: data[1],
                datumRodjenja: data[3],
            },
            kontakt: {
                telefon: data[4],
                linkedIn: data[5],
            },
            prebivaliste: {
                drzava: data[8],
                grad: data[9],
                adresa: data[10]
            },
            boraviste: {
                drzava: data[12],
                grad: data[13],
                adresa: data[14]
            }
        }

        yield call(userService.registerUser, user);
        
    }
    catch(error) {
        console.log(error)
    }
}

function *infoUpdate(action){
    try{
        const { data } = action;
        console.log( data);
    }
    catch(error){
        console.log(error);
    }
}

function *userSaga() {
    yield takeEvery(userActionTypes.FETCH_USER, fetchUser);
    yield takeEvery(userActionTypes.REGISTER_USER, registerUser);
    yield takeEvery(userActionTypes.INFO_UPDATE_REQUEST, infoUpdate)
}


export default userSaga;
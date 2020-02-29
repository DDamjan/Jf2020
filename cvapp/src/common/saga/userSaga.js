import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userActionTypes from '../constants/userActionsTypes'
import * as userActions from '../actions/userActions';
import * as userService from '../../services/userService';
import * as userRoutes from '../constants/routes';

function *fetchUser(action) {
    try{
        const user = yield call(userService.fetchUser, action.credentials);
        console.log(user)

        if (user.userID === undefined){
            yield put(userActions.loginFailed());
        }
        else {
            window.location.replace("/cvForma");
            
            yield put(userActions.loginApproved(user))
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
            },
            datumRegistracije: new Date().toJSON().slice(0, 19).replace('T', ' ')
        }

        //console.log(user);
        const response = yield call(userService.registerUser, user);

        if (response.status === 200) {
            yield put(userActions.registerUserSuccess());
            window.location.replace("/");
        }
        else {
            //TODO: ne treba ovaj hardkoriran string vec sta posalje server
            yield put(userActions.registerUserFail('Nalog sa ovim email-om vec postoji'))

        }
 
        
    }
    catch(error) {
        console.log(error)
    }
}
 
function *infoUpdate(action){
    try{
        const { data } = action;
        const response = yield call(userService.updateUserInfo, data);

        if (response.field !== undefined) {
   
                yield put(userActions.infoUpdateSuccess(response))
            
            
        }
        else {

        }
    }
    catch(error){
        console.log(error);
    }
}

function *sendModalForDeletion(action) {
    try{
        const {modal} = action;
        console.log(modal);
    }catch (error){
        console.log(error)
    }
}

function *forgottenPassword(action) {
    try{
        const {email} = action;
        console.log(email);
    }catch (error) {
        console.log(error)
    }
} 

function *checkUserLoginStatus(action){
    try{

        if (sessionStorage.getItem("id") === null) {
            window.location.replace("/");
        }
        else{
            const response = yield call(userService.fetchUserById);

            //console.log(response);
            yield put(userActions.userLogedInResult(response))
        }
       
    }
    catch(error){
        console.log(error)
    }
}

function *submitFromModal(action) {
    try{
        const {data} = action;
        console.log(data);

        const response = yield call(userService.addField, userRoutes.addField, data)

        console.log(response);

        if (response.field !== undefined){
            yield put(userActions.submitFromModalCallback(response));
        }
        
    }
    catch(error){
        console.log(error)
    }
}

function *userSaga() {
    yield takeEvery(userActionTypes.FETCH_USER, fetchUser);
    yield takeEvery(userActionTypes.REGISTER_USER, registerUser);
    yield takeEvery(userActionTypes.INFO_UPDATE_REQUEST, infoUpdate);
    yield takeEvery(userActionTypes.SEND_FOR_DELETION, sendModalForDeletion);
    yield takeEvery(userActionTypes.FORGOTTEN_PASSWORD, forgottenPassword);
    yield takeEvery(userActionTypes.IS_USER_LOGGED_IN, checkUserLoginStatus);
    yield takeEvery(userActionTypes.SUBMIT_FROM_MODAL, submitFromModal)
}


export default userSaga;
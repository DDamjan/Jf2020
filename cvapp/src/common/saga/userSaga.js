import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userActionTypes from '../constants/userActionsTypes'
import * as userActions from '../actions/userActions';
import * as userService from '../../services/userService';
import * as userRoutes from '../constants/routes';

function *fetchUser(action) {
    try{
        let user;
        setTimeout( () => {
            user = null
        }, 5000)
        user = yield call(userService.fetchUser, action.credentials);
        

        if (user === null) {
            yield put(userActions.loginFailed('Nije mogla da se uspostavi konekcija sa serverom'));
            return
        }

        if (user === undefined){
            yield put(userActions.loginFailed('Pogresan email i/ili sifra, pokusajte ponovo'));
        }
        else {

            if (user.status === undefined){
                window.location.replace("/cvForma");
            
                yield put(userActions.loginApproved(user))
            }
            else {
                if (user.status === 401) {
                    yield put (userActions.loginFailed('Morate prvo aktivirati nalog kako bi ste se ulogovali'))
                }
            }

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

        
        const response = yield call(userService.registerUser, user);

        if (response.status === 200) {
            yield put(userActions.registerUserSuccess());

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

        if (data.payload.profilnaSlika instanceof File){
            const res = yield call(userService.sendFile, data.payload.profilnaSlika, userRoutes.uploadPicture);

            

            yield put(userActions.fileUploaded('profilnaSlika', res.profilnaSlika));
        }

        if (data.payload.cv instanceof File) {
            const res2 = yield call(userService.sendFile, data.payload.cv, userRoutes.uploadCV);
        

            yield put(userActions.fileUploaded('cv', res2.cv));

        }
    }
    catch(error){
        console.log(error);
    }
}

function *forgottenPassword(action) {
    try{
        const {email} = action;
   

        const response = yield call(userService.forgotPassword, {email: email});


    }catch (error) {
        console.log(error)
    }
} 

function *resetPassword(action) {
    try{
        const {credentials} = action;
      
        const response = yield call(userService.resetPassword, credentials)
   

        if(response.status === 201){
            setTimeout(() => {
                window.location.replace('/')
            }, 700)
        }

    }
    catch(error){
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
        
        let response = {};
        if (data.payload.fieldID === null) {
            response = yield call(userService.addField, userRoutes.addField, data)
        }
        else {
            response = yield call(userService.addField, userRoutes.update, data)
        }



        if (response.field !== undefined){
            yield put(userActions.submitFromModalCallback(response));
        }
        
    }
    catch(error){
        console.log(error)
    }
}

function *sendModalForDeletion(action){

    try{
        const {modal} = action;
      
        const response = yield call(userService.removeField, modal);

        if (response.field !== undefined) {
            yield put(userActions.modalDeleted(response))
        }
       
    }
    catch(error){
        console.log(error)
    }
}

function *verifyAccount(action) {
    try{
        const {token} = action;
        

        const response = yield call(userService.verifyAccount, {token: token})
        

        setTimeout( () => {
            window.location.replace('/');
        }, 3000)

        if (response.status === 201){
            yield put(userActions.verifyAccountResult('Uspesno ste aktivirali nalog'))

        }
        else {
            yield put(userActions.verifyAccountResult('404 bad token'))

        }

    }
    catch(error){
        console.log(error);
    }
}

function *userSaga() {
    yield takeEvery(userActionTypes.FETCH_USER, fetchUser);
    yield takeEvery(userActionTypes.REGISTER_USER, registerUser);
    yield takeEvery(userActionTypes.INFO_UPDATE_REQUEST, infoUpdate);
    yield takeEvery(userActionTypes.SEND_FOR_DELETION, sendModalForDeletion);
    yield takeEvery(userActionTypes.FORGOT_PASSWORD, forgottenPassword);
    yield takeEvery(userActionTypes.RESET_PASSWORD, resetPassword)
    yield takeEvery(userActionTypes.IS_USER_LOGGED_IN, checkUserLoginStatus);
    yield takeEvery(userActionTypes.SUBMIT_FROM_MODAL, submitFromModal);
    yield takeEvery(userActionTypes.VERIFY_ACCOUNT, verifyAccount);
}


export default userSaga;
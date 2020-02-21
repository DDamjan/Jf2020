import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import userReduer from '../reducers/userReducer';
import userSaga from '../saga/userSaga';


const sagaMiddleware = createSagaMiddleware();


export default createStore(
    userReduer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSaga);

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import userReduer from '../reducers/userReducer';
import userSaga from '../saga/userSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
    userReduer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(userSaga);

// src/redux/store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';
import { watchLogin } from './sagas/loginSaga';
import { watchRegister } from './sagas/registerSaga';

// Root Reducer
const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});



// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run Sagas
sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchRegister);

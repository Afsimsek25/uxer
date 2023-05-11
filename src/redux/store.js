// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';
import projectReducer from './reducers/projectReducer';

import { agentReducer } from './reducers/agentReducer'; // With curly braces
import { watchLogin } from './sagas/loginSaga';
import { watchRegister } from './sagas/registerSaga';
import { watchAgentRequests } from './sagas/agentSaga'; // Import your saga

// Root Reducer
const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  project: projectReducer,
  agentReducer: agentReducer,
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
sagaMiddleware.run(watchAgentRequests);

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers'; // Root Reducer'ı buradan alın
import { watchLogin } from './sagas/loginSaga';
import { watchRegister } from './sagas/registerSaga';
import { watchAgentRequests } from './sagas/agentSaga';

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Store
export const store = createStore(
  rootReducer, // rootReducer'ı kullanın
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run Sagas
sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchRegister);
sagaMiddleware.run(watchAgentRequests);

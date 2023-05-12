import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { watchLogin } from './sagas/loginSaga';
import { watchRegister } from './sagas/registerSaga';
import { watchAgentRequests } from './sagas/agentSaga';
import { fetchJobs } from './sagas/jobSaga'; // Import jobSaga

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
sagaMiddleware.run(fetchJobs); // Run jobSaga

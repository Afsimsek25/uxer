import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import rootSaga from './sagas'; // Import rootSaga

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Store
export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run Sagas
sagaMiddleware.run(rootSaga); // Run rootSaga

// src/redux/sagas/index.js
import { all, fork } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchRegister } from "./registerSaga";
import { watchAgentRequests } from './agentSaga';
import jobSaga from './jobSaga'; // Import jobSaga

export default function* rootSaga() {
  yield all([
    fork(watchLogin), 
    fork(watchRegister),
    fork(watchAgentRequests),
    fork(jobSaga),
  ]);
}

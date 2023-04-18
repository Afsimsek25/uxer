// src/redux/sagas/index.ts

import { all, fork } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchRegister } from "./registerSaga";

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchRegister)]);
}


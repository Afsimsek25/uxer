import { put, takeEvery } from "redux-saga/effects";
import { call } from "typed-redux-saga";
import {
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
} from "../actions/registerActions";
import { userRegister } from "../../utils/servise";

function* register(action: any): Generator {
  try {
    const response = yield* call(
      userRegister,
      action.payload.firstName,
      action.payload.lastName,
      action.payload.userName,
      action.payload.email,
      action.payload.password,
      action.payload.passwordConfirm
    );

    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure("Kayıt işlemi başarısız oldu."));
  }
}

export function* watchRegister() {
  yield takeEvery(REGISTER_REQUEST, register);
}

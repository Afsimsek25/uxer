// src/redux/sagas/loginSaga.ts

import { put, takeEvery } from 'redux-saga/effects';
import { call } from 'typed-redux-saga';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginActions';
import { userLogin } from '../../utils/servise';
import { AxiosResponse } from 'axios';
import { ILogin } from '../../models/ILogin';

function* login(action: any): Generator {
  try {
    const response: AxiosResponse<ILogin> = yield* call(userLogin, action.payload.username, action.payload.password);
    yield put(LOGIN_SUCCESS(response.data));
  } catch (error) {
    yield put(LOGIN_FAILURE('Kullanıcı adı veya şifre hatalı'));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}

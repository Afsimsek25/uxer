// src/redux/sagas/loginSaga.ts

import { put, takeEvery } from 'redux-saga/effects';
import { call } from 'typed-redux-saga';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, loginSuccess, loginFailure } from '../actions/loginActions';
import { userLogin } from '../../utils/servise';

function* login(action) {
  try {
    const response = yield* call(userLogin, action.payload.username, action.payload.password);
    yield put({type:LOGIN_SUCCESS,payload:response.data});
    
  } catch (error) {
    yield put(loginFailure('Kullanıcı adı veya şifre hatalı'));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}

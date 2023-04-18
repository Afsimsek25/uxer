// src/redux/actions/loginActions.ts

import { createAction } from '@reduxjs/toolkit';
import { ILogin } from '../../models/ILogin';

export const LOGIN_REQUEST = createAction(
  'LOGIN_REQUEST',
  (username: string, password: string) => ({
    payload: { username, password },
  })
);

export const LOGIN_SUCCESS = createAction('LOGIN_SUCCESS', (data: ILogin) => ({
  payload: { data },
}));

export const LOGIN_FAILURE = createAction('LOGIN_FAILURE', (error: string) => ({
  payload: { error },
}));

export const clearLoginData = createAction('CLEAR_LOGIN_DATA');
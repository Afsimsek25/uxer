// src/redux/actions/loginActions.ts

import { createAction } from "@reduxjs/toolkit";
import { ILogin } from "../../models/ILogin";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const loginRequest = createAction(
  'LOGIN_REQUEST',
  (username: string, password: string) => ({
    payload: { username, password },
  })
);

export const loginSuccess = createAction('LOGIN_SUCCESS', (data: ILogin) => ({
  payload: { data },
}));

export const loginFailure = createAction('LOGIN_FAILURE', (error: string) => ({
  payload: { error },
}));

export const clearLoginData = createAction('CLEAR_LOGIN_DATA');
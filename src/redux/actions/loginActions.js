// src/redux/actions/loginActions.ts

import { createAction } from "@reduxjs/toolkit";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const loginRequest = createAction(
  'LOGIN_REQUEST',
  (username, password) => ({
    payload: { username, password },
  })
);

export const loginSuccess = createAction('LOGIN_SUCCESS', (data) => ({
  payload: { data },
}));

export const loginFailure = createAction('LOGIN_FAILURE', (error) => ({
  payload: { error },
}));
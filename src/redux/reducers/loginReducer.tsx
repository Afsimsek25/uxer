// src/redux/reducers/loginReducer.ts

import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE } from "../actions/loginActions";



const initialState = {
  isLoading: false,
  data: null, // Başlangıçta null değeri atanmalı
  error: null,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;

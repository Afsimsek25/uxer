// userReducer.js

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
  } from '../actions/userActions';
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_USER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null
        };
      case GET_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null
        };
      case UPDATE_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      default:
        return state;
    }
  };
  export default userReducer;
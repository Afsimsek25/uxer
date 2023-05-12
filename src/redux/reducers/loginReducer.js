// src/redux/reducers/loginReducer.ts

import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE } from "../actions/loginActions";
import { useAuth } from "../../provider/AuthProvider";


const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null 
      };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;

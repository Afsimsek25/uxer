import {
    LIST_TEST,
    LIST_TEST_SUCCESS,
    LIST_TEST_FAILED,
    ADD_TEST,
    ADD_TEST_SUCCESS,
    ADD_TEST_FAILED,
    EDIT_TEST,
    EDIT_TEST_SUCCESS,
    EDIT_TEST_FAILED,
    DELETE_TEST,
    DELETE_TEST_SUCCESS,
    DELETE_TEST_FAILED,
    DUPLICATE_TEST,
    DUPLICATE_TEST_SUCCESS,
    DUPLICATE_TEST_FAILED,
  } from "../actions/testActions";
  
  const initialState = {
    tests: [],
    loading: false,
    error: null,
  };
  
  const testReducer = (state = initialState, action) => {
    switch (action.type) {
      case LIST_TEST:
      case ADD_TEST:
      case EDIT_TEST:
      case DELETE_TEST:
      case DUPLICATE_TEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case LIST_TEST_SUCCESS:
        return {
          ...state,
          tests: action.payload,
          loading: false,
          error: null,
        };
  
      case ADD_TEST_SUCCESS:
        return {
          ...state,
          tests: [...state.tests, action.payload],
          loading: false,
          error: null,
        };
  
      case EDIT_TEST_SUCCESS:
        return {
          ...state,
          tests: state.tests.map((test) =>
            test.id === action.payload.testId ? action.payload.updatedData : test
          ),
          loading: false,
          error: null,
        };
  
      case DELETE_TEST_SUCCESS:
        return {
          ...state,
          tests: state.tests.filter((test) => test.id !== action.payload),
          loading: false,
          error: null,
        };
  
      case DUPLICATE_TEST_SUCCESS:
        return {
          ...state,
          tests: [...state.tests, action.payload],
          loading: false,
          error: null,
        };
  
      case LIST_TEST_FAILED:
      case ADD_TEST_FAILED:
      case EDIT_TEST_FAILED:
      case DELETE_TEST_FAILED:
      case DUPLICATE_TEST_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default testReducer;
  
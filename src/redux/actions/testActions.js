// redux/actions/testActions.js

export const LIST_TEST = "LIST_TEST";
export const LIST_TEST_SUCCESS = "LIST_TEST_SUCCESS";
export const LIST_TEST_FAILED = "LIST_TEST_FAILED";

export const ADD_TEST = "ADD_TEST";
export const ADD_TEST_SUCCESS = "ADD_TEST_SUCCESS";
export const ADD_TEST_FAILED = "ADD_TEST_FAILED";

export const EDIT_TEST = "EDIT_TEST";
export const EDIT_TEST_SUCCESS = "EDIT_TEST_SUCCESS";
export const EDIT_TEST_FAILED = "EDIT_TEST_FAILED";

export const DELETE_TEST = "DELETE_TEST";
export const DELETE_TEST_SUCCESS = "DELETE_TEST_SUCCESS";
export const DELETE_TEST_FAILED = "DELETE_TEST_FAILED";

export const DUPLICATE_TEST = "DUPLICATE_TEST";
export const DUPLICATE_TEST_SUCCESS = "DUPLICATE_TEST_SUCCESS";
export const DUPLICATE_TEST_FAILED = "DUPLICATE_TEST_FAILED";


export const listTest = (id) => ({
    type: LIST_TEST,
    payload: id,
  });
  
  export const listTestSuccess = (data) => ({
    type: LIST_TEST_SUCCESS,
    payload: data,
  });
  
  export const listTestFailed = (error) => ({
    type: LIST_TEST_FAILED,
    payload: error,
  });
  
  export const addTest = (testData) => ({
    type: ADD_TEST,
    payload: testData,
  });
  
  export const addTestSuccess = (testData) => ({
    type: ADD_TEST_SUCCESS,
    payload: testData,
  });
  
  export const addTestFailed = (error) => ({
    type: ADD_TEST_FAILED,
    payload: error,
  });
  
  export const editTest = (testId, updatedData) => ({
    type: EDIT_TEST,
    payload: {
      testId,
      updatedData,
    },
  });
  
  export const editTestSuccess = (testId, updatedData) => ({
    type: EDIT_TEST_SUCCESS,
    payload: {
      testId,
      updatedData,
    },
  });
  
  export const editTestFailed = (error) => ({
    type: EDIT_TEST_FAILED,
    payload: error,
  });
  
  export const deleteTest = (testId) => ({
    type: DELETE_TEST,
    payload: testId,
  });
  
  export const deleteTestSuccess = (testId) => ({
    type: DELETE_TEST_SUCCESS,
    payload: testId,
  });
  
  export const deleteTestFailed = (error) => ({
    type: DELETE_TEST_FAILED,
    payload: error,
  });
  
  export const duplicateTest = (testId) => ({
    type: DUPLICATE_TEST,
    payload: testId,
  });
  
  export const duplicateTestSuccess = (testData) => ({
    type: DUPLICATE_TEST_SUCCESS,
    payload: testData,
  });
  
  export const duplicateTestFailed = (error) => ({
    type: DUPLICATE_TEST_FAILED,
    payload: error,
  });
  
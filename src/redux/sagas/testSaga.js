import { put, takeEvery } from "redux-saga/effects";
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
import axios from "axios";

const usr = JSON.parse(localStorage.getItem("token"));
const apiUrl = "https://gateway-test.u-xer.com/api/Job";

const api = {
  listTest: async (reqDetails) => {
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Test/search",
        reqDetails,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addTest: async (testData) => {
    // Simulating an asynchronous API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newTest = { id: 3, name: "Test 3" };
        resolve(newTest);
      }, 1000);
    });
  },
  editTest: async (testId, updatedData) => {
    // Simulating an asynchronous API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedTest = { id: testId, ...updatedData };
        resolve(updatedTest);
      }, 1000);
    });
  },
  deleteTest: async (testId) => {
    // Simulating an asynchronous API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(testId);
      }, 1000);
    });
  },
  duplicateTest: async (testId) => {
    // Simulating an asynchronous API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const duplicatedTest = { id: testId, name: "Duplicated Test" };
        resolve(duplicatedTest);
      }, 1000);
    });
  },
};

function* listTestSaga(action) {
  try {
    const testData = yield api.listTest(action.payload);
    yield put({ type: LIST_TEST_SUCCESS, payload: testData });
  } catch (error) {
    yield put({ type: LIST_TEST_FAILED, payload: error.message });
  }
}

function* addTestSaga(action) {
  try {
    // Call the API to add a new test
    const newTest = yield api.addTest(action.payload);
    yield put({ type: ADD_TEST_SUCCESS, payload: newTest });
  } catch (error) {
    yield put({ type: ADD_TEST_FAILED, payload: error.message });
  }
}

function* editTestSaga(action) {
  try {
    const { testId, updatedData } = action.payload;
    // Call the API to edit the test
    const updatedTest = yield api.editTest(testId, updatedData);
    yield put({
      type: EDIT_TEST_SUCCESS,
      payload: { testId, updatedData: updatedTest },
    });
  } catch (error) {
    yield put({ type: EDIT_TEST_FAILED, payload: error.message });
  }
}

function* deleteTestSaga(action) {
  try {
    // Call the API to delete the test
    yield api.deleteTest(action.payload);
    yield put({ type: DELETE_TEST_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_TEST_FAILED, payload: error.message });
  }
}

function* duplicateTestSaga(action) {
  try {
    // Call the API to duplicate the test
    const duplicatedTest = yield api.duplicateTest(action.payload);
    yield put({ type: DUPLICATE_TEST_SUCCESS, payload: duplicatedTest });
  } catch (error) {
    yield put({ type: DUPLICATE_TEST_FAILED, payload: error.message });
  }
}

// Watcher saga
export default function* testSaga() {
  yield takeEvery(LIST_TEST, listTestSaga);
  yield takeEvery(ADD_TEST, addTestSaga);
  yield takeEvery(EDIT_TEST, editTestSaga);
  yield takeEvery(DELETE_TEST, deleteTestSaga);
  yield takeEvery(DUPLICATE_TEST, duplicateTestSaga);
}

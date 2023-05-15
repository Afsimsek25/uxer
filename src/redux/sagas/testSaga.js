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
import { message } from "antd";

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
    try {
      const response = await axios.post(
        "https://gateway-test.u-xer.com/api/Test",
        testData,
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
  editTest: async (testId, updatedData) => {
    console.log(updatedData);
    try {
      const response = await axios.put(
        `https://gateway-test.u-xer.com/api/Test/${testId}`,
        updatedData,
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
  deleteTest: async (testId) => {
    try {
      const response = await axios.delete(
        `https://gateway-test.u-xer.com/api/Test/${testId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  duplicateTest: async (testId) => {
    console.log(testId);
    try {
      const response = await axios.put(
        `https://gateway-test.u-xer.com/api/Test/${testId}/duplicate`,
        null,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
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
    const newTest = yield api.addTest(action.payload);
    yield put({ type: ADD_TEST_SUCCESS, payload: newTest });
    message.success("Test added successfully");
    yield put({
      type: LIST_TEST,
      payload: { folderId: action.payload.folderId },
    });
  } catch (error) {
    yield put({ type: ADD_TEST_FAILED, payload: error.message });
  }
}

function* editTestSaga(action) {
  try {
    console.log(action.payload);
    const testId = action.payload.testId.id;
    const name = action.payload.testId.name;
    const description = action.payload.testId.description; 
    
    const updatedTest = yield api.editTest(testId, {name, description, script:""});
    yield put({
      type: EDIT_TEST_SUCCESS,
      payload: { testId, updatedData: updatedTest },
    });
    message.success("Test update successfully");
    yield put({ type: LIST_TEST, payload: { folderId: action.payload.folderId } });
  } catch (error) {
    yield put({ type: EDIT_TEST_FAILED, payload: error.message });
  }
}

function* deleteTestSaga(action) {
  try {
    yield api.deleteTest(action.payload);
    yield put({ type: DELETE_TEST_SUCCESS, payload: action.payload });
    message.success("Test deleted successfully");
    yield put({
      type: LIST_TEST,
      payload: { folderId: action.payload.folderId },
    });
  } catch (error) {
    yield put({ type: DELETE_TEST_FAILED, payload: error.message });
  }
}

function* duplicateTestSaga(action) {
  try {
    const duplicatedTest = yield api.duplicateTest(action.payload);
    yield put({ type: DUPLICATE_TEST_SUCCESS, payload: duplicatedTest });
    message.success("Test duplicated successfully");
    yield put({
      type: LIST_TEST,
      payload: { folderId: action.payload.folderId },
    });
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

import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_JOBS,
  ADD_JOB,
  DELETE_JOB,
  EDIT_JOB,
  DUPLICATE_JOB,
} from "../actions/jobActions";

const usr = JSON.parse(localStorage.getItem("token"));
const apiUrl = "https://gateway-test.u-xer.com/api/Job";

export function* fetchJobs() {
  try {
    const response = yield call(axios.get, apiUrl, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${usr.token.accessToken}`,
      },
    });
    yield put({ type: `${FETCH_JOBS}_SUCCESS`, payload: response.data });
  } catch (e) {
    yield put({ type: `${FETCH_JOBS}_FAILED`, message: e.message });
  }
}

// Similar saga functions for ADD_JOB, DELETE_JOB, EDIT_JOB, DUPLICATE_JOB ...

export default function* jobSaga() {
  yield takeLatest(FETCH_JOBS, fetchJobs);
  // Similar takeLatest for ADD_JOB, DELETE_JOB, EDIT_JOB, DUPLICATE_JOB ...
}

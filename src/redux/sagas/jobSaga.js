import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  ADD_JOB,
  ADD_JOB_FAILED,
  ADD_JOB_SUCCESS,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILED,
  EDIT_JOB,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_FAILED,
  DUPLICATE_JOB,
  DUPLICATE_JOB_SUCCESS,
  DUPLICATE_JOB_FAILED,
} from "../actions/jobActions";

const usr = JSON.parse(localStorage.getItem("token"));
const apiUrl = "https://gateway-test.u-xer.com/api/Job";

function* fetchJobsSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "https://gateway-test.u-xer.com/api/Job/search",
      {
        projectId: action.payload,
      },
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    yield put({ type: FETCH_JOBS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_JOBS_FAILED, payload: error.message });
  }
}
function* deleteJobSaga(action) {
  try {
    const response = yield call(
      axios.delete,
      `${apiUrl}/${action.payload.jobId}`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
        },
      }
    );

    // After successful deletion, dispatch a success action
    yield put({ type: `${DELETE_JOB_SUCCESS}`, payload: response.data });
    yield fetchJobsSaga(action.payload.publicProjectId);
  } catch (error) {
    yield put({ type: `${DELETE_JOB_FAILED}`, message: error.message });
  }
}
function* duplicateJobSaga(action) {
  try {
    yield call(
      axios.put,
      `https://gateway-test.u-xer.com/api/Job/${action.payload.jobId}/duplicate`,
      {},
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
        },
      }
    );
    yield put({ type: `${DUPLICATE_JOB_SUCCESS}` });
    yield fetchJobsSaga(action.payload.publicProjectId);
  } catch (error) {
    yield put({ type: `${DUPLICATE_JOB_FAILED}`, message: error.message });
    console.error("Error duplicating job:", error);
  }
}
function* addJobSaga(action) {
  const values = action.payload;
  try {
    const response = yield call(
      axios.post,
      "https://gateway-test.u-xer.com/api/Job",
      {
        ...values,
        agentId: values.agent,
      },
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    yield put({ type: ADD_JOB_SUCCESS, payload: response.data });
    yield fetchJobsSaga(action.payload.projectId);
  } catch (error) {
    yield put({ type: ADD_JOB_FAILED, message: error.message });
    console.error("Error creating new job:", error);
  }
}
function* editJobSaga(action) {
  const values = action.payload.updatedJob;
  try {
    const response = yield call(
      axios.put,
      `https://gateway-test.u-xer.com/api/Job/${values.id}`,
      {
        ...values,
        agentId: values.agent,
      },
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    yield put({ type: EDIT_JOB_SUCCESS, payload: response.data });
    yield fetchJobsSaga(action.payload.publicProjectId);
  } catch (error) {
    yield put({ type: EDIT_JOB_FAILED, message: error.message });
    console.error("Error editing job:", error);
  }
}



// Then add this to your root saga
export default function* jobSaga() {
  yield takeLatest(FETCH_JOBS, fetchJobsSaga);
  yield takeLatest(DELETE_JOB, deleteJobSaga);
  yield takeLatest(DUPLICATE_JOB, duplicateJobSaga);
  yield takeLatest(ADD_JOB, addJobSaga);
  yield takeLatest(EDIT_JOB, editJobSaga);
}
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
  EDIT_JOB,
  DUPLICATE_JOB,
  DUPLICATE_JOB_SUCCESS,
  DUPLICATE_JOB_FAILED,
} from "../actions/jobActions";
import { message } from "antd";
import { useSelector } from "react-redux";

const usr = JSON.parse(localStorage.getItem("token"));
const apiUrl = "https://gateway-test.u-xer.com/api/Job";

function* fetchJobs(action) {
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
    yield put({ type: `${FETCH_JOBS_SUCCESS}`, payload: response.data });
  } catch (e) {
    yield put({ type: `${FETCH_JOBS_FAILED}`, message: e.message });
  }
}
function* deleteJobSaga(action) {
  console.log("deleteJobSaga is called");
  try {
    const response = yield call(
      axios.delete,
      `${apiUrl}/${action.payload}`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
        },
      }
    );

    // After successful deletion, dispatch a success action
    yield put({ type: `${DELETE_JOB}_SUCCESS`, payload: response.data });
    yield put({ type: FETCH_JOBS });
    message.success("Job is successfully deleted");
  } catch (error) {
    // If there's an error, dispatch a failure action
    yield put({ type: `${DELETE_JOB}_FAILURE`, message: error.message });
  }
}
function* duplicateJobSaga(action) {
  console.log("duplicateJobSaga is called");
  try {
    yield call(
      axios.put,
      `https://gateway-test.u-xer.com/api/Job/${action.payload}/duplicate`,
      {},
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
        },
      }
    );
    yield put({ type: `${DUPLICATE_JOB_SUCCESS}` });
    yield put({ type: FETCH_JOBS });
    message.success("Job is successfully duplicated");
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
    yield put({ type: ADD_JOB_SUCCESS, payload: response.data }); // Ekleme işlemi başarılı olduğunda, sunucudan dönen işi eyleme ekleyin.
    yield put({ type: FETCH_JOBS });
    message.success("Job is successfully added");
  } catch (error) {
    yield put({ type: ADD_JOB_FAILED, message: error.message });
    console.error("Error creating new job:", error);
  }
}




// Then add this to your root saga
export default function* jobSaga() {
  yield takeLatest(FETCH_JOBS, fetchJobs);
  yield takeLatest(DELETE_JOB, deleteJobSaga);
  yield takeLatest(DUPLICATE_JOB, duplicateJobSaga);
  yield takeLatest(ADD_JOB, addJobSaga);
}
// redux/sagas/agentSaga.js

import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  AGENT_REQUEST,
  agentSuccess,
  agentFailure,
} from "../actions/agentActions";

const usr = JSON.parse(localStorage.getItem("token"));
function* fetchAgents(action) {
  console.log("fetchAgents is called");
  try {
    const response = yield call(
      axios.post,
      "https://gateway-test.u-xer.com/api/Agent/search",
      {
        searchText: "",
        name: "",
        description: "",
      },
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(agentSuccess(response.data));
  } catch (error) {
    yield put(agentFailure(error.message));
  }
}

export function* watchAgentRequests() {
  yield takeLatest(AGENT_REQUEST, fetchAgents);
}

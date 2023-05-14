import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
} from '../actions/userActions';
import axios from 'axios';

const api = {

    getUser:async () => {
        try {
            const usr = JSON.parse(localStorage.getItem("token"));

            const response = await axios.get('https://gateway-test.u-xer.com/api/User/me', {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${usr.token.accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error during API call', error);
            throw error;
        }
    }

}

function* getUserSaga(action) {
    try {
        const user = yield call(api.getUser);
        console.log("user", user);
        yield put({ type: GET_USER_SUCCESS, payload: user });
    } catch (error) {
        yield put({ type: GET_USER_FAILURE, error: error.message });
    }
}


export default function* userSaga() {
    yield takeLatest(GET_USER_REQUEST, getUserSaga);
}

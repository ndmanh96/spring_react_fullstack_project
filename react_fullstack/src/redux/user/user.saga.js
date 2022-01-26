import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import UserActionType from './user.type';
import {signupSuccess, signupError, loginSuccess, loginError} from './user.action';
import setJWTToken from './user.token';
import jwt_decode from 'jwt-decode';

export function* signUp({payload: {user, router}}) {
    try {
        const res = yield axios.post(`http://localhost:8000/api/users`, user);
        yield put(signupSuccess());
        router.navigate(`/login`);
    } catch (error) {
        yield put(signupError(error.response));
    }
}
export function* onSignupStart() {
    yield takeLatest(UserActionType.SIGNUP_START, signUp);
}


export function* logIn({payload: {user, router}}) {
    try {
        const res = yield axios.post(`http://localhost:8000/api/users/login`, user);
        yield put(loginSuccess(user));

        // save token
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);

        // add token to headers
        setJWTToken(token);

        //decode jwtToken
        //const decoded = 

        router.navigate(`/dashboard`);
    } catch (error) {
        yield put(loginError(error.response));
    }
}
export function* onLoginStart() {
    yield takeLatest(UserActionType.LOGIN_START, logIn);
}

export function* userSaga() {
    yield all([
      call(onSignupStart),
      call(onLoginStart)
    ]);
}


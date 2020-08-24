import { takeLatest, takeEvery, all, put, call } from 'redux-saga/effects';
import {
  fetchUserRegister,
  fetchUserLogin,
  fetchCurrentUser,
  fetchLogoutUser,
} from 'api';

import {
  registerUser,
  registerUserSuccess,
  registerUserFailed,
  loginUser,
  loginUserSuccess,
  loginUserFailed,
  checkCurrentUser,
  checkCurrentUserSuccess,
  checkCurrentUserFailed,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailed,
} from './slice';

export function* registerUserEffect(action) {
  const { data } = action.payload;
  try {
    const response = yield call(fetchUserRegister, data);
    yield put(registerUserSuccess({ response: response.data }));
  } catch (err) {
    if (err.response) {
      yield put(registerUserFailed({ err: err.response.data }));
    } else {
      yield put(registerUserFailed({ err: { error: 'you are offline' } }));
    }
  }
}

export function* loginUserEffect(action) {
  const { data } = action.payload;
  try {
    const response = yield call(fetchUserLogin, data);
    yield put(loginUserSuccess({ response: response.data }));
  } catch (err) {
    if (err.response) {
      yield put(loginUserFailed({ err: err.response.data }));
    } else {
      yield put(loginUserFailed({ err: { error: 'you are offline' } }));
    }
  }
}

export function* checkCurrentUserEffect() {
  try {
    const data = yield call(fetchCurrentUser);
    yield put(checkCurrentUserSuccess({ data: data.data }));
  } catch (err) {
    yield put(checkCurrentUserFailed({ err: err.response.data }));
  }
}

export function* logoutUserEffect() {
  try {
    yield call(fetchLogoutUser);
    yield put(logoutUserSuccess());
  } catch (err) {
    yield put(logoutUserFailed({ err: err.response.data }));
  }
}

export default function*() {
  yield all([
    takeLatest(registerUser, registerUserEffect),
    takeEvery(loginUser, loginUserEffect),
    takeEvery(checkCurrentUser, checkCurrentUserEffect),
    takeLatest(logoutUser, logoutUserEffect),
  ]);
}

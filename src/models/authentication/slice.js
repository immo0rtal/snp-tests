/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

// import { normalize } from 'utils/normalizeById';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    data: {},
    users: localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : false,
    loading: false,
    initialLoading: true,
    errorMessage: null,
    login: false,
  },
  reducers: {
    setInitialLoading(state, { payload }) {
      state.initialLoading = payload.value;
    },
    registerUser(state) {
      state.loading = true;
    },
    registerUserSuccess(state) {
      state.loading = false;
    },
    registerUserFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    loginUser(state) {
      state.loading = true;
    },
    loginUserSuccess(state, { payload }) {
      state.loading = false;
      state.data = payload.response;
      state.login = true;
    },
    loginUserFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    checkCurrentUser(state) {
      state.initialLoading = true;
    },
    checkCurrentUserSuccess(state, { payload }) {
      state.initialLoading = false;
      state.data = payload.data;
      state.login = true;
    },
    checkCurrentUserFailed(state, { payload }) {
      state.initialLoading = false;
      state.errorMessage = payload.errorMessage;
    },
    logoutUser(state) {
      state.initialLoading = true;
    },
    logoutUserSuccess(state) {
      state.login = false;
      state.initialLoading = false;
    },
    logoutUserFailed(state, { payload }) {
      state.initialLoading = false;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const {
  setInitialLoading,
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
} = authSlice.actions;

export default authSlice.reducer;

/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    data: {},
    loading: false,
    isAdmin: false,
    initialLoading: true,
    errorMessage: null,
    registerError: null,
    login: false,
  },
  reducers: {
    deleteError(state) {
      state.errorMessage = null;
      state.registerError = null;
    },
    setInitialLoading(state, { payload }) {
      state.initialLoading = payload.value;
    },
    registerUser(state) {
      state.loading = true;
    },
    registerUserSuccess(state, { payload }) {
      state.loading = false;
      state.data = payload.response;
      state.isAdmin = payload.response.is_admin;
      state.login = true;
    },
    registerUserFailed(state, { payload }) {
      state.loading = false;
      state.registerError = payload.err;
    },
    loginUser(state) {
      state.loading = true;
    },
    loginUserSuccess(state, { payload }) {
      state.loading = false;
      state.data = payload.response;
      state.isAdmin = payload.response.is_admin;
      state.login = true;
    },
    loginUserFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
    checkCurrentUser(state) {
      state.initialLoading = true;
    },
    checkCurrentUserSuccess(state, { payload }) {
      state.initialLoading = false;
      state.data = payload.data;
      state.isAdmin = payload.data.is_admin;
      state.login = true;
    },
    checkCurrentUserFailed(state, { payload }) {
      state.initialLoading = false;
      state.errorMessage = payload.err;
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
      state.errorMessage = payload.err;
    },
  },
});

export const {
  deleteError,
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

/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const testsSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: {},
    info: {
      page: 1,
      per: 5,
      search: null,
      sort: 'created_at_desc',
    },
    loading: false,
    errorMessage: null,
    meta: {
      total_pages: 0,
      total_count: 0,
    },
  },
  reducers: {
    changeSearchField(state, { payload }) {
      state.info.search = payload.value;
    },
    getTests(state) {
      state.loading = true;
    },
    getTestsSuccess(state, { payload }) {
      state.loading = false;
      state.tests = payload.tests;
      state.meta = payload.meta;
    },
    getTestsFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    createTest(state) {
      state.loading = true;
    },
    createTestSuccess(state, { payload }) {
      state.loading = false;
      state.tests.push(payload.test);
    },
    createTestFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    delelteTest(state) {
      state.loading = true;
    },
    deleteTestSuccess(state, { payload }) {
      state.loading = false;
    },
    deleteTestFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const {
  changeSearchField,
  getTests,
  getTestsSuccess,
  getTestsFailed,
  createTest,
  createTestSuccess,
  createTestFailed,
} = testsSlice.actions;

export const tests = testsSlice;

export default testsSlice.reducer;

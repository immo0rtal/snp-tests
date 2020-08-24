/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';

const actionCreateQuestionSuccess = createAction(
  'questions/createQuestionSuccess'
);

const actionDeleteQuestionSuccess = createAction(
  'questions/deleteQuestionSuccess'
);

const actionLogoutUserSuccess = createAction(
  'authentication/logoutUserSuccess'
);

const testsSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: {},
    testsById: [],
    info: {
      page: 1,
      per: 7,
      search: null,
      sort: 'created_at_desc',
    },
    loading: false,
    preLoading: true,
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
    changePage(state, { payload }) {
      state.info.page = payload.page;
    },
    getTests(state) {
      state.preLoading = true;
    },
    getTestsSuccess(state, { payload }) {
      state.preLoading = false;
      state.tests = payload.tests;
      state.meta = payload.meta;
      state.testsById = payload.testsById;
    },
    getTestsFailed(state, { payload }) {
      state.preLoading = false;
      state.errorMessage = payload.err;
    },
    createTest(state) {
      state.loading = true;
    },
    createTestSuccess(state, { payload: { test } }) {
      state.loading = false;
      state.tests[test.id] = test;
    },
    createTestFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
    deleteTest(state) {
      state.loading = true;
    },
    deleteTestSuccess(state, { payload }) {
      state.loading = false;
      state.testsById = state.testsById.filter(el => el !== payload.id);
    },
    deleteTestFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
    editTest(state) {
      state.loading = true;
    },
    editTestSuccess(state, { payload: { testId, title } }) {
      state.loading = false;
      state.tests[testId].title = title;
    },
    editTestFailed(state, payload) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
    changeDateFilter(state) {
      if (state.info.sort === 'created_at_desc') {
        state.info.sort = 'created_at_asc';
      } else {
        state.info.sort = 'created_at_desc';
      }
    },
  },
  extraReducers: {
    [actionCreateQuestionSuccess]: (state, { payload: { id, question } }) => {
      state.tests[id].questions.push(question.id);
    },
    [actionDeleteQuestionSuccess]: (
      state,
      { payload: { testId, questionId } }
    ) => {
      state.tests[testId].questions = state.tests[testId].questions.filter(
        question => question !== questionId
      );
    },
    [actionLogoutUserSuccess]: state => {
      state.info.search = null;
      state.info.sort = 'created_at_desc';
    },
  },
});

export const {
  changeDateFilter,
  changePage,
  changeSearchField,
  getTests,
  getTestsSuccess,
  getTestsFailed,
  createTest,
  createTestSuccess,
  createTestFailed,
  deleteTest,
  deleteTestSuccess,
  deleteTestFailed,
  editTest,
  editTestSuccess,
  editTestFailed,
} = testsSlice.actions;

export default testsSlice.reducer;

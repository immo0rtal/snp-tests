/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';

import { omit } from 'utils/omit';

const actionCreateQuestionSuccess = createAction(
  'questions/createQuestionSuccess'
);

const actionDeleteQuestionSuccess = createAction(
  'questions/deleteQuestionSuccess'
);

const testsSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: {},
    info: {
      page: 1,
      per: 7,
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
    changePage(state, { payload }) {
      state.info.page = payload.page;
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
      state.errorMessage = payload.err;
    },
    createTest(state) {
      state.loading = true;
    },
    createTestSuccess(state, { payload: { test } }) {
      state.loading = false;
      state.tests = {
        ...state.tests,
        [test.id]: test,
      };
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
      state.tests = omit(state.tests, [payload.id]);
    },
    deleteTestFailed(state, { payload }) {
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
} = testsSlice.actions;

export default testsSlice.reducer;

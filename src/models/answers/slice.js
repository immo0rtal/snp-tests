/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';

const actionGetTestsSuccess = createAction('tests/getTestsSuccess');

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: {},
    loading: false,
    errorMessage: null,
  },
  reducers: {
    createAnswer(state) {
      state.loading = true;
    },
    createAnswerSuccess(state, { payload }) {
      state.loading = false;
      state.answers = {
        ...state.answers,
        [payload.answer.id]: payload.answer,
      };
    },
    createAnswerFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
    deleteAnswer(state) {
      state.loading = true;
    },
    deleteAnswerSuccess(state) {
      state.loading = false;
    },
    deleteAnswerFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
    changeAnswer(state) {
      state.loading = true;
    },
    changeAnswerSuccess(state, { payload: { id, check } }) {
      state.loading = false;
      state.answers[id].is_right = check;
    },
    changeAnswerFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
  },
  extraReducers: {
    [actionGetTestsSuccess]: (state, { payload }) => {
      state.answers = payload.answers;
    },
  },
});

export const {
  createAnswer,
  createAnswerSuccess,
  createAnswerFailed,
  deleteAnswer,
  deleteAnswerSuccess,
  deleteAnswerFailed,
  changeAnswer,
  changeAnswerSuccess,
  changeAnswerFailed,
} = answersSlice.actions;

export default answersSlice.reducer;

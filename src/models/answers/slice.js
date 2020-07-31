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
} = answersSlice.actions;

export default answersSlice.reducer;

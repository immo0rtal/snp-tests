/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { tests } from 'models/tests/slice';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: {},
    loading: false,
    errorMessage: null,
  },
  reducers: {
    createQuestion(state) {
      state.loading = true;
    },
    createQuestionSuccess(state, { payload }) {
      state.loading = false;
      state.questions = {
        ...state.questions,
        [payload.question.id]: payload.question,
      };
    },
    createQuestionFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
  },
  extraReducers: {
    [tests.actions.getTestsSuccess]: (state, { payload }) => {
      state.questions = payload.questions;
    },
  },
});

export const {
  createQuestion,
  createQuestionSuccess,
  createQuestionFailed,
} = questionsSlice.actions;

export default questionsSlice.reducer;

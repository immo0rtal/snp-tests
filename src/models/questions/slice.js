/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';

const actionGetTestsSuccess = createAction('tests/getTestsSuccess');

const actionCreateAnswerSuccess = createAction('answers/createAnswerSuccess');

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
      state.errorMessage = payload.err;
    },
    deleteQuestion(state) {
      state.loading = true;
    },
    deleteQuestionSuccess(state) {
      state.loading = false;
    },
    deleteQuestionFailed(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload.err;
    },
  },
  extraReducers: {
    [actionGetTestsSuccess]: (state, { payload }) => {
      state.questions = payload.questions;
    },
    [actionCreateAnswerSuccess]: (state, { payload: { id, answer } }) => {
      state.questions[id].answers.push(answer.id);
    },
  },
});

export const {
  createQuestion,
  createQuestionSuccess,
  createQuestionFailed,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionFailed,
} = questionsSlice.actions;

export default questionsSlice.reducer;

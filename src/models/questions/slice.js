/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';

const actionGetTestsSuccess = createAction('tests/getTestsSuccess');

const actionCreateAnswerSuccess = createAction('answers/createAnswerSuccess');

const actionDeleteAnswerSuccess = createAction('answers/deleteAnswerSuccess');

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: {},
    loading: false,
    loader: false,
    errorMessage: null,
  },
  reducers: {
    createQuestion(state) {
      state.loader = true;
    },
    createQuestionSuccess(state, { payload: { question } }) {
      state.loader = false;
      state.questions[question.id] = question;
    },
    createQuestionFailed(state, { payload }) {
      state.loader = false;
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
    changePosition(state, { payload: { questionId, dragIndex, hoverIndex } }) {
      const mass = state.questions[questionId].answers;
      [mass[dragIndex], mass[hoverIndex]] = [mass[hoverIndex], mass[dragIndex]];
    },
    changePositionFailed(state, { payload }) {
      state.errorMessage = payload.err;
    },
    editQuestion(state) {
      state.loading = true;
    },
    editQuestionSuccess(state, { payload: { question } }) {
      state.loading = false;
      state.questions[question.id].title = question.title;
      state.questions[question.id].answer = question.answer;
    },
    editQuestionFailed(state, { payload }) {
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
    [actionDeleteAnswerSuccess]: (
      state,
      { payload: { questionId, answerId } }
    ) => {
      state.questions[questionId].answers = state.questions[
        questionId
      ].answers.filter(answer => answer !== answerId);
    },
  },
});

export const {
  changePosition,
  changePositionFailed,
  createQuestion,
  createQuestionSuccess,
  createQuestionFailed,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionFailed,
  editQuestion,
  editQuestionSuccess,
  editQuestionFailed,
} = questionsSlice.actions;

export default questionsSlice.reducer;

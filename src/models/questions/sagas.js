import { takeEvery, all, put, call } from 'redux-saga/effects';
import { postQuestion, removeQuestion } from 'api/tests';

import {
  createQuestion,
  createQuestionSuccess,
  createQuestionFailed,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionFailed,
} from './slice';

export function* createQuestionEffect(action) {
  const { data, id } = action.payload;
  try {
    const response = yield call(postQuestion, data, id);
    yield put(createQuestionSuccess({ question: response.data, id }));
  } catch (err) {
    yield put(createQuestionFailed({ err: err.response.data }));
  }
}

export function* deleteQuestionEffect(action) {
  const { questionId, testId } = action.payload;
  try {
    yield call(removeQuestion, questionId);
    yield put(deleteQuestionSuccess({ questionId, testId }));
  } catch (err) {
    yield put(deleteQuestionFailed({ err: err.response.data }));
  }
}

export default function*() {
  yield all([
    takeEvery(createQuestion, createQuestionEffect),
    takeEvery(deleteQuestion, deleteQuestionEffect),
  ]);
}

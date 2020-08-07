import { takeEvery, all, put, call } from 'redux-saga/effects';
import {
  postQuestion,
  removeQuestion,
  swapAnswers,
  patchQuestion,
} from 'api/tests';

import {
  createQuestion,
  createQuestionSuccess,
  createQuestionFailed,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionFailed,
  changePosition,
  changePositionFailed,
  editQuestion,
  editQuestionSuccess,
  editQuestionFailed,
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

export function* swapAnswersEffect(action) {
  const { answerId, hoverIndex } = action.payload;
  try {
    yield call(swapAnswers, answerId, hoverIndex);
  } catch (err) {
    yield put(changePositionFailed({ err: err.response.data }));
  }
}

export function* editQuestionEffect(action) {
  const { question } = action.payload;
  try {
    const response = yield call(patchQuestion, question);
    yield put(editQuestionSuccess({ question: response.data }));
  } catch (err) {
    yield put(editQuestionFailed({ err: err.response.data }));
  }
}

export default function*() {
  yield all([
    takeEvery(createQuestion, createQuestionEffect),
    takeEvery(deleteQuestion, deleteQuestionEffect),
    takeEvery(changePosition, swapAnswersEffect),
    takeEvery(editQuestion, editQuestionEffect),
  ]);
}

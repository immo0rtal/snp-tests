import { takeEvery, all, put, call } from 'redux-saga/effects';
import { postAnswer, removeAnswer, patchAnswer } from 'api/tests';

import {
  createAnswer,
  createAnswerSuccess,
  createAnswerFailed,
  deleteAnswer,
  deleteAnswerSuccess,
  deleteAnswerFailed,
  changeAnswer,
  changeAnswerSuccess,
  changeAnswerFailed,
} from './slice';

export function* createAnswerEffect(action) {
  const { data, id } = action.payload;

  try {
    const response = yield call(postAnswer, data, id);
    yield put(createAnswerSuccess({ answer: response.data, id }));
  } catch (err) {
    yield put(createAnswerFailed({ err: err.response.data }));
  }
}

export function* deleteAnswerEffect(action) {
  const { questionId, answerId } = action.payload;

  try {
    yield call(removeAnswer, answerId);
    yield put(deleteAnswerSuccess({ answerId, questionId }));
  } catch (err) {
    yield put(deleteAnswerFailed({ err: err.response.data }));
  }
}

export function* changeAnswerEffect(action) {
  const { answer } = action.payload;
  try {
    const response = yield call(patchAnswer, answer);
    yield put(changeAnswerSuccess({ answer: response.data }));
  } catch (err) {
    yield put(changeAnswerFailed({ err: err.response.data }));
  }
}

export default function*() {
  yield all([
    takeEvery(createAnswer, createAnswerEffect),
    takeEvery(deleteAnswer, deleteAnswerEffect),
    takeEvery(changeAnswer, changeAnswerEffect),
  ]);
}

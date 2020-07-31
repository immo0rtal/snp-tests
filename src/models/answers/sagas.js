import { takeEvery, all, put, call } from 'redux-saga/effects';
import { postAnswer } from 'api/tests';

import { createAnswer, createAnswerSuccess, createAnswerFailed } from './slice';

export function* createAnswerEffect(action) {
  const { data, id } = action.payload;

  try {
    const response = yield call(postAnswer, data, id);
    yield put(createAnswerSuccess({ answer: response.data, id }));
  } catch (err) {
    yield put(createAnswerFailed({ err }));
  }
}

export default function*() {
  yield all([takeEvery(createAnswer, createAnswerEffect)]);
}

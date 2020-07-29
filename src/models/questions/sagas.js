import { takeEvery, all, put, call } from 'redux-saga/effects';
import { postQuestion } from 'api/tests';

import {
  createQuestion,
  createQuestionSuccess,
  createQuestionFailed,
} from './slice';

export function* createQuestionEffect(action) {
  const { data, id } = action.payload;
  try {
    const response = yield call(postQuestion, data, id);
    yield put(createQuestionSuccess({ question: response.data }));
  } catch (err) {
    yield put(createQuestionFailed({ err }));
  }
}

export default function*() {
  yield all([takeEvery(createQuestion, createQuestionEffect)]);
}

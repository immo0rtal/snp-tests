import { takeEvery, all, put, call } from 'redux-saga/effects';
import { fetchTests, postTest, removeTest } from 'api/tests';
import { push } from 'connected-react-router';

import {
  getTests,
  getTestsSuccess,
  getTestsFailed,
  createTest,
  createTestSuccess,
  createTestFailed,
  deleteTest,
  deleteTestSuccess,
  deleteTestFailed,
} from './slice';

import { normalize, schema } from 'normalizr';

export function* getTestsEffect(action) {
  const { info } = action.payload;
  try {
    const response = yield call(fetchTests, info);

    const answer = new schema.Entity('answers');
    const question = new schema.Entity('questions', { answers: [answer] });
    const testsSchema = new schema.Entity('tests', { questions: [question] });

    const normalizedData = normalize(response.data.tests, [testsSchema]);
    const { tests, questions, answers } = normalizedData.entities;

    yield put(
      getTestsSuccess({
        tests,
        questions,
        answers,
        meta: response.data.meta,
      })
    );
  } catch (err) {
    yield put(getTestsFailed({ err: err.response.data }));
  }
}

export function* createTestEffect(action) {
  try {
    const response = yield call(postTest, action.payload);
    yield put(createTestSuccess({ test: response.data }));
    yield put(push(`/test/${response.data.id}`));
  } catch (err) {
    yield put(createTestFailed({ err: err.response.data }));
  }
}

export function* deleteTestEffect(action) {
  const { id } = action.payload;
  try {
    yield call(removeTest, id);
    yield put(deleteTestSuccess({ id }));
  } catch (err) {
    yield put(deleteTestFailed({ err: err.response.data }));
  }
}

export default function*() {
  yield all([
    takeEvery(getTests, getTestsEffect),
    takeEvery(createTest, createTestEffect),
    takeEvery(deleteTest, deleteTestEffect),
  ]);
}

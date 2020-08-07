import { takeEvery, all, put, call } from 'redux-saga/effects';
import { fetchTests, postTest, removeTest, patchTest } from 'api/tests';
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
  editTest,
  editTestSuccess,
  editTestFailed,
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
        testsById: normalizedData.result,
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
  const { id, info, length } = action.payload;
  try {
    yield call(removeTest, id);
    yield put(deleteTestSuccess({ id }));
    if (length > 6) {
      yield put(getTests({ info }));
    }
  } catch (err) {
    yield put(deleteTestFailed({ err: err.response.data }));
  }
}

export function* editTestEffect(action) {
  const { testId, title } = action.payload;
  try {
    yield call(patchTest, testId, { title });
    yield put(editTestSuccess({ testId, title }));
  } catch (err) {
    yield put(editTestFailed({ err: err.response.data }));
  }
}

export default function*() {
  yield all([
    takeEvery(getTests, getTestsEffect),
    takeEvery(createTest, createTestEffect),
    takeEvery(deleteTest, deleteTestEffect),
    takeEvery(editTest, editTestEffect),
  ]);
}

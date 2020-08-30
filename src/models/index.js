import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import authReducer from './authentication/slice';
import testsReducer from './tests/slice';
import questionsReducer from './questions/slice';
import answersReducer from './answers/slice';

import authSagas, { checkCurrentUserEffect } from './authentication/sagas';
import testsSagas from './tests/sagas';
import questionsSagas from './questions/sagas';
import answersSagas from './answers/sagas';

export const createRootReducer = history => ({
  router: connectRouter(history),
  auth: authReducer,
  tests: testsReducer,
  questions: questionsReducer,
  answers: answersReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([
    checkCurrentUserEffect(),
    authSagas(),
    testsSagas(),
    questionsSagas(),
    answersSagas(),
  ]);
};

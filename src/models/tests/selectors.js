import { createSelector } from 'reselect';

export const testsSlector = createSelector(
  state => state.tests,
  tests => tests
);

export const infoSelector = createSelector(testsSlector, ({ info }) => info);

export const testsSelector = createSelector(testsSlector, ({ tests }) => tests);

export const loadingSelector = createSelector(
  testsSlector,
  ({ preLoading }) => preLoading
);

export const testsByIdSelector = createSelector(
  testsSlector,
  ({ testsById }) => testsById
);

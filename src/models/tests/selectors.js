import { createSelector } from 'reselect';

export const infoSelector = createSelector(
  state => state.tests.info,
  info => info
);

export const testsSelector = createSelector(
  state => state.tests.tests,
  tests => tests
);

export const loadingSelector = createSelector(
  state => state.tests.loading,
  loading => loading
);

export const testsByIdSelector = createSelector(
  state => state.tests.testsById,
  byId => byId
);

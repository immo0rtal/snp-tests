import { createSelector } from 'reselect';

export const queSelector = createSelector(
  state => state.questions,
  questions => questions
);

export const questionsSelector = createSelector(
  queSelector,
  ({ questions }) => questions
);

export const questionsLoadingSelector = createSelector(
  queSelector,
  ({ loader }) => loader
);

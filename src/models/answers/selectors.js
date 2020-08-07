import { createSelector } from 'reselect';

export const answersSelector = createSelector(
  state => state.answers.answers,
  answers => answers
);

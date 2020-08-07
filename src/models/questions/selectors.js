import { createSelector } from 'reselect';

export const questionsSelector = createSelector(
  state => state.questions.questions,
  questions => questions
);

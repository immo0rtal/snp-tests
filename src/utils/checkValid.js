export const checkValid = (queId, questions, answers) => {
  const que = questions[queId];
  const answersList = que.answers.map(idx => answers[idx]);
  const count = answersList.filter(el => el.is_right).length;

  if (que.question_type !== 'number') {
    if (answersList.length < 2) {
      return 'Question contains less than two answer';
    }
    if (count < 1) {
      return 'Question contains no correct answers';
    }
  }
  if (que.question_type === 'single' && count > 1) {
    return 'Question with type single must have one right answer';
  }
  if (que.question_type === 'multiple' && count < 2) {
    return 'Question with type multiple must contain at least two correct answers';
  }
  return null;
};

export const checkValidTest = (testId, tests, questions, answers) => {
  return tests[testId].questions.some(
    question => checkValid(question, questions, answers) === null
  );
};

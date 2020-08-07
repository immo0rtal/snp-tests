export const checkValid = (queId, questions, answers) => {
  const que = questions[queId];
  const answersList = que.answers.map(idx => answers[idx]);
  const count = answersList.filter(el => el.is_right).length;

  if (
    (que.question_type !== 'number' && (count < 1 || answersList.length < 2)) ||
    (que.question_type === 'single' && count > 1) ||
    (que.question_type === 'multiple' && count < 2)
  ) {
    return false;
  }
  return true;
};

export const checkValidTest = (testId, tests, questions, answers) => {
  return tests[testId].questions.some(question =>
    checkValid(question, questions, answers)
  );
};

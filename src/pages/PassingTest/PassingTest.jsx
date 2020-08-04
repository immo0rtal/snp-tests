import React from 'react';
import { useSelector } from 'react-redux';
import Question from './Question';
import PropTypes from 'prop-types';

const PassingTest = props => {
  const { id } = props.match.params;
  const tests = useSelector(state => state.tests.tests);
  const questions = useSelector(state => state.questions.questions);

  const questionsList = React.useMemo(() => {
    if (Object.values(tests).length > 0 && id) {
      return tests[id].questions.map(questionId => {
        if (questions[questionId].answers) {
        }
      });
    }
  }, [tests, id, questions]);

  return <div></div>;
};

PassingTest.propTypes = {
  match: PropTypes.any,
};

PassingTest.defaultProps = {
  match: {},
};

export default React.memo(PassingTest);

import React from 'react';
import style from './TestList.scss';
import { testsSelector, testsByIdSelector } from 'models/tests/selectors';
import { useSelector } from 'react-redux';
import Test from './Test';
import { checkValidTest } from 'utils/checkValid';
import { isAdminSelector } from 'models/authentication/selectors';
import { questionsSelector } from 'models/questions/selectors';
import { answersSelector } from 'models/answers/selectors';

const TestList = () => {
  const tests = useSelector(testsSelector);
  const testsById = useSelector(testsByIdSelector);
  const isAdmin = useSelector(isAdminSelector);
  const questions = useSelector(questionsSelector);
  const answers = useSelector(answersSelector);

  const _renderTests = React.useMemo(() => {
    if (tests && testsById) {
      return testsById.map(test => {
        if (
          !isAdmin &&
          (tests[test].questions.length < 1 ||
            !checkValidTest(test, tests, questions, answers))
        ) {
          return null;
        }
        return <Test data={tests[test]} key={tests[test].id} />;
      });
    }
    return null;
  }, [tests, testsById, isAdmin, questions, answers]);

  return <div className={style.list}>{_renderTests}</div>;
};

export default React.memo(TestList);

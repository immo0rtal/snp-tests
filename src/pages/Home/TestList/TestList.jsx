import React from 'react';
import style from './TestList.scss';
import { testsSelector } from 'models/tests/selectors';
import { useSelector } from 'react-redux';
import Test from './Test';

const TestList = () => {
  const tests = useSelector(testsSelector);
  const testsById = useSelector(state => state.tests.testsById);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const _renderTests = React.useMemo(() => {
    if (tests && testsById) {
      return testsById.map(test => {
        if (!isAdmin && tests[test].questions.length < 1) {
          return null;
        }
        return <Test data={tests[test]} key={tests[test].id} />;
      });
    }
    return null;
  }, [tests, testsById, isAdmin]);

  return <div className={style.list}>{_renderTests}</div>;
};

export default React.memo(TestList);

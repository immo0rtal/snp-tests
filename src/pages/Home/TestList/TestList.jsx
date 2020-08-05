import React from 'react';
import style from './TestList.scss';
import { testsSelector } from 'models/tests/selectors';
import { useSelector } from 'react-redux';
import Test from './Test';

const TestList = () => {
  const tests = useSelector(testsSelector);
  const testsById = useSelector(state => state.tests.testsById);

  const _renderTests = React.useMemo(() => {
    if (tests && testsById) {
      return testsById.map(test => (
        <Test data={tests[test]} key={tests[test].id} />
      ));
    }
    return null;
  }, [tests, testsById]);

  return <div className={style.list}>{_renderTests}</div>;
};

export default React.memo(TestList);

import React from 'react';
import style from './TestList.scss';
import { testsSelector } from 'models/tests/selectors';
import { useSelector } from 'react-redux';
import Test from './Test';

const TestList = () => {
  const tests = useSelector(testsSelector);

  const _renderTests = React.useMemo(() => {
    return Object.values(tests).map(test => <Test data={test} key={test.id} />);
  }, [tests]);

  return <div className={style.list}>{_renderTests}</div>;
};

export default React.memo(TestList);

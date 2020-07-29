import React from 'react';
import style from './Control.scss';
import { useDispatch } from 'react-redux';
import { createTest } from 'models/tests/slice';

const Control = () => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');

  const handleChangeInput = React.useCallback(event => {
    setText(event.target.value);
  }, []);

  const handleCreateTest = React.useCallback(() => {
    dispatch(createTest({ title: text }));
  }, [dispatch, text]);

  return (
    <div className={style.control}>
      <input
        className={style.create}
        onChange={handleChangeInput}
        value={text}
        type="text"
      />
      <button onClick={handleCreateTest}>Create Test</button>
    </div>
  );
};

export default Control;

import React from 'react';
import style from './Checkbox.scss';

const Checkbox = props => {
  const { disabled = false, checked = false } = props;

  return (
    <label className={style.check}>
      <input className={style.check__input} type="checkbox" />
      <span className={style.сheckbox}></span>
    </label>
  );
};

export default React.memo(Checkbox);

import React from 'react';
import style from './Radio.scss';

const Radio = () => {
  return (
    <label className={style.radio}>
      <input className={style.radio__input} type="radio" />
      <span className={style.radio_img}></span>
    </label>
  );
};

export default Radio;

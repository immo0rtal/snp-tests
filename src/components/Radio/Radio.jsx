import React from 'react';
import style from './Radio.scss';
import PropTypes from 'prop-types';

const Radio = props => {
  const { onChange, checked } = props;

  return (
    <label className={style.radio}>
      <input
        className={style.radio__input}
        checked={checked}
        onChange={onChange}
        type="radio"
      />
      <span className={style.radio_img} />
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default React.memo(Radio);

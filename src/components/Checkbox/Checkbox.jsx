import React from 'react';
import style from './Checkbox.scss';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const { disabled, checked, onChange } = props;

  return (
    <label className={style.check}>
      <input
        className={style.check__input}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <span className={style.сheckbox} />
    </label>
  );
};

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => {},
};

export default React.memo(Checkbox);

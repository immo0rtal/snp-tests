import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Answer.scss';

const Answer = props => {
  const answers = useSelector(state => state.answers.answers);

  return (
    <div className={style.answer}>
      {props.type === 'single' ? (
        <input type="radio" />
      ) : (
        <input type="checkbox" />
      )}
      <span className={style.text}>{answers[props.answer].text}</span>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.number,
  type: PropTypes.string,
};

Answer.defaultProps = {
  answer: null,
  type: 'single',
};

export default Answer;

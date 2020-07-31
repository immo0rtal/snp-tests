import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Answer.scss';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

const Answer = props => {
  const answers = useSelector(state => state.answers.answers);

  return (
    <div className={style.answer}>
      {props.type === 'single' ? <Radio /> : <Checkbox />}
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

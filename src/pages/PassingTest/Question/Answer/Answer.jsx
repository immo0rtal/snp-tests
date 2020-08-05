import React from 'react';
import { useSelector } from 'react-redux';
import Radio from 'components/Radio';
import Checkbox from 'components/Checkbox';
import style from './Answer.scss';
import PropTypes from 'prop-types';

const Answer = props => {
  const {
    answer,
    questionType,
    addAnswer,
    removeAnswer,
    checkRadio,
    radioCheck,
    addAnswerRadio,
  } = props;

  const answers = useSelector(state => state.answers.answers);
  const [value, setValue] = React.useState(false);

  const handleCheckboxChange = React.useCallback(() => {
    setValue(!value);
    if (!value) {
      addAnswer(answer);
    } else {
      removeAnswer(answer);
    }
  }, [value, addAnswer, removeAnswer, answer]);

  const handleRadioChange = React.useCallback(() => {
    checkRadio(answer);
    addAnswerRadio(answer);
  }, [checkRadio, answer, addAnswerRadio]);

  return (
    <div className={style.answer}>
      {questionType === 'single' ? (
        <Radio onChange={handleRadioChange} checked={radioCheck} />
      ) : (
        <Checkbox onChange={handleCheckboxChange} checked={value} />
      )}
      <span className={style.text}>{answers[answer].text}</span>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.number,
  questionType: PropTypes.string,
  addAnswer: PropTypes.func,
  removeAnswer: PropTypes.func,
  checkRadio: PropTypes.func,
  radioCheck: PropTypes.bool,
  addAnswerRadio: PropTypes.func,
};

Answer.defaultProps = {
  answer: null,
  questionType: null,
  addAnswer: () => {},
  removeAnswer: () => {},
  checkRadio: () => {},
  radioCheck: false,
  addAnswerRadio: () => {},
};

export default React.memo(Answer);

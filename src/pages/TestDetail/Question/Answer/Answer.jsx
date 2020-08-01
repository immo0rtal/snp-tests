import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Answer.scss';
import Checkbox from 'components/Checkbox';
import close from 'images/close.jpg';
import { deleteAnswer, changeAnswer } from 'models/answers/slice';

const Answer = props => {
  const { active, answer, questionId } = props;
  const answers = useSelector(state => state.answers.answers);
  const [check, setCheck] = React.useState(answers[answer].is_right);
  const dispatch = useDispatch();

  const handleDeleteAnswer = React.useCallback(() => {
    dispatch(deleteAnswer({ answerId: answer, questionId }));
  }, [dispatch, answer, questionId]);

  const handleCheckbocChange = React.useCallback(() => {
    setCheck(!check);
    dispatch(
      changeAnswer({ id: answer, check: !check, text: answers[answer].text })
    );
  }, [dispatch, check, answer, answers]);

  return (
    <div className={style.answer}>
      <Checkbox
        disabled={active}
        onChange={handleCheckbocChange}
        checked={check}
      />
      <span className={style.text}>{answers[answer].text}</span>
      <button className={style.close} onClick={handleDeleteAnswer}>
        <img className={style.close_img} src={close} alt="" />
      </button>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.number,
  active: PropTypes.bool,
  questionId: PropTypes.number,
};

Answer.defaultProps = {
  answer: null,
  active: false,
  questionId: null,
};

export default React.memo(Answer);

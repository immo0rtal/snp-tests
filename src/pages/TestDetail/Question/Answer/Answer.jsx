import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Answer.scss';
import Checkbox from 'components/Checkbox';
import close from 'images/close.jpg';
import { deleteAnswer, changeAnswer } from 'models/answers/slice';
import { useDrop, useDrag } from 'react-dnd';

const Answer = props => {
  const { active, answer, questionId, moveAnswer, index } = props;
  const answers = useSelector(state => state.answers.answers);
  const [check, setCheck] = React.useState(answers[answer].is_right);
  const [showEditTitle, setShoweEditTitle] = React.useState(false);
  const [answerTitle, setAnswerTitle] = React.useState(answers[answer].text);
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: questionId.toString(),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (active) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveAnswer(dragIndex, hoverIndex, answer);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: questionId.toString(), answer, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const handleDeleteAnswer = React.useCallback(() => {
    dispatch(deleteAnswer({ answerId: answer, questionId }));
  }, [dispatch, answer, questionId]);

  const handleCheckbocChange = React.useCallback(() => {
    setCheck(!check);
    dispatch(
      changeAnswer({ answer: { ...answers[answer], is_right: !check } })
    );
  }, [dispatch, check, answer, answers]);

  const handleEditQuestionTitle = React.useCallback(() => {
    if (!active) {
      setShoweEditTitle(!showEditTitle);
    }
  }, [showEditTitle, active]);

  const handleEditAnswerTitleChange = React.useCallback(
    event => setAnswerTitle(event.target.value),
    []
  );

  const handleEditAnswerTitleBlur = React.useCallback(() => {
    if (answerTitle) {
      dispatch(
        changeAnswer({
          answer: { ...answers[answer], text: answerTitle },
        })
      );
    }
    setShoweEditTitle(false);
  }, [dispatch, answerTitle, answers, answer]);

  const handleKeyInTitleInput = React.useCallback(
    event => {
      if (event.keyCode === 13) {
        handleEditAnswerTitleBlur();
      }
      if (event.keyCode === 27) {
        setShoweEditTitle(false);
      }
    },
    [handleEditAnswerTitleBlur]
  );

  return (
    <div className={style.answer} ref={ref} style={{ opacity }}>
      <Checkbox
        disabled={active}
        onChange={handleCheckbocChange}
        checked={check}
      />
      <span className={style.text} onDoubleClick={handleEditQuestionTitle}>
        {showEditTitle ? (
          <input
            value={answerTitle}
            onChange={handleEditAnswerTitleChange}
            onBlur={handleEditAnswerTitleBlur}
            onKeyDown={handleKeyInTitleInput}
            autoFocus
          />
        ) : (
          answers[answer].text
        )}
      </span>
      {!active && (
        <button className={style.close} onClick={handleDeleteAnswer}>
          <img className={style.close_img} src={close} alt="" />
        </button>
      )}
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.number,
  active: PropTypes.bool,
  questionId: PropTypes.number,
  moveAnswer: PropTypes.func,
  index: PropTypes.number,
};

Answer.defaultProps = {
  answer: null,
  active: false,
  questionId: null,
  moveAnswer: () => {},
  index: null,
};

export default React.memo(Answer);

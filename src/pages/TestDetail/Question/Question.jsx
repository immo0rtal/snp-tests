import React from 'react';
import style from './Question.scss';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Answer from './Answer';
import deleteIcon from 'images/delete.png';
import { deleteQuestion } from 'models/questions/slice';
import Modal from 'components/Modal';

const Question = props => {
  const { question, testId } = props;
  const questions = useSelector(state => state.questions.questions);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const _renderAnswers = React.useMemo(() => {
    return questions[question].answers.map(answer => (
      <Answer
        key={answer}
        answer={answer}
        type={questions[question].question_type}
      />
    ));
  }, [questions, question]);

  const handleQuestionDelete = React.useCallback(() => {
    dispatch(deleteQuestion({ questionId: question, testId }));
  }, [dispatch, question, testId]);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  return (
    <div>
      <div className={style.question}>
        <div className={style.title}>
          {questions[question].title}{' '}
          <span className={style.type}>
            {questions[question].question_type}
          </span>
          <button onClick={handleToggleModal} className={style.delete}>
            <img className={style.delete_img} src={deleteIcon} alt="delete" />
          </button>
        </div>
        <div className={style.answers}>
          {questions[question].question_type === 'number' ? (
            questions[question].answer
          ) : _renderAnswers.length > 0 ? (
            _renderAnswers
          ) : (
            <div className={style.warning}>no answers</div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal close={handleToggleModal}>
          <div>Are you sure ?</div>
          <button className={style.delete_modal} onClick={handleQuestionDelete}>
            Delete
          </button>
          <button className={style.cancel_modal} onClick={handleToggleModal}>
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.number,
  testId: PropTypes.string,
};

Question.defaultProps = {
  question: null,
  testId: null,
};

export default React.memo(Question);

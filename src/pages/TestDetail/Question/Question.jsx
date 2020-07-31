import React from 'react';
import style from './Question.scss';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Answer from './Answer';
import deleteIcon from 'images/delete.png';
import edit from 'images/edit.png';
import { deleteQuestion } from 'models/questions/slice';
import Modal from 'components/Modal';
import { createAnswer } from 'models/answers/slice';

const Question = props => {
  const { question, testId } = props;
  const questions = useSelector(state => state.questions.questions);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [answerTitle, setAnswerTitle] = React.useState('');

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

  const handleAnswerCreate = React.useCallback(() => {
    dispatch(
      createAnswer({
        id: question,
        data: { text: answerTitle, is_right: false },
      })
    );
  }, [dispatch, question, answerTitle]);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  const handleEditQuestion = React.useCallback(() => setEditMode(!editMode), [
    editMode,
  ]);

  const handleAnswerChangeInput = React.useCallback(
    event => setAnswerTitle(event.target.value),
    []
  );

  return (
    <div>
      <div className={style.question}>
        <div className={style.title}>
          {editMode ? (
            <input value={questions[question].title} />
          ) : (
            <>
              <span>{questions[question].title}</span>
              <span className={style.type}>
                {questions[question].question_type}
              </span>
            </>
          )}
          <button onClick={handleToggleModal} className={style.delete}>
            <img className={style.delete_img} src={deleteIcon} alt="delete" />
          </button>
          <button onClick={handleEditQuestion} className={style.edit}>
            <img className={style.edit_img} src={edit} alt="edit" />
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
          {editMode && (
            <>
              <input
                type="text"
                value={answerTitle}
                onChange={handleAnswerChangeInput}
                placeholder="answer"
              />
              <button onClick={handleAnswerCreate}>Create</button>
            </>
          )}
        </div>
      </div>
      {showModal && (
        <Modal close={handleToggleModal}>
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

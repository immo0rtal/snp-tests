import React from 'react';
import style from './Question.scss';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Answer from './Answer';
import deleteIcon from 'images/delete.png';
import edit from 'images/edit.png';
import { deleteQuestion, changePosition } from 'models/questions/slice';
import Modal from 'components/Modal';
import { createAnswer } from 'models/answers/slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import close from 'images/close.jpg';

const Question = props => {
  const { question, testId } = props;
  const questions = useSelector(state => state.questions.questions);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [answerTitle, setAnswerTitle] = React.useState('');
  const answers = useSelector(state => state.answers.answers);

  const checkValid = React.useCallback(
    queId => {
      const que = questions[queId];
      const ansersList = que.answers.map(idx => answers[idx]);
      const count = ansersList.filter(el => el.is_right).length;

      if (
        (que.question_type !== 'number' && count < 1) ||
        (que.question_type === 'single' && count > 1) ||
        (que.question_type === 'multiple' && count < 2)
      ) {
        return false;
      }
      return true;
    },
    [questions, answers]
  );

  const moveAnswer = React.useCallback(
    (dragIndex, hoverIndex, answerId) => {
      dispatch(
        changePosition({
          questionId: question,
          dragIndex,
          hoverIndex,
          answerId,
        })
      );
    },
    [dispatch, question]
  );

  const answersList = React.useMemo(() => {
    return questions[question].answers.map((answer, index) => (
      <Answer
        key={answer}
        answer={answer}
        index={index}
        type={questions[question].question_type}
        active={!editMode}
        questionId={question}
        moveAnswer={moveAnswer}
      />
    ));
  }, [questions, question, editMode, moveAnswer]);

  const _renderAnswers = React.useMemo(() => {
    if (questions[question].question_type === 'number') {
      return editMode ? (
        <input value={questions[question].answer} />
      ) : (
        questions[question].answer
      );
    }
    return answersList.length > 0 ? (
      answersList
    ) : (
      <div className={style.warning}>
        No answers. This question won`t appear during the test
      </div>
    );
  }, [questions, question, answersList, editMode]);

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
    setAnswerTitle('');
  }, [dispatch, question, answerTitle]);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  const handleEditQuestion = React.useCallback(() => {
    setEditMode(!editMode);
    if (!checkValid(question)) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [editMode, checkValid, question]);

  const handleAnswerChangeInput = React.useCallback(
    event => setAnswerTitle(event.target.value),
    []
  );

  return (
    <DndProvider backend={HTML5Backend}>
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
            {editMode ? (
              <img className={style.edit_img_close} src={close} alt="close" />
            ) : (
              <img className={style.edit_img} src={edit} alt="edit" />
            )}
          </button>
        </div>
        <div className={style.answers}>
          {_renderAnswers}
          {editMode && questions[question].question_type !== 'number' && (
            <div className={style.create_answer}>
              <input
                className={style.create_answer_input}
                type="text"
                value={answerTitle}
                onChange={handleAnswerChangeInput}
                placeholder="answer"
              />
              <button onClick={handleAnswerCreate}>Create</button>
            </div>
          )}
        </div>
        {showMessage && <div>this question is invalid</div>}
      </div>
      {showModal && (
        <Modal close={handleToggleModal}>
          <div className={style.modal_title}>
            Do u want to delete the question ?
          </div>
          <div className={style.modal_buttons}>
            <button
              className={style.modal_accept}
              onClick={handleQuestionDelete}
            >
              Delete
            </button>
            <button className={style.modal_cancel} onClick={handleToggleModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </DndProvider>
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

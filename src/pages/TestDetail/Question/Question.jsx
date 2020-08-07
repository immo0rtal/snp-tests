import React from 'react';
import style from './Question.scss';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Answer from './Answer';
import deleteIcon from 'images/delete.png';
import edit from 'images/edit.png';
import {
  deleteQuestion,
  changePosition,
  editQuestion,
} from 'models/questions/slice';
import Modal from 'components/Modal';
import { createAnswer } from 'models/answers/slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import close from 'images/close.jpg';
import { checkValid } from 'utils/checkValid';

const Question = props => {
  const { question, testId } = props;
  const questions = useSelector(state => state.questions.questions);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [answerTitle, setAnswerTitle] = React.useState('');
  const [questionTitle, setQuestionTitle] = React.useState(
    questions[question].title
  );
  const [showEditTitle, setShowEditTitle] = React.useState(false);
  const answers = useSelector(state => state.answers.answers);
  const ref = React.useRef(null);

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
        <div className={style.number_answer}>{questions[question].answer}</div>
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
    if (!checkValid(question, questions, answers)) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [editMode, question, answers, questions]);

  const handleAnswerChangeInput = React.useCallback(
    event => setAnswerTitle(event.target.value),
    []
  );

  const handleEditQuestionTitle = React.useCallback(() => {
    if (editMode) {
      setShowEditTitle(!showEditTitle);
    }
  }, [showEditTitle, editMode]);

  const handleEditQuestionTitleChange = React.useCallback(
    event => setQuestionTitle(event.target.value),
    []
  );

  const handleEditQuestionTitleBlur = React.useCallback(() => {
    if (questionTitle) {
      dispatch(
        editQuestion({
          question: { ...questions[question], title: questionTitle },
        })
      );
    }
    setShowEditTitle(false);
  }, [dispatch, questions, questionTitle, question]);

  const handleKeyInTitleInput = React.useCallback(
    event => {
      if (event.keyCode === 13) {
        handleEditQuestionTitleBlur();
      }
      if (event.keyCode === 27) {
        setShowEditTitle(false);
      }
    },
    [handleEditQuestionTitleBlur]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={style.question}
        ref={ref}
        style={{
          boxShadow: `${
            showMessage ? '0 0 10px tomato' : '0 0 10px rgba(0, 0, 0, 0.1)'
          }`,
        }}
      >
        <div className={style.title}>
          {showEditTitle ? (
            <input
              value={questionTitle}
              onChange={handleEditQuestionTitleChange}
              onBlur={handleEditQuestionTitleBlur}
              onKeyDown={handleKeyInTitleInput}
              type="text"
              autoFocus
            />
          ) : (
            <span onDoubleClick={handleEditQuestionTitle}>
              {questions[question].title}
            </span>
          )}
          <span className={style.type}>
            {questions[question].question_type}
          </span>
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
              <button
                className={style.create_button}
                onClick={handleAnswerCreate}
              >
                Create
              </button>
            </div>
          )}
        </div>
        {showMessage && (
          <div className={style.error}>
            This question won`t appear during the test
          </div>
        )}
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

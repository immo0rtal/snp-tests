import React from 'react';
import style from './TestDetail.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import arrow from 'images/arrow.jpg';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import Question from './Question';
import {
  loginSelector,
  dataSelector,
  isAdminSelector,
} from 'models/authentication/selectors';
import Dropdown from 'components/Dropdown';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createQuestion } from 'models/questions/slice';
import plus from 'images/plus.png';
import arrowUp from 'images/arrowUp.png';
import arrowDown from 'images/arrowDown.png';
import close from 'images/close.jpg';
import { editTest } from 'models/tests/slice';
import { testsSelector } from 'models/tests/selectors';

const TestDetail = props => {
  const login = useSelector(loginSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [createFormOpen, setCreateFormOpen] = React.useState(false);
  const scrollToBottomRef = React.useRef(null);
  const scrollToTopRef = React.useRef(null);
  const data = useSelector(dataSelector);
  const isAdmin = useSelector(isAdminSelector);
  const [editTitle, setEditTitle] = React.useState(false);
  const tests = useSelector(testsSelector);
  const [title, setTitle] = React.useState(tests[id] && tests[id].title);

  React.useEffect(() => {
    if (!login && !isAdmin) {
      history.push('/');
    }
  }, [history, login, isAdmin]);

  const handleEditTitle = React.useCallback(() => {
    if (title) {
      dispatch(editTest({ testId: id, title }));
    }
    setEditTitle(false);
  }, [dispatch, title, id]);

  const _renderQuestions = React.useMemo(() => {
    if (Object.values(tests).length > 0 && id) {
      return tests[id].questions.map(question => (
        <Question key={question} question={question} testId={id} />
      ));
    }
    return null;
  }, [tests, id]);

  const handleBack = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const handleCreateQuestion = React.useCallback(
    values => {
      dispatch(createQuestion({ data: values, id }));
      setCreateFormOpen(false);
    },
    [dispatch, id]
  );

  const handleKeyInTitleInput = React.useCallback(
    event => {
      if (event.keyCode === 13) {
        handleEditTitle();
      }
      if (event.keyCode === 27) {
        setEditTitle(false);
      }
    },
    [handleEditTitle]
  );

  const handleEditTestName = React.useCallback(() => {
    setEditTitle(!editTitle);
  }, [editTitle]);

  const scrollToBottom = React.useCallback(() => {
    scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [scrollToBottomRef]);

  const handleOpenCreateQuestion = React.useCallback(() => {
    setCreateFormOpen(!createFormOpen);
  }, [createFormOpen]);

  const scrollToTop = React.useCallback(() => {
    scrollToTopRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [scrollToTopRef]);

  const handleTitleInputChange = React.useCallback(event => {
    setTitle(event.target.value);
  }, []);

  return (
    <div>
      <Navbar>
        <div className={style.title}>
          <button onClick={handleBack} ref={scrollToTopRef}>
            <img className={style.arrow} src={arrow} alt="back" />
          </button>
          <h1 className={style.name_app}>TestsApp</h1>
          <div className={style.username}>{data.username}</div>
          <div className={style.user}>{data.is_admin ? 'admin' : 'user'}</div>
        </div>
      </Navbar>
      <div className={style.scroll}>
        <button className={style.up} onClick={scrollToTop}>
          <img className={style.arrow_img} src={arrowUp} alt="up" />
        </button>
        <button onClick={scrollToBottom}>
          <img className={style.arrow_img} src={arrowDown} alt="down" />
        </button>
      </div>
      <div className={style.test_title}>
        <div onDoubleClick={handleEditTestName}>
          {editTitle ? (
            <input
              className={style.edit_title}
              value={title}
              onChange={handleTitleInputChange}
              onBlur={handleEditTitle}
              onKeyDown={handleKeyInTitleInput}
              type="text"
              autoFocus
            />
          ) : (
            <div>{tests[id] && tests[id].title}</div>
          )}
        </div>
      </div>
      <div className={style.title_message}>doubleclick title to rename</div>
      {tests[id] && tests[id].questions ? (
        <div className={style.questions}>{_renderQuestions}</div>
      ) : (
        <div className={style.message}>no questions</div>
      )}
      <div ref={scrollToBottomRef}>
        {createFormOpen ? (
          <div className={style.create}>
            <button
              className={style.close_create}
              onClick={handleOpenCreateQuestion}
            >
              <img className={style.close_img} src={close} alt="close" />
            </button>
            <Formik
              initialValues={{
                title: '',
                question_type: 'single',
                answer: 0,
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required(),
                answer: Yup.number(),
              })}
              onSubmit={handleCreateQuestion}
            >
              {({ values, setFieldValue }) => (
                <Form className={style.form}>
                  <Field
                    className={style.input}
                    name="title"
                    placeholder="question"
                    type="text"
                  />
                  <Dropdown
                    questionType={values.question_type}
                    setFieldValue={setFieldValue}
                  />
                  {values.question_type === 'number' && (
                    <Field
                      className={style.answer}
                      name="answer"
                      placeholder="answer"
                      type="text"
                    />
                  )}
                  <button
                    className={style.create_question_button}
                    type="submit"
                  >
                    Create question
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className={style.add_wrapper}>
            <button onClick={handleOpenCreateQuestion} className={style.add}>
              <img className={style.plus} src={plus} alt="plus" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

TestDetail.propTypes = {
  match: PropTypes.any,
};

TestDetail.defaultProps = {
  match: {},
};

export default React.memo(TestDetail);

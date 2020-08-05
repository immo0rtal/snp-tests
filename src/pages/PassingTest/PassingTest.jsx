import React from 'react';
import { useSelector } from 'react-redux';
import Question from './Question';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import { useHistory } from 'react-router-dom';
import arrow from 'images/arrow.jpg';
import style from './PassingTest.scss';
import Modal from 'components/Modal';

const PassingTest = props => {
  const { id } = props.match.params;
  const tests = useSelector(state => state.tests.tests);
  const questions = useSelector(state => state.questions.questions);
  const answers = useSelector(state => state.answers.answers);
  const history = useHistory();
  const login = useSelector(state => state.auth.login);
  const [result, setResult] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  const checkValid = React.useCallback(
    queId => {
      const question = questions[queId];
      const ansersList = question.answers.map(idx => answers[idx]);
      const count = ansersList.filter(el => el.is_right).length;

      if (
        (question.question_type !== 'number' && count < 1) ||
        (question.question_type === 'single' && count > 1) ||
        (question.question_type === 'multiple' && count < 2)
      ) {
        return false;
      }
      return true;
    },
    [questions, answers]
  );

  const validQuestions = React.useMemo(() => {
    if (tests[id]) {
      return tests[id].questions.reduce((acc, que) => {
        if (checkValid(que)) {
          return [...acc, que];
        }
        return acc;
      }, []);
    }
    return null;
  }, [tests, id, checkValid]);

  React.useEffect(() => {
    if (tests[id])
      return setResult(
        validQuestions.reduce((acc, que) => {
          if (checkValid(que)) {
            return { ...acc, [que]: false };
          }
          return acc;
        }, {})
      );
    return null;
  }, [tests, id, validQuestions, checkValid]);

  const changeValue = React.useCallback(
    (queId, value) => setResult({ ...result, [queId]: value }),
    [result]
  );

  React.useEffect(() => {
    if (!login) {
      history.push('/');
    }
  }, [history, login]);

  const handleGoBack = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const questionsList = React.useMemo(() => {
    if (Object.values(tests).length > 0 && id && tests) {
      return validQuestions.map(questionId => {
        if (checkValid(questionId)) {
          return (
            <Question
              question={questionId}
              key={questionId}
              change={changeValue}
            />
          );
        }
        return null;
      });
    }
    return null;
  }, [tests, id, checkValid, changeValue, validQuestions]);

  const _renderResults = React.useMemo(() => {
    if (result) {
      return validQuestions.map((question, index) => (
        <div className={style.result_wrapper} key={question * 3}>
          <div>{index + 1}</div>
          <div className={style.answer_result}>
            {result[question] ? 'right' : 'wrong'}
          </div>
        </div>
      ));
    }
    return null;
  }, [validQuestions, result]);

  return (
    <div>
      <Navbar>
        <button onClick={handleGoBack}>
          <img className={style.back} src={arrow} alt="back" />
        </button>
        <button onClick={handleToggleModal}>Finish Test</button>
      </Navbar>
      <div className={style.test_title}>{tests[id] && tests[id].title}</div>
      <div className={style.wrapper}>{questionsList}</div>
      <div className={style.footer} />
      {showModal && (
        <Modal close={handleToggleModal}>
          {_renderResults}
          <button>go to test list</button>
        </Modal>
      )}
    </div>
  );
};

PassingTest.propTypes = {
  match: PropTypes.any,
};

PassingTest.defaultProps = {
  match: {},
};

export default React.memo(PassingTest);

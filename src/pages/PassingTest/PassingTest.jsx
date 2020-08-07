import React from 'react';
import { useSelector } from 'react-redux';
import Question from './Question';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import { useHistory } from 'react-router-dom';
import arrow from 'images/arrow.jpg';
import style from './PassingTest.scss';
import Modal from 'components/Modal';
import { checkValid } from 'utils/checkValid';

const PassingTest = props => {
  const { id } = props.match.params;
  const tests = useSelector(state => state.tests.tests);
  const questions = useSelector(state => state.questions.questions);
  const answers = useSelector(state => state.answers.answers);
  const history = useHistory();
  const login = useSelector(state => state.auth.login);
  const [result, setResult] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const data = useSelector(state => state.auth.data);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  const validQuestions = React.useMemo(() => {
    if (tests[id]) {
      return tests[id].questions.reduce((acc, que) => {
        if (checkValid(que, questions, answers)) {
          return [...acc, que];
        }
        return acc;
      }, []);
    }
    return null;
  }, [tests, id, questions, answers]);

  React.useEffect(() => {
    if (tests[id])
      return setResult(
        validQuestions.reduce((acc, que) => {
          return { ...acc, [que]: false };
        }, {})
      );
    return undefined;
  }, [tests, id, validQuestions]);

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
        return (
          <Question
            question={questionId}
            key={questionId}
            change={changeValue}
          />
        );
      });
    }
    return null;
  }, [tests, id, changeValue, validQuestions]);

  const handleGoToTestList = React.useCallback(() => {
    history.push('/');
  }, [history]);

  const _renderResults = React.useMemo(() => {
    if (result) {
      return validQuestions.map((question, index) => (
        <div className={style.result_wrapper} key={question * 3}>
          <div>{index + 1 + ')'}</div>
          <div className={style.answer_result}>
            {result[question] ? (
              <div className={style.right}>right</div>
            ) : (
              <div className={style.wrong}>wrong</div>
            )}
          </div>
        </div>
      ));
    }
    return null;
  }, [validQuestions, result]);

  return (
    <div>
      <Navbar>
        <div className={style.title}>
          <button onClick={handleGoBack}>
            <img className={style.back} src={arrow} alt="back" />
          </button>
          <h1 className={style.name_app}>TestsApp</h1>
          <div className={style.username}>{data.username}</div>
          <div className={style.user}>{data.is_admin ? 'admin' : 'user'}</div>
        </div>
        <button className={style.finish_test} onClick={handleToggleModal}>
          Finish Test
        </button>
      </Navbar>
      <div className={style.test_title}>{tests[id] && tests[id].title}</div>
      <div className={style.wrapper}>
        {tests[id] && tests[id].questions.length > 0 ? (
          questionsList
        ) : (
          <div className={style.no_questions}>Test is empty</div>
        )}
      </div>
      <div className={style.footer} />
      {showModal && (
        <Modal disable>
          <div className={style.modal_title}>Your results</div>
          <div className={style.modal_results}>{_renderResults}</div>
          <div className={style.modal_buttons}>
            <button className={style.modal_accept} onClick={handleGoToTestList}>
              go to test list
            </button>
          </div>
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

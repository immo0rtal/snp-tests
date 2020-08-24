import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import { useHistory } from 'react-router-dom';
import arrow from 'images/arrow.jpg';
import style from './PassingTest.scss';
import Modal from 'components/Modal';
import { checkValid } from 'utils/checkValid';
import {
  loginSelector,
  dataSelector,
  initialLoadingSelector,
} from 'models/authentication/selectors';
import { questionsSelector } from 'models/questions/selectors';
import { answersSelector } from 'models/answers/selectors';
import {
  testsSelector,
  infoSelector,
  loadingSelector,
} from 'models/tests/selectors';
import { getTests } from 'models/tests/slice';
import loader from 'images/loader.gif';
import loaderTests from 'images/loader2.gif';

const PassingTest = props => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const tests = useSelector(testsSelector);
  const questions = useSelector(questionsSelector);
  const answers = useSelector(answersSelector);
  const history = useHistory();
  const login = useSelector(loginSelector);
  const [result, setResult] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const data = useSelector(dataSelector);
  const info = useSelector(infoSelector);
  const initialLoading = useSelector(initialLoadingSelector);
  const loading = useSelector(loadingSelector);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  const validQuestions = React.useMemo(() => {
    if (tests[id]) {
      return tests[id].questions.reduce((acc, que) => {
        if (!checkValid(que, questions, answers)) {
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
      dispatch(getTests({ info }));
    }
  }, [history, login, info, dispatch]);

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
          <div>{index + 1}</div>
          <span>)</span>
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

  const _renderQuestions = React.useMemo(() => {
    if (tests[id] && tests[id].questions.length > 0) {
      if (validQuestions.length < 1) {
        return (
          <div className={style.no_questions}>
            Test don`t include valid questions. Users won`t see it
          </div>
        );
      }
      return questionsList;
    }
    return (
      <div className={style.no_questions}>
        Test is empty. Users won`t see it
      </div>
    );
  }, [tests, id, validQuestions, questionsList]);

  return (
    <>
      {initialLoading ? (
        <div className={style.loader}>
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <div>
          <Navbar>
            <div className={style.title}>
              <button onClick={handleGoBack}>
                <img className={style.back} src={arrow} alt="back" />
              </button>
              <h1 className={style.name_app}>TestsApp</h1>
              <div className={style.username}>{data.username}</div>
              <div className={style.user}>
                {data.is_admin ? 'admin' : 'user'}
              </div>
            </div>
            <button className={style.finish_test} onClick={handleToggleModal}>
              Finish Test
            </button>
          </Navbar>
          {loading ? (
            <div className={style.loader}>
              <img src={loaderTests} alt="Loading..." />
            </div>
          ) : (
            <>
              <div className={style.test_title}>
                {tests[id] && tests[id].title}
              </div>
              <div className={style.wrapper}>{_renderQuestions}</div>
              <div className={style.footer} />
            </>
          )}

          {showModal && (
            <Modal disable>
              <div className={style.modal_title}>Your results</div>
              <div className={style.modal_results}>{_renderResults}</div>
              <div className={style.modal_buttons}>
                <button
                  className={style.modal_accept}
                  onClick={handleGoToTestList}
                >
                  go to test list
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

PassingTest.propTypes = {
  match: PropTypes.any,
};

PassingTest.defaultProps = {
  match: {},
};

export default React.memo(PassingTest);

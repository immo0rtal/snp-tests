import React from 'react';
import style from './TestDetail.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import arrow from 'images/arrow.jpg';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import Question from './Question';
import { loginSelector } from 'models/authentication/selectors';
import Dropdown from 'components/Dropdown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createQuestion } from 'models/questions/slice';

const TestDetail = props => {
  const login = useSelector(loginSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = props.match.params;

  React.useEffect(() => {
    if (!login) {
      history.push('/');
    }
  }, [history, login]);

  const tests = useSelector(state => state.tests.tests);

  const _renderQuestions = React.useMemo(() => {
    if (Object.values(tests).length > 0 && id) {
      return tests[id].questions.map(question => (
        <Question key={question} question={question} testId={id} />
      ));
    }
    return '';
  }, [tests, id]);

  const handleBack = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const handleCreateQuestion = React.useCallback(
    values => {
      dispatch(createQuestion({ data: values, id }));
    },
    [dispatch, id]
  );

  return (
    <div>
      <Navbar>
        <button onClick={handleBack}>
          <img className={style.arrow} src={arrow} alt="back" />
        </button>
      </Navbar>
      <div className={style.create}>
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
              <ErrorMessage name="title" component="div" />
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
              <button type="submit">Create question</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={style.questions}>{_renderQuestions}</div>
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

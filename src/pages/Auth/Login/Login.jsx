import React from 'react';
import style from './Login.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, deleteError } from 'models/authentication/slice';
import { useHistory } from 'react-router-dom';
import { loginSelector, dataSelector } from 'models/authentication/selectors';

const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector(loginSelector);
  const history = useHistory();
  const data = useSelector(dataSelector);

  const handleSubmit = React.useCallback(
    values => {
      dispatch(loginUser({ data: values }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (login) {
      history.push('/');
      dispatch(deleteError());
    }
  }, [login, history, data, dispatch]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      })}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={style.form}>
          <Field
            className={`${style.input} ${style.username}`}
            type="username"
            name="username"
            placeholder="username"
          />
          <ErrorMessage name="username" component="div" />
          <Field
            className={`${style.input} ${style.password}`}
            type="password"
            name="password"
            placeholder="password"
          />
          <ErrorMessage name="password" component="div" />
          <button className={style.submit} type="submit">
            LOGIN
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(Login);

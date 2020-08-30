import React from 'react';
import style from './Register.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser, deleteError } from 'models/authentication/slice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import arrow from 'images/arrow.jpg';
import { useHistory } from 'react-router-dom';
import { loginSelector } from 'models/authentication/selectors';
import Checkbox from 'components/Checkbox';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Register = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(state => state.auth.registerError);
  const login = useSelector(loginSelector);

  const handleGoBack = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const handleCloseError = React.useCallback(() => {
    dispatch(deleteError());
  }, [dispatch]);

  React.useEffect(() => {
    if (login) {
      history.push('/');
      dispatch(deleteError());
    }
  }, [login, history, dispatch]);

  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Navbar>
        <div className={style.wrapper}>
          <button onClick={handleGoBack}>
            <img className={style.picture} src={arrow} alt="" />
          </button>
          <h1 className={style.title}>TestsApp</h1>
        </div>
      </Navbar>
      {error && (
        <div className={style.error}>
          {(error.username && error.username[0]) ||
            (error.password && error.password[0]) ||
            (error.password_confirmation && error.password_confirmation[0]) ||
            error.error}
          <button onClick={handleCloseError}>X</button>
        </div>
      )}
      <div className={style.signup_wrapper}>
        <h2 className={style.signup}>Sign up</h2>
      </div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          password_confirmation: '',
          is_admin: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(),
          password: Yup.string().required(),
          password_confirmation: Yup.string().required(),
          is_admin: Yup.bool().required(),
        })}
        onSubmit={values => {
          dispatch(registerUser({ data: values }));
        }}
      >
        {({ handleChange, values }) => (
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
            <Field
              className={`${style.input} ${style.password_confirmation}`}
              type="password"
              name="password_confirmation"
              placeholder="password_confirmation"
            />
            <ErrorMessage name="password_confirmation" component="div" />
            <div className={style.checkbox}>
              <Checkbox
                name="is_admin"
                onChange={handleChange}
                checked={values.is_admin}
              />
              <div className={style.text}>Admin roots</div>
            </div>
            <button className={style.submit} type="submit">
              REGISTER
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

Register.propTypes = {
  title: PropTypes.string,
};

Register.defaultProps = {
  title: 'React App',
};

export default React.memo(Register);

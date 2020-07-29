import React from 'react';
import style from './Register.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from 'models/authentication/slice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();

  return (
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
          <Field
            className={`${style.input} ${style.password_confirmation}`}
            type="password"
            name="password_confirmation"
            placeholder="password_confirmation"
          />
          <ErrorMessage name="password_confirmation" component="div" />
          <label htmlFor="admin">
            <Field
              className={style.is_admin}
              type="checkbox"
              name="is_admin"
              id="admin"
            />
            Are you admin
          </label>
          <ErrorMessage name="is_admin" component="div" />
          <button className={style.submit} type="submit">
            REGISTER
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;

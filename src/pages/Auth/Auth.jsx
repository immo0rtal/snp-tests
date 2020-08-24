import React from 'react';
import style from './Auth.scss';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { deleteError } from 'models/authentication/slice';
import { errorSelector } from 'models/authentication/selectors';
import Navbar from 'components/Navbar';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Auth = props => {
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCloseError = React.useCallback(() => {
    dispatch(deleteError());
  }, [dispatch]);

  const handleRegirect = React.useCallback(() => {
    history.push('/auth/register');
  }, [history]);

  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Navbar>
        <h1 className={style.title}>TestsApp</h1>
        <div className={style.register}>
          <div className={style.text}>First time on this site?</div>
          <button onClick={handleRegirect} className={style.logout}>
            CREATE ACCOUNT
          </button>
        </div>
      </Navbar>
      {error && (
        <div className={style.error}>
          {error.error}
          <button onClick={handleCloseError}>X</button>
        </div>
      )}
      <div className={style.content}>
        <div className={style.auth}>
          <div className={style.signin_wrapper}>
            <h2 className={style.signin}>Sign in</h2>
          </div>
          <Login />
        </div>
      </div>
    </>
  );
};

Auth.propTypes = {
  title: PropTypes.string,
};

Auth.defaultProps = {
  title: 'React App',
};

export default React.memo(Auth);

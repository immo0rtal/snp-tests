import React from 'react';
import style from './Auth.scss';
import Login from './Login';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { deleteError } from 'models/authentication/slice';

const Auth = () => {
  const error = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();

  const handleCloseError = React.useCallback(() => {
    dispatch(deleteError());
  }, [dispatch]);

  return (
    <>
      <Navbar />
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

export default React.memo(Auth);

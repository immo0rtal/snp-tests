import React from 'react';
import style from './Auth.scss';
import Login from './Login';
import User from './User';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { usersSelector } from 'models/authentication/selectors';

const Auth = () => {
  const users = useSelector(usersSelector);

  return (
    <>
      <Navbar />
      <div className={style.content}>
        <div className={style.auth}>
          <div className={style.signin_wrapper}>
            <h2 className={style.signin}>Sign in</h2>
          </div>
          <Login />
          <div className={style.users_wrapper}>
            <div className={style.users_title}>
              <h2 className={style.title}>Users</h2>
            </div>
            <div className={style.users}>
              {users ? (
                <User username={users.username} />
              ) : (
                <p className={style.text}>Here will save users</p>
              )}
            </div>
          </div>
          {/* <div className={style.signup_wrapper}>
            <h2 className={style.signin}>Sign up</h2>
          </div>
          <Register /> */}
        </div>
      </div>
      <div className={style.footer}>frontend junior task</div>
    </>
  );
};

export default React.memo(Auth);

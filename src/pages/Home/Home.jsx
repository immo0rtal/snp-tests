import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import {
  checkCurrentUser,
  setInitialLoading,
  logoutUser,
} from 'models/authentication/slice';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { infoSelector } from 'models/tests/selectors';
import {
  loginSelector,
  initialLoadingSelector,
  dataSelector,
} from 'models/authentication/selectors';
import loader from 'images/loader.gif';
import style from './Home.scss';
import TestList from './TestList';
import { getTests, changeSearchField } from 'models/tests/slice';

const Home = () => {
  const dispatch = useDispatch();
  const login = useSelector(loginSelector);
  const initialLoading = useSelector(initialLoadingSelector);
  const data = useSelector(dataSelector);
  const info = useSelector(infoSelector);
  const history = useHistory();

  const handleLogout = React.useCallback(() => {
    dispatch(logoutUser());
    history.push('/');
  }, [dispatch, history]);

  const handleCreateTest = React.useCallback(() => {}, []);

  React.useEffect(() => {
    if (login) {
      dispatch(getTests({ info }));
    }
  }, [dispatch, info, login]);

  React.useEffect(() => {
    if (!login && initialLoading) {
      dispatch(checkCurrentUser());
    } else {
      dispatch(setInitialLoading({ value: false }));
    }
  }, [dispatch, login, initialLoading]);

  React.useEffect(() => {
    if (!login && !initialLoading) {
      history.push('/auth');
      dispatch(setInitialLoading({ value: true }));
    }
  }, [dispatch, history, login, initialLoading, data]);

  const handleInputChange = React.useCallback(
    event => {
      const { value } = event.target;
      if (value) {
        history.push(`/?search=${value}`);
      } else {
        history.push(`/`);
      }
      dispatch(changeSearchField({ value }));
    },
    [dispatch, history]
  );

  return (
    <>
      {initialLoading ? (
        <div className={style.loader}>
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <Fragment>
          <Navbar>
            <div className={style.info}>
              <h1 className={style.title}>TestsApp</h1>
              <div className={style.username}>{data.username}</div>
              <div className={style.user}>
                {' '}
                {data.is_admin ? 'admin' : 'user'}
              </div>
            </div>
            <div className={style.wrapper}>
              <input
                onChange={handleInputChange}
                className={style.search}
                type="text"
              />
            </div>
            <div>
              <button onClick={handleCreateTest} className={style.create}>
                Create Test
              </button>
              <button onClick={handleLogout} className={style.logout}>
                Logout
              </button>
            </div>
          </Navbar>
          <TestList />
        </Fragment>
      )}
    </>
  );
};

export default React.memo(Home);

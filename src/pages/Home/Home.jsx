import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import {
  checkCurrentUser,
  setInitialLoading,
  logoutUser,
} from 'models/authentication/slice';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { infoSelector, testsByIdSelector } from 'models/tests/selectors';
import {
  loginSelector,
  initialLoadingSelector,
  dataSelector,
  isAdminSelector,
} from 'models/authentication/selectors';
import loader from 'images/loader.gif';
import style from './Home.scss';
import TestList from './TestList';
import { getTests, changeSearchField, createTest } from 'models/tests/slice';
import Modal from 'components/Modal';
import Pagination from 'components/Pagination';
import { useDebounce } from 'hooks/useDebounce';

const Home = () => {
  const dispatch = useDispatch();
  const login = useSelector(loginSelector);
  const initialLoading = useSelector(initialLoadingSelector);
  const data = useSelector(dataSelector);
  const info = useSelector(infoSelector);
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);
  const [text, setText] = React.useState('');
  const infoDebounce = useDebounce(info, 400);
  const isAdmin = useSelector(isAdminSelector);
  const testsById = useSelector(testsByIdSelector);

  const handleLogout = React.useCallback(() => {
    dispatch(logoutUser());
    history.push('/');
  }, [dispatch, history]);

  const handleToggleModal = React.useCallback(() => setOpenModal(!openModal), [
    openModal,
  ]);

  React.useEffect(() => {
    if (login && infoDebounce.search !== '') {
      dispatch(getTests({ info: infoDebounce }));
    }
    if (infoDebounce.search === '') {
      dispatch(changeSearchField({ value: null }));
    }
  }, [dispatch, login, infoDebounce]);

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

  const handleCreateTest = React.useCallback(() => {
    if (text !== '') {
      dispatch(createTest({ title: text }));
      handleToggleModal();
    }
  }, [dispatch, text, handleToggleModal]);

  const handleCreateTestInput = React.useCallback(
    event => setText(event.target.value),
    []
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
                {data.is_admin ? 'admin' : 'user'}
              </div>
            </div>
            <div className={style.wrapper}>
              <input
                onChange={handleInputChange}
                className={style.search}
                type="text"
                placeholder="Search"
              />
            </div>
            <div className={style.header_buttons}>
              {isAdmin && (
                <button onClick={handleToggleModal} className={style.create}>
                  Create Test
                </button>
              )}
              <button onClick={handleLogout} className={style.logout}>
                Logout
              </button>
            </div>
          </Navbar>
          <TestList />
          {testsById.length > 0 ? (
            <Pagination />
          ) : (
            <div className={style.message}>no tests</div>
          )}
          {openModal && (
            <Modal close={handleToggleModal}>
              <div className={style.modal_title}>Chose test name</div>
              <input
                className={style.modal_input}
                onChange={handleCreateTestInput}
                value={text}
                type="text"
                placeholder="enter test name"
              />
              <div className={style.buttons}>
                <button
                  className={style.modal_accept}
                  onClick={handleCreateTest}
                >
                  Create
                </button>
                <button
                  className={style.modal_cancel}
                  onClick={handleToggleModal}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}
        </Fragment>
      )}
    </>
  );
};

export default React.memo(Home);

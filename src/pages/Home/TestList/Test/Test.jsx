import React from 'react';
import style from './Test.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import edit from 'images/edit.png';
import deleteIcon from 'images/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTest, getTests } from 'models/tests/slice';
import Modal from 'components/Modal';

const Test = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, title, created_at } = props.data;
  const [showModal, setShowModal] = React.useState(false);
  const [showOpenTestModal, setShowOpenTestModal] = React.useState(false);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const info = useSelector(state => state.tests.info);
  const tetsByid = useSelector(state => state.tests.testsById);

  const handleEdit = React.useCallback(() => {
    history.push(`/test/${id}`);
  }, [history, id]);

  const handleDelete = React.useCallback(() => {
    dispatch(deleteTest({ id }));
    setShowModal(false);
    if (tetsByid.length > 6) {
      dispatch(getTests({ info }));
    }
  }, [dispatch, id, info, tetsByid]);

  const handleToggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  const handleOpenTest = React.useCallback(
    () => setShowOpenTestModal(!showOpenTestModal),
    [showOpenTestModal]
  );

  const handleRedirectToTest = React.useCallback(() => {
    history.push(`/passing-test/${id}`);
  }, [history, id]);

  return (
    <div className={style.wrapper}>
      <div className={style.test} onClick={handleOpenTest}>
        <div className={style.title}>
          <div>{title}</div>
          <div className={style.date}>
            {new Date(created_at).toLocaleDateString('ru-RU')}
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className={style.buttons}>
          <button className={style.edit_button} onClick={handleEdit}>
            <img className={style.edit} src={edit} alt="edit" />
          </button>
          <button className={style.delete_button} onClick={handleToggleModal}>
            <img className={style.delete} src={deleteIcon} alt="delete" />
          </button>
        </div>
      )}
      {showModal && (
        <Modal close={handleToggleModal}>
          <button className={style.delete_modal} onClick={handleDelete}>
            Delete
          </button>
          <button className={style.cancel_modal} onClick={handleToggleModal}>
            Cancel
          </button>
        </Modal>
      )}
      {showOpenTestModal && (
        <Modal close={handleOpenTest}>
          do u want to start the test ?
          <button className={style.open_modal} onClick={handleRedirectToTest}>
            Yes
          </button>
          <button className={style.cancel_modal} onClick={handleOpenTest}>
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

Test.propTypes = {
  data: PropTypes.object,
};

Test.defaultProps = {
  data: 'title',
};
export default React.memo(Test);

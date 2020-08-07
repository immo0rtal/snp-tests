import React from 'react';
import style from './Test.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import edit from 'images/edit.png';
import deleteIcon from 'images/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTest } from 'models/tests/slice';
import Modal from 'components/Modal';
import { isAdminSelector } from 'models/authentication/selectors';
import { infoSelector, testsByIdSelector } from 'models/tests/selectors';

const Test = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, title, created_at: createdAt } = props.data;
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showOpenTestModal, setShowOpenTestModal] = React.useState(false);
  const isAdmin = useSelector(isAdminSelector);
  const info = useSelector(infoSelector);
  const testsById = useSelector(testsByIdSelector);

  const handleEdit = React.useCallback(() => {
    history.push(`/test/${id}`);
  }, [history, id]);

  const handleDelete = React.useCallback(() => {
    dispatch(deleteTest({ id, length: testsById.length, info }));
    setShowDeleteModal(false);
  }, [dispatch, id, info, testsById]);

  const handleDeleteModal = React.useCallback(
    () => setShowDeleteModal(!showDeleteModal),
    [showDeleteModal]
  );

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
            {new Date(createdAt).toLocaleDateString('ru-RU')}
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className={style.buttons}>
          <button className={style.edit_button} onClick={handleEdit}>
            <img className={style.edit} src={edit} alt="edit" />
          </button>
          <button className={style.delete_button} onClick={handleDeleteModal}>
            <img className={style.delete} src={deleteIcon} alt="delete" />
          </button>
        </div>
      )}
      {showDeleteModal && (
        <Modal close={handleDeleteModal}>
          <div className={style.modal_title}>Do u want to delete test</div>
          <div className={style.modal_buttons}>
            <button className={style.modal_accept} onClick={handleDelete}>
              Delete
            </button>
            <button className={style.modal_cancel} onClick={handleDeleteModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {showOpenTestModal && (
        <Modal close={handleOpenTest}>
          <div className={style.modal_title}>Do u want to start the test ?</div>
          <div className={style.modal_buttons}>
            <button
              className={style.modal_accept}
              onClick={handleRedirectToTest}
            >
              Yes
            </button>
            <button className={style.modal_cancel} onClick={handleOpenTest}>
              Cancel
            </button>
          </div>
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

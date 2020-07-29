import React from 'react';
import style from './Test.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import edit from 'images/edit.png';
import deleteIcon from 'images/delete.png';
import { useDispatch } from 'react-redux';
import { deleteTest } from 'models/tests/slice';

const Test = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, title } = props.data;

  const handleEdit = React.useCallback(() => {
    history.push(`/test/edit/${id}`);
  }, [history, id]);

  const handleDelete = React.useCallback(() => {
    dispatch(deleteTest({ id }));
  }, [dispatch, id]);

  return (
    <div className={style.test}>
      <div>{title}</div>
      <div className={style.buttons}>
        <button className={style.edit_button} onClick={handleEdit}>
          <img className={style.edit} src={edit} alt="edit" />
        </button>
        <button className={style.delete_button} onClick={handleDelete}>
          <img className={style.delete} src={deleteIcon} alt="delete" />
        </button>
      </div>
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

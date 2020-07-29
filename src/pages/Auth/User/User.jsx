import React from 'react';
import style from './User.scss';
import userAvatar from 'images/userAvatar.jpg';
import PropTypes from 'prop-types';

const User = props => {
  const handleClearLocalStorage = React.useCallback(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={style.user}>
      <img className={style.avatar} src={userAvatar} alt="avatar" />
      <div className={style.text}>{props.username}</div>
      <button onClick={handleClearLocalStorage}>delete</button>
    </div>
  );
};

User.propTypes = {
  username: PropTypes.string,
};

User.defaultProps = {
  username: 'username',
};

export default React.memo(User);

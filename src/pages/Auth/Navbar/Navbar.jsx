import React from 'react';
import style from './Navbar.scss';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const handleRegirect = React.useCallback(() => {
    history.push('/auth/register');
  }, [history]);

  return (
    <div className={style.header}>
      <h1 className={style.title}>TestsApp</h1>
      <div className={style.register}>
        <div className={style.text}>First time on this site?</div>
        <button onClick={handleRegirect} className={style.logout}>
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import style from './Navbar.scss';
import PropTypes from 'prop-types';

const Navbar = ({ children }) => {
  return <div className={style.header}>{children}</div>;
};

Navbar.propTypes = {
  children: PropTypes.node,
};

Navbar.defaultProps = {
  children: 'component',
};

export default React.memo(Navbar);

import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.scss';
import closeIcon from 'images/close.jpg';

const Modal = props => {
  const { close, children, disable } = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleKeyDown = event => {
      if (!disable && event.keyCode === 27) {
        close();
      }
    };

    const handleClickOutside = event => {
      if (!disable && ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close, ref, disable]);

  return createPortal(
    <div className={style.wrapper}>
      <div className={style.modal} ref={ref}>
        {!disable && (
          <button onClick={close}>
            <img className={style.close_button} src={closeIcon} alt="close" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node,
  disable: PropTypes.bool,
};

Modal.defaultProps = {
  close: () => {},
  children: '',
  disable: false,
};

export default React.memo(Modal);

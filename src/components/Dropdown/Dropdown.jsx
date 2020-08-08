import React from 'react';
import style from './Dropdown.scss';
import PropTypes from 'prop-types';

const Dropdown = props => {
  const { questionType, setFieldValue } = props;
  const [open, setOpen] = React.useState(false);
  const types = [
    { id: 1, title: 'single' },
    { id: 2, title: 'multiple' },
    { id: 3, title: 'number' },
  ];
  const [value, setValue] = React.useState(questionType);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleOnClick = React.useCallback(
    event => {
      setValue(event.target.dataset.type);
      setFieldValue('question_type', event.target.dataset.type);
      setOpen(false);
    },
    [setFieldValue]
  );

  const handleClick = React.useCallback(() => setOpen(!open), [open, setOpen]);

  return (
    <>
      <div className={style.wrapper} ref={ref}>
        <div className="dd-header">
          <div className={style.title} onClick={handleClick}>
            {value}
          </div>
        </div>
        <ul className={style.list}>
          {open &&
            types.map(type => (
              <li
                data-type={type.title}
                onClick={handleOnClick}
                key={type.id}
                className={style.item}
              >
                {type.title}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

Dropdown.propTypes = {
  questionType: PropTypes.string,
  setFieldValue: PropTypes.func,
};

Dropdown.defaultProps = {
  questionType: 'single',
  setFieldValue: () => {},
};

export default Dropdown;

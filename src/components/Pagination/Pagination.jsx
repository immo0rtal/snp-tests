import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changeDateFilter } from 'models/tests/slice';
import style from './Pagination.scss';
import rightArrow from 'images/rightArrow.png';
import leftArrow from 'images/leftArrow.png';
import arrowUp from 'images/arrowUp.png';
import arrowDown from 'images/arrowDown.png';

const Pagination = () => {
  const info = useSelector(state => state.tests.info);
  const meta = useSelector(state => state.tests.meta);
  const [testsPage, setTestsPage] = React.useState(info.page);
  const dispatch = useDispatch();
  const [arrowDirection, setArrowDirection] = React.useState(false);

  const handleChangePage = React.useCallback(
    event => {
      let page = testsPage;
      if (event.target.parentNode.dataset.direction === 'left') {
        page -= 1;
      } else {
        page += 1;
      }
      setTestsPage(page);
      dispatch(changePage({ page }));
    },
    [testsPage, dispatch]
  );

  const handleChangeDateFilter = React.useCallback(() => {
    dispatch(changeDateFilter());
    setArrowDirection(!arrowDirection);
  }, [dispatch, arrowDirection]);

  return (
    <div className={style.wrapper}>
      <button className={style.button} onClick={handleChangeDateFilter}>
        <div className={style.button_img}>
          <img
            className={style.up_arrow}
            src={arrowDirection ? arrowDown : arrowUp}
            alt="up"
          />
          <div className={style.date_text}>date</div>
        </div>
      </button>
      <div className={style.pagination}>
        <button
          data-direction="left"
          onClick={handleChangePage}
          disabled={testsPage === 1}
        >
          <img className={style.left_arrow} src={leftArrow} alt="left" />
        </button>
        <div className={style.page}>{testsPage}</div>
        <button
          data-direction="right"
          onClick={handleChangePage}
          disabled={testsPage === meta.total_pages}
        >
          <img className={style.right_arrow} src={rightArrow} alt="right" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);

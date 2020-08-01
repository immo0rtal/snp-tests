import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from 'models/tests/slice';
import style from './Pagination.scss';

const Pagination = () => {
  const info = useSelector(state => state.tests.info);
  const meta = useSelector(state => state.tests.meta);
  const [testsPage, setTestsPage] = React.useState(info.page);
  const dispatch = useDispatch();

  const handleChangePage = React.useCallback(
    event => {
      let page = testsPage;
      if (event.target.dataset.direction === 'left') {
        page -= 1;
      } else {
        page += 1;
      }
      setTestsPage(page);
      dispatch(changePage({ page }));
    },
    [testsPage, dispatch]
  );

  return (
    <div className={style.pagination}>
      <button
        data-direction="left"
        onClick={handleChangePage}
        disabled={testsPage === 1}
      >
        left
      </button>
      {testsPage}
      <button
        data-direction="right"
        onClick={handleChangePage}
        disabled={testsPage === meta.total_pages}
      >
        right
      </button>
    </div>
  );
};

export default React.memo(Pagination);

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import config from 'config';

import AppRouter from 'components/AppRouter';
import 'styles/normalize.scss';
import styles from './App.scss';
import useBrowser from 'hooks/useBrowser';

const App = ({ routes }) => {
  const browser = useBrowser();

  if (RUNTIME_ENV === 'client') {
    console.info('browser', browser);
  }

  return (
    <div className={styles.app}>
      <Helmet {...config.app} />
      <AppRouter routes={routes} />
    </div>
  );
};

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default React.memo(App);

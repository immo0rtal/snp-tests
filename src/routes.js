import Home from 'pages/Home';
import Auth from 'pages/Auth';
import TestDetail from 'pages/TestDetail';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    component: Home,
    title: 'Home',
  },
  {
    path: '/auth',
    exact: true,
    cache: false,
    component: Auth,
    title: 'Auth',
  },
  {
    path: '/test/edit/:id',
    exact: true,
    cache: false,
    component: TestDetail,
    title: 'TestDetail',
  },
];

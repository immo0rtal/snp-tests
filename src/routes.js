import Home from 'pages/Home';
import Auth from 'pages/Auth';
import TestDetail from 'pages/TestDetail';
import PassingTest from 'pages/PassingTest';
import Register from 'pages/Register';

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
    path: '/test/:id',
    exact: true,
    cache: false,
    component: TestDetail,
    title: 'Edit Test',
  },
  {
    path: '/passing-test/:id',
    exact: true,
    cache: false,
    component: PassingTest,
    title: 'Passing Test',
  },
  {
    path: '/auth/register',
    exact: true,
    cache: false,
    component: Register,
    title: 'Register',
  },
];

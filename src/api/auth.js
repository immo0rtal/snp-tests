import Req from './request';

export const fetchUserRegister = data =>
  Req.POST({
    url: '/signup',
    data,
  });

export const fetchUserLogin = data =>
  Req.POST({
    url: '/signin',
    data,
  });

export const fetchCurrentUser = () =>
  Req.GET({
    url: '/users/current',
  });

export const fetchLogoutUser = () =>
  Req.DELETE({
    url: '/logout',
  });

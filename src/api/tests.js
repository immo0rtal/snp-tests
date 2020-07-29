import Req from './request';

export const fetchTests = data =>
  Req.GET({
    url: '/tests',
    data,
  });

export const postTest = data =>
  Req.POST({
    url: '/tests',
    data,
  });

export const removeTest = data =>
  Req.DELETE({
    url: `/tests/${data.id}`,
    data,
  });

export const patchTest = data =>
  Req.PATCH({
    url: `/tests/${data.id}`,
    data,
  });

export const postQuestion = (data, id) =>
  Req.POST({
    url: `/tests/${id}/questions`,
    data,
  });

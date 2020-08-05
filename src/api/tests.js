import Req from './request';

export const fetchTests = data =>
  Req.GET({
    url: `/tests?page=${data.page}&per=${data.per}&sort=${
      data.sort
    }&search=${data.search || ''}`,
    data,
  });

export const postTest = data =>
  Req.POST({
    url: '/tests',
    data,
  });

export const removeTest = id =>
  Req.DELETE({
    url: `/tests/${id}`,
    id,
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

export const removeQuestion = id =>
  Req.DELETE({
    url: `/questions/${id}`,
    id,
  });

export const postAnswer = (data, id) =>
  Req.POST({
    url: `/questions/${id}/answers`,
    data,
  });

export const removeAnswer = id =>
  Req.DELETE({
    url: `/answers/${id}`,
    id,
  });

export const patchAnswer = data =>
  Req.PATCH({
    url: `/answers/${data.id}`,
    data,
  });

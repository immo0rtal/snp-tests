import axios from 'axios';
import config from 'config';

axios.defaults.withCredentials = true;

const BASE_URL = 'https://snp-tests.herokuapp.com/api/v1/';
const STUB_DELAY = 1000;
const METHODS = ['GET', 'DELETE', 'HEAD', 'POST', 'PUT', 'PATCH'];

const sidedRequest = opts => {
  const { ownHeaders, ...restOpts } = opts;

  const headers = {
    'scope-key': 'fq%A%M3u6Ds>~`SBY7Eu',
    'Content-Type': 'application/json',
    ...ownHeaders,
  };

  if (RUNTIME_ENV === 'client') {
    return axios({ baseURL: BASE_URL, headers, ...restOpts });
  }

  return axios({ baseURL: config.remoteApiUrl, ...opts });
};

export const externalRequest = (externalUrl, opts) =>
  axios({ url: externalUrl, ...opts });

const stubRequest = opts => {
  const { stubData, stubDelay = STUB_DELAY } = opts;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: stubData });
    }, stubDelay);
  });
};

const doRequest = opts => {
  if (opts.stubData) {
    return stubRequest(opts);
  }

  return sidedRequest(opts);
};

const request = METHODS.reduce((req, method) => {
  req[method] = opts => doRequest({ ...opts, method });
  return req;
}, {});

export default request;

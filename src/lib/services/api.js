import { browser } from '$app/environment';

import notify from '$lib/services/notify';
import config from '$lib/config';

const apiUrl = config.apiDomain;

const serialize = (obj) => {
  if (!obj) {
    return '';
  }

  if (obj._response) {
    delete obj._response;
  }

  const str = [];

  Object.keys(obj).forEach((key) => {
    const value = typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : obj[key];
    str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });

  return str.join('&');
};

class ValidationError extends Error {
  constructor({ message, data, status }) {
    super(message);
    this.name = 'ValidationError'; // (2)
    this.data = data;
    this.status = status;
  }
}

const ftch = async (method, url, params, options = {}) => {
  let res;

  const absoluteUrl = url.startsWith('http') ? url : `${apiUrl}/${url}`;

  let body = null;
  let headers = {};
  headers['Content-Type'] = 'application/json';

  if (method !== 'get') {
    if (params instanceof FormData) {
      body = params;
      delete headers['Content-Type'];
    } else {
      body = JSON.stringify(params);
    }
  }

  try {
    res = await fetch(`${absoluteUrl}${method === 'get' ? `?${serialize(params)}` : ''}`, {
      method,
      body,
      credentials: 'include',
      mode: 'cors',
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {})
      }
    });
  } catch (err) {
    console.log('error GET', err);
  }

  if (res.ok || res.status === 302) {
    const data = await res.json();

    if (options?.includeResponse) {
      data._response = {
        status: res.status
      };
    }

    return data;
  } else {
    const data = await res.json();
    notify('Error ' + JSON.stringify(data, null, 2));

    throw new ValidationError({ message: `Could not load ${url}`, data, status: res.status });
  }
};

export const get = async (url, params, options) => {
  return ftch('get', url, params, options);
};

export const post = async (url, params, options) => {
  return ftch('post', url, params, options);
};

export const put = async (url, params, options) => {
  return ftch('put', url, params, options);
};

export const del = async (url, params, options) => {
  return ftch('delete', url, params, options);
};

export const postFile = (url, file, params = {}, options = {}) => {
  const body = new FormData();

  body.append('file', file, file.name);

  Object.keys(params).forEach((paramName) => {
    body.append(paramName, params[paramName]);
  });

  return ftch('post', url, body, options);
};

export default {
  get,
  post,
  postFile,
  put,
  del
};

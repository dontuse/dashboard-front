import b from 'bem-cn';
import axios, {CancelToken} from 'axios';
import {CANCEL} from 'redux-saga';

export const api = axios.create({baseURL: '/api/v1/'});

b.setup({el: '-'});

export const block = b;

export function handleChange(e) {
  const value = e.target.value;
  if (!e.target.id) {
    throw new Error('no target id');
  }
  this.setState({[e.target.id]: value});
}

export function handleBlur(e) {
  const value = e.target.value.trim();
  if (!e.target.id) {
    throw new Error('no target id');
  }
  this.setState({[e.target.id]: value});
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function ctApiGet(url, params) {
  const source = CancelToken.source();
  const request = api.get(url, {cancelToken: source.token, ...params});
  request[CANCEL] = () => source.cancel();
  return request;
}

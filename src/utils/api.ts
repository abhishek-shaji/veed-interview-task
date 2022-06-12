import axios from 'axios';
import qs from 'qs';

export const api = axios.create({
  baseURL: '/api',
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

import axios from 'axios';
import store from '../redux/store';

const apiAxios = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  timeoutErrorMessage: 'Request cancelled due to timeout',
});

apiAxios.interceptors.request.use(
  config => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiAxios;

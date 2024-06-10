import axios from 'axios';
import store from '../redux/store';
import {clearUser} from '../redux/slices/userSlice';
import Snackbar from 'react-native-snackbar';

const apiAxios = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
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

apiAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      Snackbar.show({
        text: 'Unauthorized, please login again',
        duration: 3000,
      });
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  },
);

export default apiAxios;

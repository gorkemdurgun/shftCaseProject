import axios from 'axios';
import store from '../redux/store';
import {purge, refreshTokens} from '../redux/slices/userSlice';
import Snackbar from 'react-native-snackbar';
import {authServices} from '../services/auth';

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
    const accessToken = store.getState().user.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
      const currentRefreshToken = store.getState().user.refreshToken;
      if (currentRefreshToken) {
        authServices
          .refreshToken({refreshToken: currentRefreshToken})
          .then(response => {
            store.dispatch(
              refreshTokens({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
              }),
            );
            return apiAxios.request(error.config);
          })
          .catch(() => {
            store.dispatch(purge());
          });
      }
    }
    return Promise.reject(error);
  },
);

export default apiAxios;

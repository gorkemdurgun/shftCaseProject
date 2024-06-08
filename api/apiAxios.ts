import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  timeoutErrorMessage: 'Request cancelled due to timeout',
});

export default apiAxios;

import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAxios;

import apiAxios from '../../utils/apiAxios';

const testData = {
  email: 'test@test.com',
  password: 'password',
};

export const login = async (email: string, password: string) => {
  const response = await apiAxios.post('/login', {
    email: testData.email,
    password: testData.password,
  });
  return response.data;
};

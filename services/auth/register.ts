import apiAxios from '../../api/apiAxios';

export const register = async (
  credentials: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiAxios.post('/register', credentials);
  return response.data;
};

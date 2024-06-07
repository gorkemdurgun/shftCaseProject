import apiAxios from '../../api/apiAxios';

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await apiAxios.post('/login', credentials);
  return response.data;
};

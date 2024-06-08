import apiAxios from '../../api/apiAxios';

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const {data} = await apiAxios.post<LoginResponse>('/login', credentials);
    return data;
  } catch (error: Error | any) {
    const toError = new Error(error.response.data.message);
    throw toError;
  }
};

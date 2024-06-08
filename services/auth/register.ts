import apiAxios from '../../api/apiAxios';

export const register = async (
  credentials: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const {data} = await apiAxios.post<RegisterResponse>(
      '/register',
      credentials,
    );
    return data;
  } catch (error: Error | any) {
    const toError = new Error(error.response.data.message);
    throw toError;
  }
};

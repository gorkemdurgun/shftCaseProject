import apiAxios from '../../api/apiAxios';
import toError from '../../utils/toError';

export const register = async (
  credentials: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const {data} = await apiAxios.post<RegisterResponse>(
      '/register',
      credentials,
    );
    return data;
  } catch (error) {
    throw toError(error);
  }
};

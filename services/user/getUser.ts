import toError from '../../utils/toError';
import apiAxios from '../../api/apiAxios';

export const getUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const {data} = await apiAxios.post<LoginResponse>('/login', credentials);
    return data;
  } catch (error) {
    throw toError(error);
  }
};

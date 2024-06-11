import toError from '../../utils/toError';
import apiAxios from '../../api/apiAxios';

export const refreshToken = async (
  credentials: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  try {
    const {data} = await apiAxios.post<RefreshTokenResponse>(
      '/refesh',
      credentials,
    );
    return data;
  } catch (error) {
    throw toError(error);
  }
};

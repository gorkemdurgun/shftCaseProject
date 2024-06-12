import toError from '../../utils/toError';
import apiAxios from '../../api/apiAxios';

export const getUser = async (): Promise<GetUserResponse> => {
  try {
    const {data} = await apiAxios.get<GetUserResponse>('/user');
    return data;
  } catch (error) {
    throw toError(error);
  }
};

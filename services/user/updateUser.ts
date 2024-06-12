import toError from '../../utils/toError';
import apiAxios from '../../api/apiAxios';

export const updateUser = async (
  fields: UpdateUserRequest,
): Promise<UpdateUserRequest> => {
  try {
    const {data} = await apiAxios.put<UpdateUserResponse>('/user', fields);
    return data;
  } catch (error) {
    throw toError(error);
  }
};

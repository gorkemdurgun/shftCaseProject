import apiAxios from '../../api/apiAxios';
import toError from '../../utils/toError';

export const withdrawJob = async ({
  id,
}: WithdrawJobRequest): Promise<WithdrawJobResponse> => {
  try {
    const {data: response} = await apiAxios.post<WithdrawJobResponse>(
      `/jobs/${id}/withdraw`,
    );
    return response;
  } catch (error) {
    throw toError(error);
  }
};

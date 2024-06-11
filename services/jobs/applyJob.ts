import apiAxios from '../../api/apiAxios';
import toError from '../../utils/toError';

export const applyJob = async ({
  id,
}: ApplyJobRequest): Promise<ApplyJobResponse> => {
  try {
    const {data: response} = await apiAxios.post<ApplyJobResponse>(
      `/jobs/${id}/apply`,
    );
    return response;
  } catch (error) {
    throw toError(error);
  }
};

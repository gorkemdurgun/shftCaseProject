import apiAxios from '../../api/apiAxios';
import toError from '../../utils/toError';

export const getJobsById = async ({id}: GetJobsByIdRequest): Promise<Job> => {
  try {
    const {data: response} = await apiAxios.get<Job>(`/jobs/${id}`);
    return response;
  } catch (error) {
    throw toError(error);
  }
};

import apiAxios from '../../api/apiAxios';

export const getJobsById = async ({id}: GetJobsByIdRequest): Promise<Job> => {
  try {
    const {data: response} = await apiAxios.get<Job>(`/jobs/${id}`);
    return response;
  } catch (error: Error | any) {
    const toError = new Error(error.response.data.message);
    throw toError;
  }
};

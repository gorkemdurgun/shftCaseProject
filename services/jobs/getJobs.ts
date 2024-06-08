import apiAxios from '../../api/apiAxios';

export const getJobs = async (): Promise<any> => {
  try {
    const {data} = await apiAxios.post<any>('/jobs');
    return data;
  } catch (error: Error | any) {
    console.log('error', error);
    const toError = new Error(error.response.data.message);
    throw toError;
  }
};

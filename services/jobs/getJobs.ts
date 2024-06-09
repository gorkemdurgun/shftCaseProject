import apiAxios from '../../api/apiAxios';

export const getJobs = async ({
  page,
  perPage,
  orderByField,
  orderByDirection,
  searchField,
  searchQuery,
}: GetJobsRequest): Promise<GetJobsResponse> => {
  try {
    const {data: response} = await apiAxios.get<GetJobsResponse>('/jobs', {
      params: {
        page,
        perPage,
        orderByField,
        orderByDirection,
        searchField,
        searchQuery,
      },
    });
    return response;
  } catch (error: Error | any) {
    console.log(error);
    const toError = new Error(error.response.data.message);
    throw toError;
  }
};

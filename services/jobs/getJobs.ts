import apiAxios from '../../api/apiAxios';
import toError from '../../utils/toError';

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
        orderBy: {
          field: orderByField,
          direction: orderByDirection,
        },
        search: {
          field: searchField,
          query: searchQuery,
        },
      },
    });
    return response;
  } catch (error) {
    throw toError(error);
  }
};

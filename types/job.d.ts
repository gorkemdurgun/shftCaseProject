type Job = {
  companyName: string;
  keywords: string[];
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
};

type JobListMeta = {
  total: number;
  page: number;
  perPage: number;
};

type GetJobsRequest = {
  page?: number;
  perPage?: number;
  orderByField?: 'createdAt' | 'salary';
  orderByDirection?: 'asc' | 'desc';
  searchField?: string;
  searchQuery?: string;
};

type GetJobsResponse = {
  data: Job[];
  meta: JobListMeta;
};

type GetJobsByIdRequest = {
  id: string;
};

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
  orderByField?: string;
  orderByDirection?: string;
  searchField?: string;
  searchQuery?: string;
};

type GetJobsResponse = {
  data: Job[];
  meta: JobListMeta;
};

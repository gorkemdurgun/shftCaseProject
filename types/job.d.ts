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

type OrderByField = 'createdAt' | 'salary';
type OrderByDirection = 'asc' | 'desc';
type SearchField = 'name' | 'companyName' | 'location' | 'salary';

type GetJobsRequest = {
  page?: number;
  perPage?: number;
  orderByField?: OrderByField;
  orderByDirection?: OrderByDirection;
  searchField?: SearchField;
  searchQuery?: string;
};

type GetJobsResponse = {
  data: Job[];
  meta: JobListMeta;
};

type GetJobsByIdRequest = {
  id: string;
};

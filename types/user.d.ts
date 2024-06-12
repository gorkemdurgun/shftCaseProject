type LoggedUser = {
  id: string;
  email: string;
  profileImage: string;
  appliedJobs: string[];
};

type Address = {
  details: string;
  city: string;
  country: string;
};

type User = LoggedUser & {
  name: string;
  surname: string;
  phone: string;
  dateOfBirth: string;
  address: Address;
};

type UpdateUserRequest = {
  name: string;
  surname: string;
  profileImage: string;
  phone: string;
  dateOfBirth: string;
  address: Address;
};

type UpdateUserResponse = User;

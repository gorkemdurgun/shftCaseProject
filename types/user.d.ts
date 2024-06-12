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

type ExperienceItem = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
};

type EducationItem = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type LanguageItem = {
  language: string;
  level: string;
};

type User = LoggedUser & {
  name: string;
  surname: string;
  phone: string;
  profileImage: string;
  dateOfBirth: string;
  address: Address;
  skills?: string[];
  experiences?: ExperienceItem[];
  education?: EducationItem[];
  languages?: LanguageItem[];
};

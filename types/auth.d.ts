type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: User;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
};

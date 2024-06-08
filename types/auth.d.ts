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

type RegisterRequest = {
  email: string;
  password: string;
};

type RegisterResponse = {
  user: User;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
};

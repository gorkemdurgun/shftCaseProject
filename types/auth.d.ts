type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: LoggedUser;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
};

type RegisterRequest = {
  email: string;
  password: string;
};

type RegisterResponse = {
  user: LoggedUser;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenRequest = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  user: LoggedUser;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
};

type GetUserResponse = User;

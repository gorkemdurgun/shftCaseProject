import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  loggedUser: LoggedUser | null;
  userInformations: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  loggedUser: null,
  userInformations: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (
      state,
      action: PayloadAction<{
        loggedUser: LoggedUser;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.loggedUser = action.payload.loggedUser;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearLoggedUser: state => {
      state.loggedUser = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setUserInformations: (state, action: PayloadAction<User>) => {
      state.userInformations = action.payload;
    },
    clearUserInformations: state => {
      state.userInformations = null;
    },
    clearUser: state => {
      state.loggedUser = null;
      state.userInformations = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    refreshTokens: (
      state,
      action: PayloadAction<{accessToken: string; refreshToken: string}>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    addToAppliedJobs: (state, action: PayloadAction<{jobId?: string}>) => {
      if (state.loggedUser && action.payload.jobId) {
        state.loggedUser.appliedJobs.push(action.payload.jobId);
      }
    },
    removeFromAppliedJobs: (state, action: PayloadAction<{jobId?: string}>) => {
      if (state.loggedUser && action.payload.jobId) {
        state.loggedUser.appliedJobs = state.loggedUser.appliedJobs.filter(
          jobId => jobId !== action.payload.jobId,
        );
      }
    },
  },
});

export const {
  setLoggedUser,
  clearLoggedUser,
  setUserInformations,
  clearUserInformations,
  clearUser,
  refreshTokens,
  addToAppliedJobs,
  removeFromAppliedJobs,
} = userSlice.actions;

export default userSlice.reducer;

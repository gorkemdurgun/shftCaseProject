import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{user: User; token: string}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;

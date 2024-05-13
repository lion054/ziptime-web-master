import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'ziptimeApp',
  initialState: {
    user: undefined
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    }
  }
});

export const { saveUser, clearUser } = slice.actions;

// see https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/features/counter/counterSlice.js

export default slice.reducer;

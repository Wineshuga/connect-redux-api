import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
}

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  try{
    const response = fetch('https://randomuser.me/api/?results=5')
    const data = (await response).json();
    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true
    })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.results
        state.users = state.users.concat(data)
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})
export const getUsers = (state) => state.users.users
export const getLoading = (state) => state.users.isLoading;
export const getError = (state) => state.users.error

export default usersSlice.reducer
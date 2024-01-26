import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// All Users Api
export const allUsersApi = createAsyncThunk("auth/allUsersApi", async () => {
  const response = await axiosApi.get("/projectaccount/userslist/");
  return response.data;
});

// Users Delete Api
export const userDeleteApi = createAsyncThunk(
  "auth/userDeleteApi",
  async (userId) => {
    const response = await axiosApi.delete(
      `/projectaccount/userslist/${userId}/`
    );
    return response;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    usersCount: "",
    allUsers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allUsersApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allUsersApi.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.results;
        state.usersCount = action.payload.count;
      })
      .addCase(allUsersApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;

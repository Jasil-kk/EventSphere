import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// Register Api
export const registerApi = createAsyncThunk(
  "auth/registerApi",
  async (input) => {
    const response = await axiosApi.post("/projectaccount/register/", input);
    return response.data;
  }
);

// Login Api
export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async ({ input, navigate }) => {
    const response = await axiosApi.post("/projectaccount/login/", input);
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("role", response.data.role);
    sessionStorage.setItem("team_name", response.data.team_name);
    sessionStorage.setItem("username", response.data.username);
    sessionStorage.setItem("id", response.data.pk);
    navigate("/");
    window.location.reload();
    return response.data;
  }
);

// Team Registration Api
export const teamRegisterApi = createAsyncThunk(
  "auth/teamRegisterApi",
  async (input) => {
    const response = await axiosApi.post(
      "/projectaccount/event_team_register/",
      input
    );
    return response.data;
  }
);

// Logout Api
export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async (navigate) => {
    const response = await axiosApi.post("/auth/token/logout/");
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {},
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

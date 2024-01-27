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

// All Teams Api
export const allTeamsApi = createAsyncThunk("auth/allTeamsApi", async () => {
  const response = await axiosApi.get(
    "/projectaccount/event_management_users/"
  );
  return response.data;
});

// Single Team Get Api
export const singleTeamApi = createAsyncThunk(
  "auth/singleTeamApi",
  async (teamId) => {
    const response = await axiosApi.get(
      `/projectaccount/event_management_users/${teamId}/`
    );
    return response.data;
  }
);

// Single Team Delete Api
export const singleTeamDeleteApi = createAsyncThunk(
  "auth/singleTeamDeleteApi",
  async (teamId) => {
    const response = await axiosApi.delete(
      `/projectaccount/event_management_users/${teamId}/`
    );
    return response;
  }
);

// Category Get Api
export const categoryGetApi = createAsyncThunk(
  "auth/categoryGetApi",
  async () => {
    const response = await axiosApi.get("/store/subcatagory/");
    return response.data;
  }
);

// Category Add Api
export const categoryAddApi = createAsyncThunk(
  "auth/categoryAddApi",
  async (formData) => {
    const response = await axiosApi.post("/store/subcatagory/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
);

// Category Delete Api
export const categoryDeleteApi = createAsyncThunk(
  "auth/categoryDeleteApi",
  async (categoryId) => {
    const response = await axiosApi.delete(`/store/subcatagory/${categoryId}/`);
    return response;
  }
);

// Notification Get Api
export const notificationGetApi = createAsyncThunk(
  "auth/notificationGetApi",
  async () => {
    const response = await axiosApi.get("/store/notification/");
    return response.data;
  }
);

// Notification Add Api
export const notificationAddApi = createAsyncThunk(
  "auth/notificationAddApi",
  async (input) => {
    const response = await axiosApi.post("/store/notification/", input);
    return response.data;
  }
);

// Notification Delete Api
export const notificationDeleteApi = createAsyncThunk(
  "auth/notificationDeleteApi",
  async (notificationID) => {
    const response = await axiosApi.delete(
      `/store/notification/${notificationID}`
    );
    return response;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    usersCount: "",
    allUsers: [],
    allTeams: [],
    singleTeam: {},
    categories: [],
    notifications: [],
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
      })
      .addCase(allTeamsApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allTeamsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeams = action.payload;
      })
      .addCase(allTeamsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(singleTeamApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleTeamApi.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTeam = action.payload;
      })
      .addCase(singleTeamApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(categoryGetApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryGetApi.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.results;
      })
      .addCase(categoryGetApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(notificationGetApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(notificationGetApi.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(notificationGetApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;

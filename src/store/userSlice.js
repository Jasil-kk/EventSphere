import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// Team List Based on Category Api
export const getTeamListApi = createAsyncThunk(
  "auth/getTeamListApi",
  async (categoryId) => {
    const response = await axiosApi.get("/store/service/", {
      params: {
        sub_catagory: categoryId,
      },
    });
    return response.data;
  }
);

// Team Single View Api
export const getTeamSingleViewApi = createAsyncThunk(
  "auth/getTeamSingleViewApi",
  async ({ categoryId, teamId }) => {
    const response = await axiosApi.get(
      `/store/service/${teamId}/?sub_catagory=${categoryId}/`
    );
    return response.data;
  }
);

// Get Review Api
export const getReviewApi = createAsyncThunk(
  "auth/getReviewApi",
  async (accountId) => {
    const response = await axiosApi.get(`store/rating/?account=${accountId}`);
    return response.data;
  }
);

// Post Review Api
export const postReviewApi = createAsyncThunk(
  "auth/postReviewApi",
  async ({ teamId, input }) => {
    const response = await axiosApi.post(
      `/store/rating/?service=${teamId}`,
      input
    );
    return response.data;
  }
);

// Post ConnectUs Api
export const postConncetUsApi = createAsyncThunk(
  "auth/postConncetUsApi",
  async ({ teamId, input }) => {
    const response = await axiosApi.post(
      `/store/inbox/?service=${teamId}`,
      input
    );
    return response.data;
  }
);

// Post Enquiry Api
export const postEnquiryApi = createAsyncThunk(
  "auth/postEnquiryApi",
  async ({ enquiryId, input }) => {
    const response = await axiosApi.post(
      `/store/enquiry/?service=${enquiryId}`,
      input
    );
    return response.data;
  }
);

// Get Popular Api
export const getPopularApi = createAsyncThunk(
  "auth/getPopularApi",
  async () => {
    const response = await axiosApi.get("/store/popular/");
    return response.data;
  }
);

// Search Api
export const SearchApi = createAsyncThunk(
  "auth/SearchApi",
  async ({ district, input }) => {
    const response = await axiosApi.get(
      `/store/service/?account__district=${district}&search=${input}`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    teamList: [],
    teamSingleView: {},
    reviews: [],
    populars: [],
    searchResult: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamListApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamListApi.fulfilled, (state, action) => {
        state.loading = false;
        state.teamList = action.payload;
      })
      .addCase(getTeamListApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTeamSingleViewApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamSingleViewApi.fulfilled, (state, action) => {
        state.loading = false;
        state.teamSingleView = action.payload;
      })
      .addCase(getTeamSingleViewApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReviewApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewApi.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.ratings;
      })
      .addCase(getReviewApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPopularApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularApi.fulfilled, (state, action) => {
        state.loading = false;
        state.populars = action.payload?.results;
      })
      .addCase(getPopularApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(SearchApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload?.results;
      })
      .addCase(SearchApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

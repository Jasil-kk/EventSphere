import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// All Service Api
export const allServicesApi = createAsyncThunk(
  "auth/allServicesApi",
  async () => {
    const response = await axiosApi.get("/store/service/");
    return response.data;
  }
);

// Add Service Api
export const addServicesApi = createAsyncThunk(
  "auth/addServicesApi",
  async (input) => {
    const response = await axiosApi.post("/store/service/", input);
    return response.data;
  }
);

// Delete Service Api
export const deleteServicesApi = createAsyncThunk(
  "auth/deleteServicesApi",
  async (serviceId) => {
    const response = await axiosApi.delete(`/store/service/${serviceId}/`);
    console.log(response);
    return response;
  }
);

// Get Enquiry Api
export const getEnquiriesApi = createAsyncThunk(
  "auth/getEnquiriesApi",
  async () => {
    const response = await axiosApi.get("/store/enquiry/");
    return response.data;
  }
);

// Delete Enquiry Api
export const deleteEnquiryApi = createAsyncThunk(
  "auth/deleteEnquiryApi",
  async (enquiryId) => {
    const response = await axiosApi.delete(`/store/enquiry/${enquiryId}/`);
    return response;
  }
);

// Get Notifications Api
export const getNotificationsApi = createAsyncThunk(
  "auth/getNotificationsApi",
  async () => {
    const response = await axiosApi.get("/store/notification/");
    return response.data;
  }
);

// Delete Notification Api
export const deleteNotificationApi = createAsyncThunk(
  "auth/deleteNotificationApi",
  async (notificationId) => {
    const response = await axiosApi.delete(
      `/store/notification/${notificationId}/`
    );
    return response;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    allServices: [],
    enquiries: [],
    notifications: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allServicesApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allServicesApi.fulfilled, (state, action) => {
        state.loading = false;
        state.allServices = action.payload;
      })
      .addCase(allServicesApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEnquiriesApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnquiriesApi.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiriesApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getNotificationsApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotificationsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;

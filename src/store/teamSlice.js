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
    return response;
  }
);

// Edit Service Api
export const editServicesApi = createAsyncThunk(
  "auth/editServicesApi",
  async ({ serviceId, input }) => {
    const response = await axiosApi.put(`/store/service/${serviceId}/`, input);
    return response.data;
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

// Get Notifications Api
export const getInboxsApi = createAsyncThunk("auth/getInboxsApi", async () => {
  const response = await axiosApi.get("/store/inbox/");
  return response.data;
});

// Delete Notifications Api
export const deleteInboxApi = createAsyncThunk(
  "auth/deleteInboxApi",
  async (inboxId) => {
    const response = await axiosApi.delete(`/store/inbox/${inboxId}/`);
    return response;
  }
);

// Team Profile Get Api
export const teamProfileGetApi = createAsyncThunk(
  "auth/teamProfileGetApi",
  async () => {
    const response = await axiosApi.get("/store/team_profile/");
    return response.data;
  }
);

// Team Profile Post Api
export const teamProfilePostApi = createAsyncThunk(
  "auth/teamProfilePostApi",
  async (formData) => {
    const response = await axiosApi.post("/store/team_profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

// Team Pictures Get Api
export const teamPicturesGetApi = createAsyncThunk(
  "auth/teamPicturesGetApi",
  async () => {
    const response = await axiosApi.get("/store/profile_pic/");
    return response.data;
  }
);

// Team Pictures Post Api
export const teamPicturesPostApi = createAsyncThunk(
  "auth/teamPicturesPostApi",
  async (formData) => {
    const response = await axiosApi.post("/store/profile_pic/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

// Team Pictures Post Api
export const teamPictureDeleteApi = createAsyncThunk(
  "auth/teamPictureDeleteApi",
  async (pictureId) => {
    const response = await axiosApi.delete(`/store/profile_pic/${pictureId}/`);
    return response;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    allServices: [],
    enquiries: [],
    notifications: [],
    inboxes: [],
    teamProfile: [],
    allPictures: [],
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
      })
      .addCase(getInboxsApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInboxsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.inboxes = action.payload;
      })
      .addCase(getInboxsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(teamProfileGetApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teamProfileGetApi.fulfilled, (state, action) => {
        state.loading = false;
        state.teamProfile = action.payload;
      })
      .addCase(teamProfileGetApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(teamPicturesGetApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teamPicturesGetApi.fulfilled, (state, action) => {
        state.loading = false;
        state.allPictures = action.payload;
      })
      .addCase(teamPicturesGetApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;

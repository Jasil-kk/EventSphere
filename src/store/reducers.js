import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import teamReducer from "./teamSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  team: teamReducer,
  user: userReducer,
});

export default rootReducer;

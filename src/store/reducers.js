import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import teamReducer from "./teamSlice";

const rootReducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
  team: teamReducer,
});

export default rootReducer;

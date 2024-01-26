import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import adminReducer from "./adminSlice"

const rootReducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
});

export default rootReducer;

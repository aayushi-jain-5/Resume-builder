import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { resumeReducer } from "./reducer/resumeReducer";

const rootReducer = combineReducers({
  tasks: resumeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

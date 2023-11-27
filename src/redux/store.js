// Create a file called store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import syncReducer from "./reducers/syncReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  sync: syncReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

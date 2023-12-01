// Create a file called store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import syncReducer from "./reducers/syncReducers";
import globalReducer from "./reducers/globalReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  sync: syncReducer,
  global: globalReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;

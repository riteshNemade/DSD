// Create a file called store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import syncReducer from "./reducers/syncReducers";
import globalReducer from "./reducers/globalReducers";

const appReducer = combineReducers({
  auth: authReducer,
  sync: syncReducer,
  global: globalReducer,
});

const rootReducer = (state, action) => {
  // When the reset action is dispatched, reset the state to its initial state
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  if (action.type === "RESET_REDUX") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({ reducer: rootReducer });

export default store;

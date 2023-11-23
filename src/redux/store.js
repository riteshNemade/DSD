// Create a file called store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({reducer:rootReducer});

export default store;

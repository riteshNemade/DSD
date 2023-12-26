import axios from "axios";
import store from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://www.dev.dsdfacilicare.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.getState()?.auth.token || await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api = axiosInstance;

export const auth = axios.create({
  baseURL: "https://www.dev.dsdfacilicare.com/apidsd/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

import axios from "axios";

export default api = axios.create({
  baseURL: '',
  headers: {
    Authorization:
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

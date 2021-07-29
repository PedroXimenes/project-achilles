import axios from "axios";
import { apiBaseURL } from '../config/index';

const params = {
  baseURL: apiBaseURL,
};

const api = axios.create(params);

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
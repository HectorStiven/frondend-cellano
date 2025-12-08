import axios from "axios";
import { store } from "../store";

export const api = axios.create({
  // baseURL: "https://14j89qkn-8000.use.devtunnels.ms/",
  // baseURL: "http://127.0.0.1:8000",
    baseURL: "http://72.60.175.200:8999",

    // baseURL: "https://backend-cellano-6.onrender.com",
});

// Interceptor para enviar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers = config.headers ?? {};
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

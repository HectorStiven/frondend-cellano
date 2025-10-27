import axios from 'axios';
import { store } from '../store';

export const api = axios.create({
    baseURL: 'https://backend-cellano-6.onrender.com',
});

// Interceptor para enviar token automáticamente
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

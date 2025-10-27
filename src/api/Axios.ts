import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend-cellano-6.onrender.com', // Reemplaza con la URL base de tu API
  });
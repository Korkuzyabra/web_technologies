import axios from 'axios';
import { API_BASE, authHeader } from './config';

export const booksApi = axios.create({ baseURL: `${API_BASE}/v1/books` });
booksApi.interceptors.request.use((config) => {
  config.headers.Authorization = authHeader();
  return config;
});

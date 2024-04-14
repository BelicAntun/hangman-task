import axios from 'axios';

export const apiQoute = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_QUOTE}`,
  timeout: 120000,
});

export const apiResults = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_RESULTS}`,
  timeout: 120000,
});

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Change to your backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

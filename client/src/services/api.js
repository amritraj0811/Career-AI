import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const generateRoadmap = async (email, prompt) => {
  try {
    const response = await api.post('/generate', { email, prompt });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to generate roadmap');
  }
};

export const getRoadmapHistory = async (email) => {
  try {
    const response = await api.get('/history', { params: { email } });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch history');
  }
};
import axios from 'axios';

const API_URL = 'http://localhost:4200/sources'; // Change URL if necessary

// Get the JWT token from localStorage or sessionStorage
const getToken = (): string | null => {
  return localStorage.getItem('token'); // Or sessionStorage
};

export interface Source {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const getHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in Authorization header
      },
    };
  }
  return {};
};

export const getSources = async (userId: string): Promise<Source[]> => {
  const response = await axios.get(`${API_URL}/user/${userId}`, getHeaders());
  return response.data;
};

export const createSource = async (source: Omit<Source, 'id' | 'createdAt' | 'updatedAt'>): Promise<Source> => {
  const response = await axios.post(API_URL, source, getHeaders());
  return response.data;
};

export const updateSource = async (id: string, updatedSource: Partial<Source>): Promise<Source> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedSource, getHeaders());
  return response.data;
};

export const deleteSource = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getHeaders());
};

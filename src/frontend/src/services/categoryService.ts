import axios from 'axios';

const API_URL = 'http://localhost:4200/categories'; // Change URL if necessary

// Get the JWT token from localStorage or sessionStorage
const getToken = (): string | null => {
  return localStorage.getItem('token'); // Or sessionStorage
};

export interface Category {
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

export const getCategories = async (userId: string): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/user/${userId}`, getHeaders());
  return response.data;
};

export const createCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const response = await axios.post(API_URL, category, getHeaders());
  return response.data;
};

export const updateCategory = async (id: string, updatedCategory: Partial<Category>): Promise<Category> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedCategory, getHeaders());
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getHeaders());
};

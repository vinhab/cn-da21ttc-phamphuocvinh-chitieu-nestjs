import axios from 'axios';

// Khởi tạo một instance axios với baseURL
const apiClient = axios.create({
  baseURL: 'http://localhost:4200/', // URL cơ bản của API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy tất cả người dùng
export const getData = async () => {
  try {
    const response = await apiClient.get('users'); // endpoint của API
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



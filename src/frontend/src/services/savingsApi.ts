import axios from 'axios';

const API_URL = 'http://localhost:4200/savings'; // Cập nhật URL API nếu cần

export interface MonthlySavings {
  _id: string;
  userId: string;
  targetAmount: number;
  currentAmount: number;
  monthYear: string; // định dạng 'YYYY-MM' ví dụ: '2025-01'
  createdAt: string;
  updatedAt: string;
}

export interface GoalSavings {
  id:string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;  // Hoặc Date nếu bạn muốn sử dụng đối tượng Date
  endDate: string;    // Hoặc Date nếu bạn muốn sử dụng đối tượng Date
}

// Lấy token từ localStorage hoặc sessionStorage
const getToken = (): string | null => {
  return localStorage.getItem('token'); // Hoặc sessionStorage
};

// Tạo headers với token Authorization
const getHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    };
  }
  return {};
};

// Gọi API để tạo tiết kiệm hàng tháng
export const createMonthlySavings = async (createDto: any) => {
  const response = await axios.post(`${API_URL}/monthly`, createDto, getHeaders());
  return response.data;
};

// Lấy tiết kiệm hàng tháng của người dùng
export const getMonthlySavings = async (userId: string) => {
  const response = await axios.get(`${API_URL}/monthly/${userId}`, getHeaders());
  return response.data;
};

// Cập nhật tiết kiệm hàng tháng
export const updateMonthlySavings = async (id: string, updateDto: any) => {
  const response = await axios.patch(`${API_URL}/monthly/${id}`, updateDto, getHeaders());
  return response.data;
};

// Xóa tiết kiệm hàng tháng
export const deleteMonthlySavings = async (id: string) => {
  await axios.delete(`${API_URL}/monthly/${id}`, getHeaders());
};

// Gọi API để tạo mục tiêu tiết kiệm
export const createGoalSavings = async (createDto: any) => {
  const response = await axios.post(`${API_URL}/goal`, createDto, getHeaders());
  return response.data;
};

// Cập nhật mục tiêu tiết kiệm
export const updateGoalSavings = async (id: string, updateDto: any) => {
  const response = await axios.patch(`${API_URL}/goal/${id}`, updateDto, getHeaders());
  return response.data;
};

// Lấy các mục tiêu tiết kiệm của người dùng
export const getGoalSavings = async (userId: string) => {
  const response = await axios.get(`${API_URL}/goal/${userId}`, getHeaders());
  return response.data;
};

// Xóa mục tiêu tiết kiệm
export const deleteGoalSavings = async (id: string) => {
  await axios.delete(`${API_URL}/goal/${id}`, getHeaders());
};

export const handleAddFund = async (goalId: string, amount: number) => {
  try {
    // Gửi yêu cầu PUT đến backend để thêm tiền vào mục tiêu tiết kiệm
    const response = await axios.put(
      `${API_URL}/goal/${goalId}/add-funds`,
      { amount },
      getHeaders() // Đảm bảo bạn đang gửi token trong header
    );

    if (response.status === 200) {
      console.log('Funds added successfully:', response.data);
      // Cập nhật lại dữ liệu sau khi thêm tiền thành công
    }
  } catch (error) {
    console.error('Error adding funds:', error);
    alert('Error adding funds');
  }
};
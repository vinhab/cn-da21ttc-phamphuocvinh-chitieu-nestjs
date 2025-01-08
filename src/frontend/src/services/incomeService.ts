// src/services/expenseService.ts
import axios from 'axios';

export interface Income {
  id: string;
  userId: string;
  sourceId: string;
  amount: number;
  description: string;
  date: string;
}

export interface IncomeDto {
  userId: string;
  sourceId: string;
  amount: number;
  description: string;
  date: string;
}

const API_URL = 'http://localhost:4200/incomes'; // Thay đổi theo URL API của bạn

// Hàm chung để gửi yêu cầu API
const apiRequest = async (method: 'post' | 'put' | 'delete' | 'get', url: string, data?: any) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(`${method} request failed to ${url}:`, error);
    throw error;
  }
};

// Thêm chi phí
export const addIncome = async (income: IncomeDto): Promise<IncomeDto> => {
  return await apiRequest('post', API_URL, income);
};

// Cập nhật chi phí
export const updateIncome = async (id: string, income: Partial<Income>): Promise<Income> => {
  return await apiRequest('put', `${API_URL}/${id}`, income);
};

// Xóa chi phí
export const deleteIncome = async (id: string): Promise<void> => {
  await apiRequest('delete', `${API_URL}/${id}`);
};

// Lấy tổng chi phí của người dùng
export const getTotalIncome = async (userId: string): Promise<number> => {
  const total = await apiRequest('get', `${API_URL}/total/${userId}`);
  return total; // Giả sử API trả về { total: số }
};

// Lấy tổng chi phí của người dùng
export const getTotalIncomeYearAndMonth = async (userId: string, year: number, month: number): Promise<number> => {
  const total = await apiRequest('get', `${API_URL}/total/${userId}/${year}/${month}`);
  return total; // Assuming the API returns { total: number }
};

// Lấy tổng tất cả các khoản chi của người dùng
export const getIcomes = async (userId: string): Promise<Income[]> => {
  const incomes = await apiRequest('get', `${API_URL}/user/${userId}`);
  return incomes;
};

export const getIncomeYearMonth = async (
  userId: string,
  year: number,
  month: number
): Promise<Income[]> => {
  const incomes = await apiRequest('get', `${API_URL}/user/${userId}/incomes/${year}/${month}`);
  return incomes;
};

// src/services/expenseService.ts
import axios from 'axios';

export interface Expense {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}

export interface ExpenseDto {
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}

const API_URL = 'http://localhost:4200/expenses'; // Thay đổi theo URL API của bạn

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
export const addExpense = async (expense: ExpenseDto): Promise<ExpenseDto> => {
  return await apiRequest('post', API_URL, expense);
};

// Cập nhật chi phí
export const updateExpense = async (id: string, expense: Partial<Expense>): Promise<Expense> => {
  return await apiRequest('put', `${API_URL}/${id}`, expense);
};

// Xóa chi phí
export const deleteExpense = async (id: string): Promise<void> => {
  await apiRequest('delete', `${API_URL}/${id}`);
};

// Lấy tổng chi phí của người dùng
export const getTotalExpenses = async (userId: string): Promise<number> => {
  const total = await apiRequest('get', `${API_URL}/total/${userId}`);
  return total; // Giả sử API trả về { total: số }
};

// Lấy tổng tất cả các khoản chi của người dùng
export const getExpenses = async (userId: string): Promise<Expense[]> => {
  const expenses = await apiRequest('get', `${API_URL}/user/${userId}`);
  return expenses;
};

export const getTotalExpensesYearMonth = async (
  userId: string,
  year: number,
  month: number
): Promise<number> => {
  // Updated API call to include year and month in the URL
  const total = await apiRequest('get', `${API_URL}/total/expenses/${userId}/${year}/${month}`);
  return total; // Assuming the API returns { total: number }
};

export const getExpensesYearMonth = async (
  userId: string,
  year: number,
  month: number
): Promise<Expense[]> => {
  const expenses = await apiRequest('get', `${API_URL}/user/${userId}/expenses/${year}/${month}`);
  return expenses;
};


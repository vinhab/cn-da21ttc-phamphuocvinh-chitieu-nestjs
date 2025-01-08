import axios from 'axios';

const API_URL = 'http://localhost:4200'; // Thay bằng URL API của bạn

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export const fetchMonthlyData = async (userId: string, month: number, year: number): Promise<{ income: number; expense: number }> => {
  const incomeResponse = await axios.get(`${API_URL}/incomes/total-by-month/${userId}?month=${month}&year=${year}`);
  const expenseResponse = await axios.get(`${API_URL}/expenses/total-by-month/${userId}?month=${month}&year=${year}`);
  return {
    income: incomeResponse.data.total,
    expense: expenseResponse.data.total,
  };
};

export const generateChartData = async (userId: string, year: number): Promise<MonthlyData[]> => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const chartData: MonthlyData[] = [];
  for (let i = 1; i <= 12; i++) {
    const { income, expense } = await fetchMonthlyData(userId, i, year);
    chartData.push({
      month: months[i - 1],
      income: income || 0,
      expense: expense || 0,
    });
  }

  return chartData;
};

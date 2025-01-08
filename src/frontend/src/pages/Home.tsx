import { useEffect, useState } from 'react';
import ComparisonChartComponent from '../components/ComparisonChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import MainLayout from '../layouts/MainLayout';
import { Expense, getExpenses, getTotalExpenses, getExpensesYearMonth, getTotalExpensesYearMonth } from '../services/expenseService';
import { getTotalIncome, Income, getIcomes, getIncomeYearMonth, getTotalIncomeYearAndMonth } from '../services/incomeService';
import axios from 'axios';

interface SavingsGoal {
  userId: string;
  targetAmount: number;
  monthYear: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);  // Added state for income
  const [incomeExpenseData, setIncomeExpenseData] = useState<{ month: string; income: number; expense: number }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null); // Added state for selected year
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId')!;

    // Fetch savings goal when userId is available
    const fetchSavingsGoal = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/savings-goal/${userId}/2025-01`);
        setSavingsGoal(response.data || null);  // Ensure a valid value or null
      } catch (err) {
        setError("Không tìm thấy mục tiêu tiết kiệm.");
      }
    };

    // Fetch all required data
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch expenses and income data by year and month
        const incomeExpenseResponse = await fetch(`http://localhost:4200/data/income-expense/${userId}/${selectedYear ?? '2024'}`);
        const incomeExpenseData = await incomeExpenseResponse.json();
        setIncomeExpenseData(incomeExpenseData);

        if (selectedMonth) {
          const [year, month] = selectedMonth.split('-').map(Number);

          // Fetch expenses and income based on selected month
          const totalExpenses = await getTotalExpensesYearMonth(userId, year, month);
          setTotalExpenses(totalExpenses ?? 0);

          const expensesData = await getExpensesYearMonth(userId, year, month);
          setExpenses(expensesData);

          const totalIncomeForMonth = await getTotalIncomeYearAndMonth(userId, year, month);
          console.log(`Fetching income for ${year}-${month}`, totalIncomeForMonth);
          setTotalIncome(totalIncomeForMonth ?? 0);

          const incomeData = await getIncomeYearMonth(userId, year, month);
          setIncome(incomeData);
        } else {
          // If no month selected, fetch all data
          const totalExpenses = await getTotalExpenses(userId);
          setTotalExpenses(totalExpenses || 0);

          const expensesData = await getExpenses(userId);
          setExpenses(expensesData);

          const totalIncome = await getTotalIncome(userId);
          setTotalIncome(totalIncome || 0);

          const incomeData = await getIcomes(userId);
          setIncome(incomeData);

          console.log(totalExpenses);
          console.log(totalIncome);


        }

        // Fetch savings goal data
        await fetchSavingsGoal();

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]); // Re-fetch data when selectedMonth or selectedYear changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Group expenses by category for the Pie Chart
  const groupedExpenseData: { name: string; value: number }[] = [];
  expenses.forEach((expense) => {
    const existingCategory = groupedExpenseData.find((item) => item.name === expense.categoryId);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      groupedExpenseData.push({ name: expense.categoryId, value: expense.amount });
    }
  });

  // Group income by source for the Pie Chart
  const groupedIncomeData: { name: string; value: number }[] = [];
  income.forEach((inc) => {
    const existingSource = groupedIncomeData.find((item) => item.name === inc.sourceId);
    if (existingSource) {
      existingSource.value += inc.amount;
    } else {
      groupedIncomeData.push({ name: inc.sourceId, value: inc.amount });
    }
  });

  return (
    <MainLayout>
      <h1 className="title">Tổng quan</h1>
      <ul className="breadcrumbs">
        <li>
          <a href="/home">Trang chủ</a>
        </li>
        <li className="divider">/</li>
        <li>
          <a href="/home" className="active">
            Tổng quan
          </a>
        </li>
      </ul>

      {/* Filter for year and month */}
      <div className="flex justify-end space-x-4">
        <select
          className="select bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth ?? ''}
        >
          <option value="">Xem tất cả</option>
          <option value="2025-01">Tháng 1, 2025</option>
          <option value="2025-02">Tháng 2, 2025</option>
          <option value="2025-03">Tháng 3, 2025</option>
          {/* Add more months dynamically if needed */}
        </select>
      </div>

      {/* Financial Info Cards */}
      <div className="info-data grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-green-200 shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 text-sm">Thu nhập</p>
              <h2 className="text-green-800 font-bold text-lg">{totalIncome.toLocaleString()} vnđ</h2>
            </div>
            <i className="bx bx-money text-green-600 text-2xl"></i>
          </div>
        </div>
        <div className="card bg-red-100 shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 text-sm">Chi tiêu</p>
              <h2 className="text-red-800 font-bold text-lg">{totalExpenses.toLocaleString()} vnđ</h2>
            </div>
            <i className="bx bxs-cart text-red-600 text-2xl"></i>
          </div>
        </div>
        <div className="card bg-blue-100 shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 text-sm">Số dư</p>
              <h2 className="text-blue-800 font-bold text-lg">{(totalIncome - totalExpenses).toLocaleString()} vnđ</h2>
            </div>
            <i className="bx bx-credit-card text-blue-600 text-2xl"></i>
          </div>
        </div>
        <div className="card bg-yellow-100 shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 text-sm">Tiết kiệm</p>
              <h2 className="text-yellow-800 font-bold text-lg">
                {savingsGoal ? savingsGoal.targetAmount.toLocaleString() : "Chưa thiết lập mục tiêu"} vnđ
              </h2>
            </div>
            <i className="bx bxs-coin-stack text-yellow-600 text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="data grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Expense Chart */}
        <div className="content-data bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-center font-semibold text-lg">Phân tích chi tiêu</h3>
          <div id="chart" className="text-center">
            <PieChartComponent data={groupedExpenseData} />
          </div>
        </div>

        {/* Income Chart */}
        <div className="content-data bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-center font-semibold text-lg">Phân tích thu nhập</h3>
          <div id="chart" className="text-center">
            <PieChartComponent data={groupedIncomeData} />
          </div>
        </div>

        {/* Monthly Income vs Expense Chart */}
        <div className="content-data bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-center font-semibold text-lg">Thu nhập chi tiêu qua các tháng</h3>

          <select
            className="select bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear ?? ''}
          >
            <option value="">Chọn năm</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            {/* Add more years dynamically if needed */}
          </select>
          <div id="chart" className="text-center">
            <ComparisonChartComponent data={incomeExpenseData} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

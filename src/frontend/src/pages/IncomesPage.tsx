import React, { useState, useEffect } from 'react';
import { addIncome, deleteIncome, getIcomes, Income, updateIncome } from '../services/incomeService';
import MainLayout from '../layouts/MainLayout';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import CSS của react-datepicker
import { getSources, Source } from '../services/sourceService';

const IncomesPage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [filter, setFilter] = useState('all'); // State lưu filter
  const [sortOrder, setSortOrder] = useState('asc'); // State lưu sắp xếp

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Vui lòng đăng nhập lại!');
      return;
    }

    const fetchIncomes = async () => {
      const data = await getIcomes(userId);
      const incomesWithCorrectId = data.map((income: any) => ({
        ...income,
        id: income._id,
      }));
      setIncomes(incomesWithCorrectId);
    };
    fetchIncomes();

    const fetchSources = async () => {
      const data = await getSources(userId); // Lấy danh mục từ API
      setSources(data);
    };
    fetchSources();
  }, []);

  // Hàm lọc theo mốc thời gian
  const filterIncomes = (incomes: Income[]) => {
    const now = new Date();
    let startDate: Date;

    switch (filter) {
      case 'day':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '3months':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6months':
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date('1970-01-01'); // Không lọc
    }

    return incomes.filter((income) => new Date(income.date) >= startDate);
  };

  // Hàm sắp xếp thu nhập
  const sortIncomes = (incomes: Income[]) => {
    return incomes.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  };

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setAmount(income.amount);
    setDescription(income.description);
    setSourceId(income.sourceId);
    setDate(new Date(income.date));
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Vui lòng đăng nhập lại!');
      return;
    }

    const incomeData = {
      amount,
      description,
      sourceId,
      userId,
      date: date?.toISOString() ?? new Date().toISOString(), // Định dạng ngày trước khi gửi
    };

    try {
      if (selectedIncome) {
        await updateIncome(selectedIncome.id, incomeData);
      } else {
        await addIncome(incomeData);
      }

      const data = await getIcomes(userId);
      const incomesWithCorrectId = data.map((income: any) => ({
        ...income,
        id: income._id,
      }));

      setIncomes(incomesWithCorrectId);
      setSelectedIncome(null);
      setAmount(0);
      setDescription('');
      setSourceId('');
      setDate(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error handling Income:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('ID is missing for the Income');
      return;
    }
    try {
      await deleteIncome(id);

      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Vui lòng đăng nhập lại!');
        return;
      }

      const data = await getIcomes(userId);
      const IncomesWithCorrectId = data.map((Income: any) => ({
        ...Income,
        id: Income._id,
      }));
      setIncomes(IncomesWithCorrectId);
    } catch (error) {
      console.error('Failed to delete Income:', error);
    }
  };

  const filteredIncomes = filterIncomes(incomes);
  const sortedIncomes = sortIncomes(filteredIncomes);

  return (
    <MainLayout>
      <h1 className="title">Quản lý thu nhập</h1>
      <ul className="breadcrumbs mb-6">
        <li><a href="/home">Home</a></li>
        <li className="divider">/</li>
        <li><a href="/Incomes" className="active">Thu nhập</a></li>
      </ul>
      <div className="flex justify-between items-center">
  <button
    onClick={() => {
      setSelectedIncome(null);
      setAmount(0);
      setDescription('');
      setSourceId('');
      setDate(null);
      setShowModal(true);
    }}
    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
  >
    Thêm mới
  </button>

  <div className="flex space-x-4">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">Tất cả</option>
      <option value="day">Hôm nay</option>
      <option value="week">Tuần này</option>
      <option value="month">1 Tháng</option>
      <option value="3months">3 Tháng</option>
      <option value="6months">6 Tháng</option>
      <option value="year">1 Năm</option>
    </select>

    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="asc">Ngày tăng dần</option>
      <option value="desc">Ngày giảm dần</option>
    </select>
  </div>
</div>



      {/* Modal Thêm/Sửa thu nhập */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 relative max-h-[500px] overflow-y-auto mt-12">
            <h2 className="text-xl font-semibold mb-4">
              {selectedIncome ? 'Cập nhật thu nhập' : 'Thêm thu nhập mới'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Số tiền:</label>
                <input
                  value={amount}
                  id="amount"
                  type="number"
                  onFocus={(e) => {
                    if (e.target.value.startsWith('0')) {
                      e.target.value = e.target.value.replace(/^0+/, '');
                    }
                  }}
                  onChange={(e) => {
                    setAmount(Number(e.target.value))
                  }}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Mô tả:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sourceId" className="block text-gray-700 font-medium mb-2">Danh mục:</label>
                <select
                  id="sourceId"
                  value={sourceId}
                  onChange={(e) => setSourceId(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn danh mục</option>
                  {sources.map((sources) => (
                    <option key={sources.id} value={sources.id}>{sources.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Ngày thu nhập:</label>
                <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  dateFormat="yyyy/MM/dd"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                  {selectedIncome ? 'Cập nhật' : 'Thêm mới'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
                >
                  Đóng
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

     {/* Danh sách thu nhập */}
<div className="mt-8">
<ul className="space-y-4">
  {sortedIncomes.map((income) => (
    <li
      key={income.id}
      className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-teal-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 transition-all"
    >
      {/* Phần thông tin thu nhập */}
      <div className="flex-1">
        <strong className="text-xl text-blue-700 font-semibold">{income.description}</strong>
        <p className="text-lg text-gray-800">{income.amount} VND</p>
        <p className="text-sm text-gray-600">{income.sourceId}</p> {/* Hiển thị nguồn thu nhập */}
        <p className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</p> {/* Định dạng ngày */}
      </div>
      
      {/* Phần nút Sửa và Xóa */}
      <div className="flex space-x-4 ml-4">
        <button
          onClick={() => handleEdit(income)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-colors duration-200"
        >
          <i className="bx bxs-edit-alt"></i>
        </button>
        <button
          onClick={() => handleDelete(income.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors duration-200"
        >
          <i className="bx bxs-trash"></i>
        </button>
      </div>
    </li>
  ))}
</ul>

</div>

    </MainLayout>
  );
};

export default IncomesPage;

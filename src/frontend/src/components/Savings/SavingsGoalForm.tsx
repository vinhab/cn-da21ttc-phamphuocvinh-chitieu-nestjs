import React, { useState, useEffect } from "react";
import axios from "axios";

interface SavingsGoalFormProps {
  userId: string;
}

const SavingsGoalForm: React.FC<SavingsGoalFormProps> = ({ userId }) => {
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [monthYear, setMonthYear] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    setMonthYear(`${year}-${month}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (targetAmount <= 0) {
      setError("Vui lòng nhập số tiền mục tiêu.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4200/savings-goal", {
        userId,
        targetAmount,
        monthYear,
      });

      console.log("Mục tiêu tiết kiệm đã được tạo:", response.data);
      setTargetAmount(0);
      setError("");
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-lg shadow-xl">
  <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Thiết lập mục tiêu</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block text-lg text-gray-700 font-medium">Số tiền mục tiêu:</label>
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(Number(e.target.value))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
    >
      Lưu Mục Tiêu
    </button>
    {error && <p className="text-red-600 text-center text-lg">{error}</p>}
  </form>
</div>

  );
};

export default SavingsGoalForm;

import React, { useEffect, useState } from "react";
import axios from "axios";


interface SavingsGoal {
  userId: string;
  targetAmount: number;
  monthYear: string;
  createdAt: string;
  updatedAt: string;
}

interface SavingsGoalDisplayProps {
  userId: string;
}

const SavingsGoalDisplay: React.FC<SavingsGoalDisplayProps> = ({ userId }) => {
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSavingsGoal = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/savings-goal/${userId}/2025-01`
        );
        setSavingsGoal(response.data);
      } catch (err) {
        setError("Không tìm thấy mục tiêu tiết kiệm.");
      }
    };

    fetchSavingsGoal();
  }, [userId]);

  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg shadow-xl">
    <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Mục Tiêu Tháng</h2>
    {error ? (
      <p className="text-center text-red-600 font-semibold text-lg">{error}</p>
    ) : savingsGoal ? (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xl text-gray-700">Mục tiêu:</p>
          <p className="text-xl font-semibold text-green-600">
            {savingsGoal.targetAmount} VND
          </p>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Ngày tạo:</strong> {new Date(savingsGoal.createdAt).toLocaleString()}</p>
          <p><strong>Ngày cập nhật:</strong> {new Date(savingsGoal.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-600 text-lg">Chưa có mục tiêu tiết kiệm cho tháng này.</p>
    )}
  </div>
  
  );
};

export default SavingsGoalDisplay;

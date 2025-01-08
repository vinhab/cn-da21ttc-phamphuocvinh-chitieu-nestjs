import React, { useEffect, useState } from "react";
import axios from "axios";

interface Recommendation {
  totalIncome: number;
  totalExpense: number;
  targetSavings: number;
  recommendedSpending: number;
}

interface RecommendationDisplayProps {
  userId: string;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ userId }) => {
  // Cập nhật kiểu dữ liệu của recommendation để cho phép null
  const [recommendation, setRecommendation] = useState<Recommendation | string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4200/monthly-summary/${userId}`
        );
        setRecommendation(response.data);
        setError(""); // Clear error if request is successful
      } catch (err) {
        setError("Không thể lấy khuyến nghị.");
        setRecommendation(null); // Clear the previous data if error occurs
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchRecommendation();
  }, [userId]);

  const getRecommendationText = () => {
    if (typeof recommendation === "string") return recommendation;

    if (!recommendation) {
      return { text: "Không có dữ liệu khuyến nghị.", colorClass: "text-gray-600" };
    }

    const { totalIncome, totalExpense, targetSavings, recommendedSpending } = recommendation;

    if (totalIncome < totalExpense) {
      return {
        text: `Thu nhập của bạn là ${totalIncome} VND nhưng chi tiêu vượt quá mức, là ${totalExpense} VND. Hãy cân nhắc lại chi tiêu để tránh thiếu hụt tài chính.`,
        colorClass: "text-red-600",
      };
    }

    if (totalExpense > recommendedSpending) {
      return {
        text: `Chi tiêu thực tế của bạn vượt quá mức khuyến nghị. Hãy xem xét giảm bớt các khoản chi tiêu không cần thiết.`,
        colorClass: "text-yellow-600",
      };
    }

    if (totalIncome * 0.2 < targetSavings) {
      const additionalSavingsNeeded = targetSavings - (totalIncome * 0.2);
      return {
        text: `Mục tiêu tiết kiệm của bạn là ${targetSavings} VND, tuy nhiên bạn chỉ tiết kiệm được ${totalIncome * 0.2} VND. Hãy tăng cường tiết kiệm thêm ${additionalSavingsNeeded} VND mỗi tháng.`,
        colorClass: "text-yellow-600",
      };
    }

    return {
      text: `Chúc mừng bạn đã đạt mục tiêu tiết kiệm! Hãy tiếp tục duy trì thói quen tiết kiệm.`,
      colorClass: "text-green-600",
    };
  };

  const recommendationText = getRecommendationText();

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
  {loading ? (
    <p className="text-center text-gray-600 text-xl animate-pulse">Đang tải...</p>
  ) : error ? (
    <p className="text-center text-red-600 text-xl font-semibold">{error}</p>
  ) : typeof recommendationText === "string" ? (
    <p className="text-center text-gray-700 text-lg">{recommendationText}</p>
  ) : (
    <p className={`text-lg text-center ${recommendationText.colorClass} font-medium`}>
      {recommendationText.text}
    </p>
  )}
</div>

  );
};

export default RecommendationDisplay;

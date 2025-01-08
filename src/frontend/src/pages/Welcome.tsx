import React from 'react';
import WLHeader from '../components/WLHeader';

const WelcomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <WLHeader />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Quản lý Chi Tiêu Cá Nhân!</h1>
        <p className="text-lg mb-8 max-w-2xl">
          Đây là công cụ giúp bạn theo dõi thu nhập, chi tiêu và tiết kiệm. Giao diện dễ sử dụng và các tính năng mạnh mẽ, giúp bạn đạt được mục tiêu tài chính của mình một cách hiệu quả.
        </p>

        {/* Danh sách tính năng */}
        <ul className="text-left mb-8 space-y-2">
          <li>✅ Theo dõi chi tiêu hàng ngày dễ dàng</li>
          <li>✅ Kiểm tra các khoản thu nhập và chi phí chi tiết</li>
          <li>✅ Thiết lập mục tiêu tiết kiệm và theo dõi tiến độ</li>
          <li>✅ Quản lý chi tiêu theo danh mục và phân tích trực quan</li>
        </ul>

        {/* Nút bắt đầu */}
        <a
          href="/home"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100"
        >
          Bắt đầu ngay
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Quản lý Chi Tiêu Cá Nhân. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;

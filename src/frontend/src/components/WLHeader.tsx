import React from 'react';

const WLHeader: React.FC = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    window.location.href = '/'; // Chuyển hướng về trang đăng nhập
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">CCCN</h1>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Thông tin
              </a>
            </li>
            <li>
              <a href="/home" className="hover:underline">
                Quản lý chi tiêu
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Liên hệ
              </a>
            </li>
            <li>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="hover:underline bg-transparent border-none cursor-pointer"
                >
                  Đăng xuất
                </button>
              ) : (
                <a href="/login" className="hover:underline">
                  Đăng nhập
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default WLHeader;

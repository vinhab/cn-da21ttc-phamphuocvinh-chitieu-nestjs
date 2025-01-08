import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import axios from "axios";

interface User {
  name: string;
  avatar: string;
  username: string;
  balance: number;
}

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Lấy thông tin người dùng khi trang load
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/users/${userId}`);
        setUser(response.data); // Giả sử userId được lưu trong localStorage
      } catch (error) {
        setError("Không thể lấy thông tin người dùng");
      }
    };
    fetchUser();
  }, [userId]);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
  };

  return (
    <nav className="home">
      <i className="bx bx-menu toggle-sidebar" onClick={toggleSidebar}></i>
      <form action="/">
        <div className="form-group">
          <input type="text" placeholder="Search..." />
          <i className="bx bx-search icon"></i>
        </div>
      </form>
      <a href="/" className="nav-link">
        <i className="bx bxs-bell icon"></i>
        <span className="badge">20</span>
      </a>
      <a href="/" className="nav-link">
        <i className="bx bxs-message-square-dots icon"></i>
        <span className="badge">30</span>
      </a>
      <span className="divider"></span>
      <div className="profile">
        <a onClick={toggleProfileMenu} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleProfileMenu()}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
            alt="Profile"
            width={40} // Adjust width as necessary
            height={40} // Adjust height as necessary
          />
        </a>
        <ul className={`profile-link ${isProfileOpen ? 'show' : ''}`}>
          <li><a href="/profile"><i className="bx bxs-user-circle icon"></i> Thông tin</a></li>
          <li><a href="/"><i className="bx bxs-cog"></i> Cài đặt</a></li>
          <li><LogoutButton onClick={handleLogout}><i className="bx bxs-log-out-circle"></i>Đăng xuất</LogoutButton></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

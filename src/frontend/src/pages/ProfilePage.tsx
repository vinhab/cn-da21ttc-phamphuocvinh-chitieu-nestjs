import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: string;
  avatar: string;
  username: string;
  balance: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Không thể lấy thông tin người dùng');
      }
    };
    fetchUser();
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleAvatarChange = async () => {
    if (file && user) {
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      try {
        const response = await axios.put(`http://localhost:4200/users/${userId}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setUser((prevUser) => (prevUser ? { ...prevUser, avatar: response.data.avatar } : prevUser));
        setFile(null);
      } catch (error) {
        setError('Cập nhật ảnh thất bại');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditProfile = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(`http://localhost:4200/users/${userId}`, {
          name: newName || user?.name,
          username: newUsername || user?.username,
        });

        setUser(response.data);
        setError(null);
      } catch (error) {
        setError('Cập nhật thông tin thất bại');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChangePassword = async () => {
    if (newPassword !== newPasswordConfirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      await axios.put(`http://localhost:4200/users/${userId}/password`, {
        oldPassword: newPassword,
        newPassword: newPassword,
      });
      setError(null);
      alert('Mật khẩu đã được thay đổi thành công');
    } catch (error) {
      setError('Thay đổi mật khẩu thất bại');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {user && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Thông tin người dùng</h2>
          <div className="flex items-center mb-4">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <input type="file" onChange={handleFileChange} className="border px-3 py-2 rounded" />
            <button
              onClick={handleAvatarChange}
              disabled={loading}
              className="ml-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              {loading ? 'Đang tải...' : 'Update'}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Tên:</label>
            {isEditing ? (
              <input
                type="text"
                value={newName || user.name}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full"
              />
            ) : (
              <span>{user.name}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Tên đăng nhập:</label>
            {isEditing ? (
              <input
                type="text"
                value={newUsername || user.username}
                onChange={(e) => setNewUsername(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full"
                readOnly
              />
            ) : (
              <span>{user.username}</span>
            )}
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-3"
          >
            Chỉnh sửa thông tin
          </button>

          {showEditModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin</h2>
                <input
                  type="text"
                  value={newName || user.name}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Tên"
                  className="mb-4 px-3 py-2 border rounded w-full"
                />
                <input
                  type="text"
                  value={newUsername || user.username}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Tên người dùng"
                  className="mb-4 px-3 py-2 border rounded w-full"
                  readOnly
                />
                <button
                  onClick={handleEditProfile}
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                  Lưu thay đổi
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            Đổi mật khẩu
          </button>

          {showPasswordModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới"
                  className="mb-4 px-3 py-2 border rounded w-full"
                />
                <input
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  placeholder="Xác nhận mật khẩu"
                  className="mb-4 px-3 py-2 border rounded w-full"
                />
                <button
                  onClick={handleChangePassword}
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                  Lưu thay đổi
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

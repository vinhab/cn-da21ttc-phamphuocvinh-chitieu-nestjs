import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  // Kiểm tra nếu không có token thì chuyển hướng đến trang login
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    jwtDecode(token); // Kiểm tra tính hợp lệ của token
    return <>{children}</>;
  } catch (error) {
    // Token không hợp lệ, chuyển hướng đến trang login
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

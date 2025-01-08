// LogoutButton.tsx
import React from 'react';

interface LogoutButtonProps {
  onClick: () => void;
  children?: React.ReactNode; // Cho phép nhận children (nội dung nút)
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick, children }) => {
  return (
    <a onClick={onClick}>
      {children}  {/* Hiển thị nội dung của nút */}
    </a>
  );
};

export default LogoutButton;

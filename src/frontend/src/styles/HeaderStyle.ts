import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background-color: #fff; /* Màu xanh nhẹ */
  padding: 20px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Logo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1775F1;
`;

export const Navigation = styled.nav`  /* Đổi tên Nav thành Navigation */
  ul {
    display: flex;
    list-style: none;
    gap: 20px;
  }

  li {
    font-size: 16px;
  }
`;

export const NavLink = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: transparent; /* Không có nền màu trắng */
    color: #1e40af; /* Màu khi hover */
  }
`;

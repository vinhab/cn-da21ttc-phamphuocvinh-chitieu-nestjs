import styled from 'styled-components';

// Wrapper cho toàn bộ trang
export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #EDE4FF;  /* Nền màu tím nhạt */
  font-family: 'Poppins', sans-serif;
  color: #6528F7;  /* Chữ màu tím đậm */
`;

// Phần hero banner
export const HeroSection = styled.section`
  background: linear-gradient(to right, #6528F7, #A076F9);  /* Nền gradient từ tím đậm đến tím nhạt */
  color: white;
  padding: 100px 20px;
  text-align: center;
  flex-grow: 1;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);  /* Thêm bóng mờ cho phần header */
`;

// Tiêu đề chính
export const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: 1px;
  color: #EDE4FF;  /* Màu chữ nhẹ nhàng cho tiêu đề */
`;

// Mô tả về trang
export const Description = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 30px;
  line-height: 1.6;
  color: #A076F9;  /* Màu chữ tím nhạt cho mô tả */
`;

// Danh sách tính năng
export const FeaturesList = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 30px;
  color: #D7BBF5;  /* Màu chữ tím nhạt cho danh sách tính năng */
  text-align: left;

  li {
    margin-bottom: 10px;
  }
`;

// Nút bắt đầu
export const StartButton = styled.a`
  background-color: #A076F9;
  padding: 15px 30px;
  color: white;
  font-size: 1.25rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #D7BBF5;  /* Nền khi hover chuyển sang màu sáng hơn */
    transform: translateY(-5px);
  }
`;

// Footer
export const Footer = styled.footer`
  background-color: #6528F7;  /* Màu tím đậm cho footer */
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
  font-size: 1rem;
  font-weight: 300;
  border-top: 1px solid #A076F9;  /* Đường viền sáng hơn cho footer */
`;

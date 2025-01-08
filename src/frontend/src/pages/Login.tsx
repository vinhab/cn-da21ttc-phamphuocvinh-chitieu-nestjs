import React, { useState } from 'react';
import axios from 'axios';
import {
  Wrapper,
  LoginBox,
  LoginHeader,
  InputField,
  ForgotSection,
  Section,
  SubmitButton,
  SignUpLink,
} from '../styles/LoginStyle';
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4200/auth/login', {
        username,
        password,
      });

      setToken(response.data.access_token); // Lưu token vào state
      localStorage.setItem('token', response.data.access_token); // Lưu token vào localStorage
      const giaimatoken = jwtDecode(response.data.access_token);
      const userId = giaimatoken.sub;

      if(userId) {
        localStorage.setItem('userId', userId);
      }
      
      window.location.href = '/'; // Chuyển hướng sang trang dashboard
    } catch (err) {
      if (axios.isAxiosError(err)) {
          alert('Thông tin tài khoản hoặc mật khẩu không chính xác!');
      } else {
        alert('Lỗi chưa xác định');
      }
      console.error('Login failed:', err);
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <LoginHeader>
          <header>Login</header>
        </LoginHeader>
        <div className="input-box">
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <ForgotSection>
          <Section>
            <input
              type="checkbox"
              id="check"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="check">Remember me</label>
          </Section>
          <Section>
            <a href="/">Forgot password?</a>
          </Section>
        </ForgotSection>
        <div className="input-submit">
          <SubmitButton onClick={handleLogin}>
            <label>Login</label>
          </SubmitButton>
        </div>
        <SignUpLink>
          Don't have an account? <a href="/signup">Sign up</a>
        </SignUpLink>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;

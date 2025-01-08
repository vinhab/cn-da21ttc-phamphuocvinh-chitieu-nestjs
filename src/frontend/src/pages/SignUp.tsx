import React, { useState } from 'react';
import {
  Wrapper,
  LoginBox,
  LoginHeader,
  InputField,
  SubmitButton,
  SignUpLink,
} from '../styles/LoginStyle';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp.');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:4200/auth/register', {
        username,
        password,
      });

      alert('Đăng ký thành công!');

      // Đăng nhập tự động sau khi đăng ký thành công
      const loginResponse = await axios.post('http://localhost:4200/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', loginResponse.data.access_token);
      window.location.href = '/';
    } catch (err: any) {
      alert(err.response?.data?.message || 'Đăng ký không thành công.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <LoginHeader>
          <header>Sign Up</header>
        </LoginHeader>
        <form onSubmit={handleSignUp}>
          <div className="input-box">
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="input-submit">
            <SubmitButton type="submit" disabled={isSubmitting} style={{
              color: isSubmitting ? '#666' : '#fff',
            }}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </SubmitButton>
          </div>
        </form>
        <SignUpLink>
          Already have an account? <a href="/login">Login</a>
        </SignUpLink>
      </LoginBox>
    </Wrapper>
  );
};

export default SignUp;

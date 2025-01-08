import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #dfdfdf;
  font-family: 'Poppins', sans-serif;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 440px;
  height: 480px;
  padding: 30px;
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin: 20px 0 40px;
  header {
    color: #333;
    font-size: 30px;
    font-weight: 600;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 60px;
  font-size: 17px;
  padding: 0 25px;
  margin-bottom: 15px;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.05);
  outline: none;
  transition: 0.3s;
  &:focus {
    width: 105%;
  }
  ::placeholder {
    font-weight: 500;
    color: #222;
  }
`;

export const ForgotSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  #check {
    margin-right: 10px;
  }
  a {
    color: #555;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 60px;
  background: #222;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  &:hover {
    background: #000;
    transform: scale(1.05, 1);
  }
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;

export const SignUpLink = styled.div`
  text-align: center;
  font-size: 15px;
  margin-top: 20px;
  a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
  }
`;
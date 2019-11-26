import styled from 'styled-components';
import { Input } from '../styling/form-styles';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 60px;
  width: 100%;
`;
export const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
`;

export const LoginInput = styled(Input)`
  margin-bottom: 25px;
`;

export const GuestLogin = styled.a`
  font-size: 0.6rem;
  margin-top: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.grey};
  cursor: pointer;
  background: none;
  border: none;
  :hover {
    border-bottom: 1px solid ${({ theme }) => theme.grey};
  }
`;

export const SubHeader = styled.div`
  color: ${({ theme }) => theme.grey};
  font-size: 0.6rem;
  margin-bottom: 10px;
`;
export const RegisterLink = styled(Link)`
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  :hover {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

export const ErrorDisplay = styled.div`
  font-size: 0.5rem;
  background-color: ${({ error }) => (error ? '#ff7d7a' : 'transparent')};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 208px;
  height: 15px;
  border: transparent;
  border-radius: 5px;
  margin-bottom: 10px;
`;

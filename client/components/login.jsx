import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Submit } from './styling/form-styles';

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  margin-top:60px;
  width:100%;
`;
export const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom:15px;
`;

export const Form = styled.form`
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;
  margin-bottom:10px;
`;

export const Label = styled.label`
  /* color: ${({ theme }) => theme.blue}; */
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
`;

export const LoginInput = styled(Input)`
  margin-bottom:25px;
`;

export const StyledLink = styled(Link)`
  font-size:.6rem;
  margin-top:10px;
  text-decoration:none;
  color:${({ theme }) => theme.grey};
  :hover{
    border-bottom:1px solid ${({ theme }) => theme.grey};
  }
`;

export const SubHeader = styled.div`
  color: ${({ theme }) => theme.grey};
  font-size: .6rem;
  margin-bottom:15px;
`;
export const RegisterLink = styled(Link)`
  color: ${({ theme }) => theme.blue};
  text-decoration:none;
  :hover{
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Header>Login</Header>
        <SubHeader>
          Don&apos;t have an account?{' '}
          <RegisterLink to="/register">Register</RegisterLink>
        </SubHeader>
        <Form>
          <Label htmlFor="">
            Username
            <LoginInput name="username" type="text" />
          </Label>
          <Label htmlFor="">
            Password
            <LoginInput name="password" type="password" />
          </Label>
          <Submit type="button" value="Login" />
        </Form>
        <StyledLink to="/">Continue as a guest</StyledLink>
      </Container>
    );
  }
}

export default Login;

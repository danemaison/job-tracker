import React from 'react';
import http from '../lib/http';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Submit } from './styling/form-styles';
import AppContext from '../lib/context';

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
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }
  submit(e) {
    e.preventDefault();
    http
      .post('/api/login', this.state)
      .then(res => {
        if (res.token) {
          this.context.onLogin(true);
        }
      });
  }
  render() {
    const { username, password } = this.state;
    const { handleChange, submit } = this;
    if (this.context.isLoggedIn()) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Header>Login</Header>
        <SubHeader>
          Don&apos;t have an account?{' '}
          <RegisterLink to="/register">Register</RegisterLink>
        </SubHeader>
        <Form onSubmit={submit}>
          <Label>
            Username
            <LoginInput
              value={username}
              onChange={handleChange}
              name="username"
              type="text"
            />
          </Label>
          <Label>
            Password
            <LoginInput
              value={password}
              onChange={handleChange}
              name="password"
              type="password"
            />
          </Label>
          <Submit type="submit" value="Login" />
        </Form>
        <StyledLink to="/">Continue as a guest</StyledLink>
      </Container>
    );
  }
}

Login.contextType = AppContext;

export default Login;

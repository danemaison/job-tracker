import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Submit } from './styling/form-styles';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  margin-top:45px;
  width:100%:
  height:100--vh;
`;
const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom:10px;
`;

const Form = styled.form`
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;
  width:100%;
  margin-bottom:10px;
`;

const Label = styled.label`
  /* color: ${({ theme }) => theme.blue}; */
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
`;

const LoginInput = styled(Input)`
  margin-bottom:25px;
`;

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Header>Login</Header>
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
        <Link to="/">Continue as a guest</Link>
        {/* <Link to={Register}>Register</Link> */}
      </Container>
    );
  }
}

export default Login;

import React from 'react';
import http from '../lib/http';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Header,
  Form,
  Label,
  LoginInput,
  StyledLink,
  SubHeader,
  RegisterLink
} from './login';
import { Submit } from './styling/form-styles';
import AppContext from '../lib/context';

const RegisterInput = styled(LoginInput)`
  border-color: ${({ theme, error }) => error ? theme.red : theme.grey};
`;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validate);
  }
  validate() {
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return false;
    } else {
      this.setState({ error: '' });
    }
    return true;
  }
  submit(e) {
    e.preventDefault();
    if (!this.validate()) return false;
    const { username, password } = this.state;
    http
      .post('/api/register', { username, password })
      .then(() => this.context.onLogin(true));
  }
  render() {
    const { handleChange, submit } = this;
    const { username, password, confirmPassword, error } = this.state;
    if (this.context.isLoggedIn()) {
      return (
        <Redirect to='/' />
      );
    }
    return (
      <Container>
        <Header>Register</Header>
        <SubHeader>
          Have have an account? {' '}
          <RegisterLink to="/login">Login</RegisterLink>
        </SubHeader>
        <Form onSubmit={submit}>
          <Label>
            Username
            <RegisterInput
              required
              value={username}
              name="username"
              type="text"
              onChange={handleChange}/>
          </Label>
          <Label>
            Password
            <RegisterInput
              error={error}
              required
              value={password}
              name="password"
              type="password"
              onChange={handleChange} />
          </Label>
          <Label>
            Confirm Password
            <RegisterInput
              error={error}
              required
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={handleChange}/>
          </Label>
          <Submit type="submit" value="Register" />
        </Form>
        <StyledLink to="/">Continue as a guest</StyledLink>
      </Container>
    );
  }
}

Register.contextType = AppContext;

export default Register;

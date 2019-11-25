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
  SubHeader,
  RegisterLink,
  ErrorDisplay
} from './login';
import { Submit } from './styling/form-styles';
import AppContext from '../lib/context';

const RegisterInput = styled(LoginInput)`
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
      .then(res => {
        if (res.error) {
          this.setState({ error: res.error });
        } else this.context.onLogin(true);
      });
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
          Have have an account? <RegisterLink to="/login">Login</RegisterLink>
        </SubHeader>
        <ErrorDisplay error={error}>{error}</ErrorDisplay>
        <Form onSubmit={submit}>
          <Label>
            Username
            <RegisterInput
              required
              value={username}
              name="username"
              type="text"
              onChange={handleChange}
            />
          </Label>
          <Label>
            Password
            <RegisterInput
              required
              value={password}
              name="password"
              type="password"
              onChange={handleChange}
            />
          </Label>
          <Label>
            Confirm Password
            <RegisterInput
              required
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            />
          </Label>
          <Submit type="submit" value="Register" />
        </Form>
      </Container>
    );
  }
}

Register.contextType = AppContext;

export default Register;

import React from 'react';
import http from '../lib/http';
import { Redirect } from 'react-router-dom';
import { Submit } from './styling/form-styles';
import AppContext from '../lib/context';
import {
  Container,
  Header,
  Form,
  Label,
  LoginInput,
  GuestLogin,
  SubHeader,
  RegisterLink,
  ErrorDisplay
} from './ui/login-form';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
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
        if (res.error) {
          this.setState({ error: res.error });
        } else this.context.onLogin(true);
      });
  }
  guestLogin() {
    http
      .post('/api/guest-login')
      .then(res => {
        if (res) this.context.onLogin(true);
      });
  }
  render() {
    const { username, password, error } = this.state;
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
        <ErrorDisplay error={error}>{error}</ErrorDisplay>
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
        <GuestLogin onClick={this.guestLogin}>Continue as a guest</GuestLogin>
      </Container>
    );
  }
}

Login.contextType = AppContext;

export default Login;

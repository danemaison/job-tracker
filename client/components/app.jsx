import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Client from './client';
import Login from './login';
import Register from './register';
import { ThemeProvider } from 'styled-components';
import { theme } from './styling/theme';
import AppContext from '../lib/context';
import Nav from './nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.contextValue = {
      onLogin: this.onLogin.bind(this),
      isLoggedIn: this.isLoggedIn.bind(this)
    };
  }
  onLogin(value) {
    this.setState({ loggedIn: value });
  }
  isLoggedIn() {
    return this.state.loggedIn === true;
  }
  render() {
    return (
      <AppContext.Provider value={this.contextValue}>
        <ThemeProvider theme={theme}>
          <Nav />
          <Router>
            <Route exact path="/" component={Client} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}

export default App;

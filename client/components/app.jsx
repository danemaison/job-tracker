import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Client from './client';
import Login from './login';
import { ThemeProvider } from 'styled-components';
import { theme } from './styling/theme';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={Client} />
          <Route exact path="/login" component={Login} />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;

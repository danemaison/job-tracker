import React from 'react';
import Dashboard from './dashboard';
import AddApplicationButton from './ui/add-button';
import { ThemeProvider } from 'styled-components';
import { theme } from './styling/theme';
import AddApp from './add-application';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addApp: false
    };
    this.toggleAddApp = this.toggleAddApp.bind(this);
  }
  toggleAddApp() {
    const { addApp } = this.state;
    this.setState({ addApp: !addApp });
  }
  render() {
    const { addApp } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Dashboard />
        <AddApp open={addApp} />
        <AddApplicationButton open={addApp} click={this.toggleAddApp}/>
      </ThemeProvider>
    );
  }
}

export default App;

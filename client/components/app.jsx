import React from 'react';
import Dashboard from './dashboard';
import AddApplicationButton from './ui/add-button';
import { ThemeProvider } from 'styled-components';
import { theme } from './styling/theme';
import Modal from './add-application';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editing: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(e, data) {
    console.log(data);
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }
  render() {
    const { modalOpen, editing } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Dashboard toggleModal={this.toggleModal}/>
        <Modal open={modalOpen} editing={editing}/>
        <AddApplicationButton open={modalOpen} toggleModal={this.toggleModal} />
      </ThemeProvider>
    );
  }
}

export default App;

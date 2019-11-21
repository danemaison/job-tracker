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
      editingData: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(e, data) {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen, editingData: data || null });
  }
  render() {
    const { modalOpen, editingData } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Dashboard toggleModal={this.toggleModal}/>
        <Modal open={modalOpen} editingData={editingData} toggleModal={this.toggleModal}/>
        <AddApplicationButton open={modalOpen} toggleModal={this.toggleModal} />
      </ThemeProvider>
    );
  }
}

export default App;

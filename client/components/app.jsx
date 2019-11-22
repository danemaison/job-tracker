import React from 'react';
import Dashboard from './dashboard';
import ToggleModalButton from './ui/add-button';
import { ThemeProvider } from 'styled-components';
import { theme } from './styling/theme';
import Modal from './add-application';
import http from '../lib/http';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: null,
      modalOpen: false,
      editingData: null
    };
    this.getApplications = this.getApplications.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(e, data) {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen, editingData: data || null });
  }
  getApplications() {
    http
      .get('/api/applications')
      .then(applications => this.setState({ applications }));
  }
  componentDidMount() {
    this.getApplications();
  }
  render() {
    const { modalOpen, editingData, applications } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Dashboard applications={applications} toggleModal={this.toggleModal}/>
        <Modal getApplications={this.getApplications} open={modalOpen} editingData={editingData} toggleModal={this.toggleModal}/>
        <ToggleModalButton open={modalOpen} toggleModal={this.toggleModal} />
      </ThemeProvider>
    );
  }
}

export default App;

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
    this.updateApplications = this.updateApplications.bind(this);
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
  updateApplications(data, id) {
    const { applications } = this.state;
    if (id) {
      data.id = id;
      applications.unshift(data);
      this.setState({ applications });
      return;
    }
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === data.id) {
        applications[i] = data;
        this.setState({ applications });
        return;
      }
    }
  }
  componentDidMount() {
    this.getApplications();
  }
  render() {
    const { modalOpen, editingData, applications } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Dashboard applications={applications} toggleModal={this.toggleModal}/>
        <Modal updateApplications={this.updateApplications} open={modalOpen} editingData={editingData} toggleModal={this.toggleModal}/>
        <ToggleModalButton open={modalOpen} toggleModal={this.toggleModal} />
      </ThemeProvider>
    );
  }
}

export default App;

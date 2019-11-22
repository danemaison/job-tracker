import React from 'react';
import styled from 'styled-components';
import http from '../lib/http';
import Application from './templates/application-template';
import StatusCard from './templates/status-card';
import { Container, TableRow, Title, Row } from './ui/elements';

const Client = styled(Container)`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow:hidden;
`;
const Applications = styled(Container)`
  min-height:0;
  overflow-y: auto;
  >div:last-child{
    margin-bottom:60px;
  }
`;

const Cell = styled.div`
  color: ${({ theme }) => theme.grey};
`;

const HeaderRow = styled(TableRow)`
  box-shadow: none;
  margin:25px 0;
  margin-bottom:0;
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: null
    };
  }
  componentDidMount() {
    http
      .get('/api/applications')
      .then(applications => this.setState({ applications }));
  }
  countApplications() {
    const { applications } = this.state;
    const appCounts = {
      applied: 0,
      waiting: 0,
      interview: 0,
      rejected: 0

    };
    for (let app of applications) {
      appCounts.applied++;
      appCounts[app.status]++;
    }
    return appCounts;
  }
  render() {
    const { applications } = this.state;
    if (!applications) {
      return (
        <Client>
          <Title>Dashboard</Title>
          <Row>
            <h3>No applications</h3>
          </Row>
        </Client>
      );
    }
    const appCounts = this.countApplications();
    const { toggleModal } = this.props;
    return (
      <Client>
        <Title>Dashboard</Title>
        <Row>
          {Object.keys(appCounts).map((item, index) => (
            <StatusCard key={index} title={item} count={appCounts[item]} />
          ))}
        </Row>
        <HeaderRow>
          <Cell>Company</Cell>
          <Cell>Applied</Cell>
          <Cell>Status</Cell>
          <Cell>Interview</Cell>
        </HeaderRow>
        <Applications>
          {applications.map(application => (
            <Application toggleModal={toggleModal} key={application.id} data={application} />
          ))}
        </Applications>
      </Client>
    );
  }
}

export default Dashboard;

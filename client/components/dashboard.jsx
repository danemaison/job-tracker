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
  height:0;
  cursor: default;
  margin-top:25px;
  margin-bottom:15px;
`;

const HeaderCardRow = styled(Row)`
  width:94%;
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredApps: null
    };
    this.filter = this.filter.bind(this);
  }
  // componentDidMount() {
  //   http
  //     .get('/api/applications')
  //     .then(applications => this.setState({ applications }));
  // }
  countApplications() {
    const { applications } = this.props;
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
  filter(title) {
    if (title === 'applied') return this.setState({ filteredApps: null });

    const { applications } = this.props;
    const filteredApps = applications.filter(item => item.status === title);
    this.setState({
      filteredApps: filteredApps
    });
  }
  createElements(applications) {
    const { toggleModal } = this.props;
    return applications.map(application => (
      <Application toggleModal={toggleModal} key={application.id} data={application} />
    ));
  }
  render() {
    const { applications } = this.props;
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

    const { filteredApps } = this.state;
    return (
      <Client>
        <Title>Dashboard</Title>
        <HeaderCardRow>
          {Object.keys(appCounts).map((item, index) => (
            <StatusCard filter={this.filter} key={index} title={item} count={appCounts[item]} />
          ))}
        </HeaderCardRow>
        <HeaderRow>
          <Cell>Company</Cell>
          <Cell>Applied</Cell>
          <Cell>Status</Cell>
          <Cell>Interview</Cell>
        </HeaderRow>
        <Applications>
          {filteredApps
            ? this.createElements(filteredApps)
            : this.createElements(applications)}
        </Applications>
      </Client>
    );
  }
}

export default Dashboard;

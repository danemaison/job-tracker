import React from 'react';
import styled from 'styled-components';
import Application from './templates/application-template';
import StatusCard from './templates/status-card';
import { Container, TableRow, Title, Row } from './ui/elements';
import { AddButton } from './ui/add-button';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Client = styled(Container)`
  margin-top:35px;
  height: calc(100vh - 35px);
  height: calc(var(--vh, 1vh) * 100 - 35px);
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

const Loader = styled.img`
  margin-top:35px;
  width:30px;
  height:30px;
`;

const Prompt = styled.div`
line-height:50px;
  text-align:center;
  font-size: 1rem;
  font-weight:400;

`;
const TapPrompt = styled.div`
  font-size:.5rem;
  margin-bottom: 15px;
  margin-left:2px;
  margin-top:-10px;
  text-align:left;
  color: ${({ theme }) => theme.grey};
  width:94%;
`;

const HeaderWrapper = styled.div`
  width: 94%;
  display:flex;
  align-items:center;
  margin: 0 auto;
`;
const TitleDiv = styled.div`
  display:inline-block;
  width:50%;
`;
const SearchDiv = styled.div`
  position:relative;
  display:inline-block;
  text-align:right;
  width:50%;
`;
const Search = styled.input`
  font-size:.6rem;
  color: ${({ theme }) => theme.grey};
  border: 1px solid ${({ theme }) => theme.grey};
  width: 75%;
  padding: 5px 10px;
  border-radius: 15px;
  height: 15px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position:absolute;
  font-size:.8rem;
  color: ${({ theme }) => theme.grey};
  top:6px;
  right:11px;
`;
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredApps: null,
      search: ''
    };
    this.filter = this.filter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
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
  filter(title, company) {
    const { applications } = this.props;
    let filteredApps = null;
    if (title === 'applied') return this.setState({ filteredApps });

    if (company) {
      filteredApps = applications.filter(item =>
        item.company.toLowerCase().includes(company.toLowerCase())
      );
    } else {
      filteredApps = applications.filter(item => item.status === title);
    }

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
  handleSearch(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    if (!value) {
      this.filter('applied');
      return;
    }
    this.filter(false, value);
  }
  render() {
    const { applications } = this.props;
    if (!applications) {
      return (
        <Client>
          <Title>Dashboard</Title>
          <Row>
            <Loader src="/loader.gif" />
          </Row>
        </Client>
      );
    } else if (!applications.length) {
      return (
        <Client>
          <Title>Dashboard</Title>
          <Row>
            <Prompt>
              Click the <br/>
              <AddButton icon={faPlus}/> <br/>
              below to start tracking an application
            </Prompt>
          </Row>
        </Client>
      );
    }
    const appCounts = this.countApplications();
    const { handleSearch } = this;
    const { filteredApps, search } = this.state;
    return (
      <Client>
        <HeaderWrapper>
          <TitleDiv>
            <Title>Dashboard</Title>
            <TapPrompt>Tap to filter by status</TapPrompt>
          </TitleDiv>
          <SearchDiv>
            <Search
              type="text"
              name="search"
              onChange={handleSearch}
              placeholder="Search for a company"
              value={search}
            />
            <SearchIcon icon={faSearch}/>
          </SearchDiv>
        </HeaderWrapper>
        <HeaderCardRow>
          {Object.keys(appCounts).map((item, index) => (
            <StatusCard
              filter={this.filter}
              key={index}
              title={item}
              count={appCounts[item]}
            />
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

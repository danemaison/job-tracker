import React from 'react';
import styled from 'styled-components';
import http from '../lib/http';
import AppContext from '../lib/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const NavBar = styled.nav`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:50px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  *{
    width:33.333%;
  }
`;

const Brand = styled.img`
  width: 75px;
`;

const LogoutDiv = styled.div`
  margin-top:-2px;
  text-align:right;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-right: 15px;
`;

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.sendLogout = this.sendLogout.bind(this);
  }
  sendLogout() {
    http
      .post('/api/logout')
      .then(res => {
        this.context.onLogin(false);
      });
  }
  render() {
    return (
      <LogoutDiv>
        <StyledIcon onClick={this.sendLogout} icon={faDoorOpen}/>
      </LogoutDiv>
    );
  }
}

class Nav extends React.Component {
  render() {
    return (
      <NavBar>
        <div />
        <Brand src="/job_hunt.svg" />
        {this.context.isLoggedIn()
          ? <Logout/>
          : <div/>}
      </NavBar>
    );
  }
}

Logout.contextType = AppContext;
Nav.contextType = AppContext;

export default Nav;

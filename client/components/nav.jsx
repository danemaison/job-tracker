import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:50px;
  display:flex;
  align-items:center;
  justify-content:space-between;
`;

const Logout = styled.a`

`;
const Brand = styled.img`
  width: 75px;
`;

class Nav extends React.Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <NavBar>
        <div />
        <Brand src="/job_hunt.svg" />
        {loggedIn
          ? <Logout>logout</Logout>
          : <div/>
        }
      </NavBar>
    );
  }
}

export default Nav;

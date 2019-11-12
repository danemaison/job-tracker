import React from 'react';
import styled from 'styled-components';
import { Container, Title } from './ui/elements';

const Wrapper = styled(Container)`
  position:fixed;
  right:${({ open }) => open ? '0' : '-100%'};
  top:0;
  width:100%;
  height:100vh;
  background-color:white;
  z-index:1;
  transition: .25s ease-out;
`;
class AddApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { open } = this.props;
    return (
      <Wrapper open={open}>
        <Title>Add an Application</Title>
        <form onSubmit={this.submitForm}>
          <input type={Text}></input>
        </form>
      </Wrapper>
    );
  }
}

export default AddApp;

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddButton = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.blue};
  transition: .25s ease-out;
  transform: ${({ open }) => open ? 'rotate(135deg) ' : '0'};
`;

const Wrapper = styled.div`
  cursor:pointer;
  position: fixed;
  display:flex;
  justify-content:center;
  align-items:center;
  bottom: 35px;
  right: 20px;
  width:2.5rem;
  height:2.5rem;
  border-radius:10px;
  box-shadow: 1px 2px 4px rgba(0,0,0,.2);
  z-index:99;
  background-color:white;
`;

const AddApplication = ({ click, open }) => {
  return (
    <Wrapper>
      <AddButton open={open} icon={faPlus} onClick={click} />
    </Wrapper>
  );
};

export default AddApplication;

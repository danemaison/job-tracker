import React from 'react';
import styled from 'styled-components';
import { theme } from '../styling/theme';

const Card = styled.div`
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  flex-direction:column;
  width:3.5rem;
  height:3.75rem;
  border-radius:15px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .25);
`;

const Title = styled.div`
  text-transform: capitalize;
  font-size: .6rem;
  margin-bottom:2px;
`;
const Count = styled.div`
  font-weight:600;
  font-size:1rem;
  color: ${({ color }) => color};
`;
const Border = styled.div`
  margin-bottom: 4px;
  width: 25px;
  height: 1px;
  background-color: ${({ color }) => color};
`;
const Wrapper = styled.div`
  width:25%;
  display:flex;
  justify-content:center;
`;

const statusColors = {
  applied: theme.blue,
  rejected: theme.red,
  interview: theme.green,
  waiting: theme.yellow
};

const StatusCard = ({ title, count, filter }) => {
  return (
    <Wrapper>
      <Card onClick={() => filter(title)}>
        <Title>{title}</Title>
        <Border color={statusColors[title]}/>
        <Count color={statusColors[title]}>{count}</Count>
      </Card>
    </Wrapper>
  );
};

export default StatusCard;

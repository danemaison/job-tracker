import React from 'react';
import styled from 'styled-components';
import { TableRow } from '../ui/elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../styling/theme';
import
{ faTimesCircle,
  faCalendarCheck,
  faQuestionCircle,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

const Details = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`;
const Company = styled.div`
  font-weight: 600;
`;
const Position = styled.div`
margin-top:5px;
  font-size:.45rem;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size:1rem;
  color: ${({ color }) => color};
`;

const statusIcons = {
  rejected: { icon: faTimesCircle, color: theme.red },
  interview: { icon: faCalendarCheck, color: theme.green },
  waiting: { icon: faQuestionCircle, color: theme.yellow }
};

const Application = ({ data }) => {
  const { company, applied, status, interviewDate, position } = data;
  const applicationDate = new Date(applied);
  const formattedDate = `${applicationDate.getMonth()}/${applicationDate.getDay()}/${applicationDate.getFullYear()}`;
  return (
    <TableRow>
      <Details>
        <Company>{company}</Company>
        <Position>{position}</Position>
      </Details>
      <div>{formattedDate}</div>
      <div>
        <Icon
          color={statusIcons[status].color}
          icon={statusIcons[status].icon}
        />
      </div>
      <div>{interviewDate || '-/-/-'}</div>
      <div>
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </TableRow>
  );
};

export default Application;

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

const Company = styled.div`
  font-weight: 600;
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
  const { company, applied, status, interviewDate } = data;
  const applicationDate = new Date(applied);
  const formattedDate = `${applicationDate.getMonth()}/${applicationDate.getDay()}/${applicationDate.getFullYear()}`;
  return (
    <TableRow>
      <Company>{company}</Company>
      <div>{formattedDate}</div>
      <div>
        <Icon color={statusIcons[status].color} icon={statusIcons[status].icon}/>
      </div>
      <div>{interviewDate || '-/-/-'}</div>
      <div><FontAwesomeIcon icon={faEllipsisV}/></div>
    </TableRow>
  );
};

export default Application;

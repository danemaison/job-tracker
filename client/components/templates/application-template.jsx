import React from 'react';
import styled from 'styled-components';
import { TableRow } from '../ui/elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../styling/theme';
import
{ faTimesCircle,
  faCalendarCheck,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/format-date';

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

const Application = ({ toggleModal, data }) => {
  const {
    company,
    position,
    status,
    interviewDate: interview,
    applicationDate: applied
  } = data;

  const applicationDate = formatDate(applied);
  const interviewDate = interview && formatDate(interview);
  return (
    <TableRow onClick={e => toggleModal(e, data)}>
      <Details>
        <Company>{company}</Company>
        <Position>{position}</Position>
      </Details>
      <div>{applicationDate}</div>
      <div>
        <Icon
          color={statusIcons[status].color}
          icon={statusIcons[status].icon}
        />
      </div>
      <div>{interviewDate || '-/-/-'}</div>
    </TableRow>
  );
};

export default Application;

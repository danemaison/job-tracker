import React from 'react';
import {
  Wrapper,
  Form,
  Label,
  Input,
  TextArea,
  Radio,
  RadioRow,
  RadioLabel,
  ButtonWrapper,
  DatePickerWrapper,
  Submit,
  Cancel
} from './styling/form-styles';
import styled from 'styled-components';
import { Title } from './ui/elements';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import http from '../lib/http';
import { formatDate } from './utils/format-date';

const DeleteButton = styled.button`
  align-self:flex-end;
  margin-right:5%;
  color:white;
  background-color: ${({ theme }) => theme.red};
  padding:5px 15px;
  border-radius:5px;
  font-weight: 600;
  font-size: 0.9rem;
  border:1px solid ${({ theme }) => theme.red};
`;

class AddApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      company: '',
      position: '',
      applicationDate: '',
      status: 'waiting',
      interviewDate: '',
      notes: ''
    };
    this.handleApplicationDateChange = this.handleApplicationDateChange.bind(this);
    this.handleInterviewDayChange = this.handleInterviewDayChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleApplicationDateChange(day) {
    this.setState({ applicationDate: day });
  }
  handleInterviewDayChange(day) {
    this.setState({ interviewDate: day });
  }
  deleteApp(data) {
    const { toggleModal, updateApplications } = this.props;
    http
      .delete(`/api/applications?app_id=${data.id}`);
    updateApplications(data, data.id, true);
    toggleModal();
  }
  submit(e) {
    e.preventDefault();
    const { editingData, toggleModal, updateApplications } = this.props;
    const app = this.state;

    if (editingData) {
      http
        .put('/api/applications', app)
        .then(res => updateApplications(app));
    } else {
      http
        .post('/api/applications', app)
        .then(res => updateApplications(app, res.id));
    }
    toggleModal();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.editingData) {
        const { id, company, notes, position, status, applicationDate, interviewDate } = this.props.editingData;

        this.setState({
          id: id,
          company: company,
          position: position,
          applicationDate: formatDate(applicationDate),
          status: status,
          interviewDate: interviewDate && formatDate(interviewDate),
          notes: notes === 'NULL' ? '' : notes
        });
      } else {
        this.setState({
          company: '',
          position: '',
          applicationDate: formatDate(new Date()),
          status: 'waiting',
          interviewDate: '',
          notes: ''
        });
      }

    }
  }
  render() {
    const { open, editingData, toggleModal } = this.props;
    const { status, applicationDate, company, position, interviewDate, notes } = this.state;
    const { handleChange, handleApplicationDateChange, handleInterviewDayChange, submit } = this;
    return (
      <Wrapper open={open}>
        <Title>{editingData ? 'Edit' : 'Add'} an Application</Title>
        {editingData && (
          <DeleteButton
            onClick={() => {
              this.deleteApp(editingData);
            }}
          >
            Delete
          </DeleteButton>
        )}
        <Form onSubmit={submit}>
          <Label>
            Company
            <Input
              required
              name="company"
              type="text"
              value={company}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Position
            <Input
              required
              name="position"
              type="text"
              value={position}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Application Date
            <DatePickerWrapper>
              <DayPickerInput
                required
                value={applicationDate}
                formatDate={formatDate}
                onDayChange={handleApplicationDateChange}
                inputProps={{ readOnly: true }}
              />
            </DatePickerWrapper>
          </Label>
          <Label>Status</Label>
          <RadioRow>
            <RadioLabel>
              Waiting
              <Radio
                required
                checked={status === 'waiting'}
                type="radio"
                name="status"
                value="waiting"
                onChange={handleChange}
              />
            </RadioLabel>
            <RadioLabel>
              Interview
              <Radio
                checked={status === 'interview'}
                type="radio"
                name="status"
                value="interview"
                onChange={handleChange}
              />
            </RadioLabel>
            <RadioLabel>
              Rejected
              <Radio
                checked={status === 'rejected'}
                type="radio"
                name="status"
                value="rejected"
                onChange={handleChange}
              />
            </RadioLabel>
          </RadioRow>
          <Label>
            Interview Date
            <DatePickerWrapper>
              <DayPickerInput
                value={interviewDate || ''}
                formatDate={interviewDate ? formatDate : () => {}}
                placeholder={'M/D/YYYY'}
                onDayChange={handleInterviewDayChange}
                inputProps={{ readOnly: true }}
              />
            </DatePickerWrapper>
          </Label>
          <Label>
            Notes
            <TextArea
              name="notes"
              value={notes || ''}
              onChange={handleChange}
            />
          </Label>
          <ButtonWrapper>
            <Cancel type="button" value="Cancel" onClick={toggleModal} />
            <Submit type="submit" value={editingData ? 'Update' : 'Add'} />
          </ButtonWrapper>
        </Form>
      </Wrapper>
    );
  }
}

export default AddApp;

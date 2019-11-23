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
      company: 'Test',
      position: '',
      applicationDate: new Date(),
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
    // converts date to SQL date for consistency
    this.setState({ applicationDate: day.toISOString().slice(0, 10) });
  }
  handleInterviewDayChange(day) {
    this.setState({ interviewDate: day.toISOString().slice(0, 10) });
  }
  deleteApp() {
    http
      .delete();
  }
  submit(e) {
    e.preventDefault();
    const { editingData, toggleModal, updateApplications } = this.props;
    const app = this.state;
    // look for formatting here from initial value app date
    app.interviewDate = app.interviewDate && app.interviewDate + 'T00:00';
    if (typeof app.applicationDate.getDate === 'function') {
      app.applicationDate = app.applicationDate.toISOString().slice(0, 23);
    }
    app.applicationDate = app.applicationDate + 'T00:00';
    if (editingData) {
      http
        .put('/api/update-application', app)
        .then(res => updateApplications(app));
    } else {
      http
        .post('/api/add-application', app)
        .then(res => updateApplications(app, res.insertId));
    }
    toggleModal();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.editingData) {
        const { id, company, notes, position, status, applicationDate: applied, interviewDate: interview } = this.props.editingData;
        const applicationDate = applied.split('T')[0];
        const interviewDate = interview && interview.split('T')[0];

        this.setState({
          id: id,
          company: company,
          position: position,
          applicationDate: applicationDate,
          status: status,
          interviewDate: interviewDate,
          notes: notes === 'NULL' ? '' : notes
        });
      } else {
        this.setState({
          company: '',
          position: '',
          applicationDate: new Date(),
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
        {editingData && <DeleteButton onClick={this.deleteApp}>Delete</DeleteButton>}
        <Form onSubmit={submit}>
          <Label>
            Company
            <Input
              required
              name="company"
              type="text"
              value={company}
              onChange={handleChange} />
          </Label>
          <Label>
            Position
            <Input
              required
              name="position"
              type="text"
              value={position}
              onChange={handleChange} />
          </Label>
          <Label>
            Application Date
            <DatePickerWrapper>
              <DayPickerInput
                required
                value={applicationDate}
                onDayChange={handleApplicationDateChange}
                inputProps={{ readOnly: true }} />
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
                onDayChange={handleInterviewDayChange}
                inputProps={{ readOnly: true }} />
            </DatePickerWrapper>
          </Label>
          <Label>
            Notes
            <TextArea
              name="notes"
              value={notes || ''}
              onChange={handleChange}/>
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

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
import { Title } from './ui/elements';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import http from '../lib/http';

class AddApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
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
    this.setState({ applicationDate: day });
  }
  handleInterviewDayChange(day) {
    this.setState({ interviewDate: day });
  }
  submit(e) {
    e.preventDefault();
    http
      .post('/api/add-application', this.state)
      .then(data => console.log(data));
  }
  render() {
    const { open } = this.props;
    const { status, applicationDate } = this.state;
    const { handleChange, handleApplicationDateChange, handleInterviewDayChange, submit } = this;
    return (
      <Wrapper open={open}>
        <Title>Add an Application</Title>
        <Form onSubmit={submit}>
          <Label>
            Company
            <Input required name="company" type="text" onChange={handleChange} />
          </Label>
          <Label>
            Position
            <Input required name="position" type="text" onChange={handleChange} />
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
                onDayChange={handleInterviewDayChange}
                inputProps={{ readOnly: true }} />
            </DatePickerWrapper>
          </Label>
          <Label>
            Notes
            <TextArea name="notes" onChange={handleChange}/>
          </Label>
          <ButtonWrapper>
            <Cancel type="button" value="Cancel" />
            <Submit type="submit" value="Add" />
          </ButtonWrapper>
        </Form>
      </Wrapper>
    );
  }
}

export default AddApp;

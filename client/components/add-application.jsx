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

class AddApp extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      company: '',
      position: '',
      application: '',
      status: 'waiting',
      interview: '',
      notes: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  submit(e) {
    e.preventDefault();
    // http.post('/api/add-application'{
    //   this.state
    // });
  }
  render() {
    const { open } = this.props;
    const { status } = this.state;
    const { handleChange, submit } = this;
    return (
      <Wrapper open={open}>
        <Title>Add an Application</Title>
        <Form onSubmit={submit}>
          <Label>
            Company
            <Input name="company" type="text" onChange={handleChange} />
          </Label>
          <Label>
            Position
            <Input name="position" type="text" onChange={handleChange} />
          </Label>
          <Label>
            Application Date
            <DatePickerWrapper>
              <DayPickerInput inputProps={{ readOnly: true }} />
            </DatePickerWrapper>
          </Label>
          <Label>Status</Label>
          <RadioRow>
            <RadioLabel>
              Waiting
              <Radio
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
              <DayPickerInput inputProps={{ readOnly: true }} />
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

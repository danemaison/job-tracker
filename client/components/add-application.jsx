import React from 'react';
import styled from 'styled-components';
import {
  Wrapper,
  Form,
  Label,
  Input,
  TextArea,
  ButtonWrapper,
  Submit,
  Cancel
} from './styling/form-styles';
import { Title } from './ui/elements';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
const DatePickerWrapper = styled.div`
  display: block;
  width:100%;
  >div { width: 100%;}
  input {
    font-family: inherit;
    display: block;
    width: calc(100% - 20px);
    border: 1px solid ${({ theme }) => theme.grey};
    height: 40px;
    padding: 0 10px;
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

class AddApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      applicationDate: ''
    };
  }
  handleChange(e) {

  }
  submit(e) {
    e.preventDefault();

  }
  render() {
    const { open } = this.props;
    return (
      <Wrapper open>
        <Title>Add an Application</Title>
        <Form onSubmit={this.submit}>
          <Label>
            Company
            <Input name="company" type="text" />
          </Label>
          <Label>
            Application Date
            <DatePickerWrapper>
              <DayPickerInput inputProps={{ readOnly: true }} />
            </DatePickerWrapper>
          </Label>
          <Label>
            Status
            <Input name="application-date" type="text" />
          </Label>
          <Label>
            Interview
            <DatePickerWrapper>
              <DayPickerInput inputProps={{ readOnly: true }} />
            </DatePickerWrapper>
          </Label>
          <Label>
            Notes
            <TextArea name="notes" />
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

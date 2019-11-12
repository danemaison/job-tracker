import styled from 'styled-components';
import { Container, Row } from '../ui/elements';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const Wrapper = styled(Container)`
  position: fixed;
  right: ${({ open }) => (open ? '0' : '-100%')};
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 1;
  transition: 0.25s ease-out;
`;

const Form = styled.form`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: 90%;
  font-family: inherit;
`;

const Label = styled.label`
  font-weight: 400;
`;
const Input = styled.input`
  font-family: inherit;
  display: block;
  width: calc(100% - 20px);
  border: 1px solid ${({ theme }) => theme.grey};
  height: 40px;
  padding: 0 10px;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  font-size: 1rem;
  padding: 10px;
  resize: vertical;
  height: 20vh;
  display: block;
  width: calc(100% - 20px);
  border: 1px solid ${({ theme }) => theme.grey};
  margin-bottom: 20px;
`;

const ButtonWrapper = styled(Row)`
  justify-content: space-evenly;
`;
const Submit = styled.input`
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 10px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.blue};
  background-color: ${({ theme }) => theme.blue};
  border-radius: 10px;
`;
const Cancel = styled(Submit)`
  border: 1px solid ${({ theme }) => theme.red};
  background-color: ${({ theme }) => theme.red};
`;

const DatePicker = styled(DayPickerInput)`
  display:block;
  > input {
    height: 1000px;
     width: 100%;
    }
`;

export {
  Wrapper,
  Form,
  Label,
  Input,
  TextArea,
  ButtonWrapper,
  Submit,
  Cancel,
  DatePicker
};

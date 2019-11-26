import styled from 'styled-components';
import { Container, Row } from '../ui/elements';
import { theme } from './theme';

const Wrapper = styled(Container)`
  position: fixed;
  right: 0;
  top: ${({ open }) => (open ? '0' : '-100vh')};
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: white;
  z-index: 1;
  transition: 0.5s;
`;

const Form = styled.form`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: 90%;
  font-family: inherit;
`;

const Label = styled.label`
  font-weight: 600;
  font-size:.8rem;
`;
const Input = styled.input`
  border-radius: 5px;
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
  border-radius: 5px;
  position: relative;
  font-family: inherit;
  font-size: 1rem;
  padding: 10px;
  resize: vertical;
  max-height: 100%;
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

const RadioRow = styled(Row)`
  justify-content:flex-start;
  margin-bottom: 10px;
`;

const RadioStyles = {
  waiting: theme.yellow,
  rejected: theme.red,
  interview: theme.green
};
const Radio = styled.input`
  background-color: ${({ checked, value }) => checked ? RadioStyles[value] : 'white'};
  width: 1.5rem;
  height:1.5rem;
  border-radius:5px;
  border: 1px solid ${({ checked, theme }) => checked || theme.grey};
  margin-top:2px;
`;

const RadioLabel = styled.label`
  font-size:.6rem;
  font-weight: 600;
  margin-right:15px;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
`;

const DatePickerWrapper = styled.div`
  display: block;
  width: 100%;
  > div {
    width: 100%;
  }
  input {
    border-radius:5px;
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

export {
  Wrapper,
  Form,
  Label,
  Input,
  TextArea,
  ButtonWrapper,
  Submit,
  RadioRow,
  Radio,
  RadioLabel,
  DatePickerWrapper,
  Cancel
};

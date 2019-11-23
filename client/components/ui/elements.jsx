import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
`;

const Row = styled.div`
  display:flex;
  justify-content:space-around;
  width:100%;

`;

const Title = styled.div`
  font-size:1.5rem;
  text-align:center;
  margin: 10px 0;
  font-weight:600;
`;

const TableRow = styled.div`
  cursor:pointer;
  width: 94%;
  display: flex;
  flex-shrink:0;
  align-items: center;
  text-align: center;
  margin: 5px auto;
  padding: 0 5px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
  > div {
    font-size: 0.75rem;
    width: 25%;
  }
`;
export {
  Container,
  Row,
  Title,
  TableRow
};

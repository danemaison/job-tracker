import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
`;

const Row = styled.div`
  display:flex;
  justify-content:space-around;
  width:100%;
`;

const Title = styled.div`
  font-size:2rem;
  text-align:center;
  margin: 10px 0;
  font-weight:600;
`;

const TableRow = styled.div`
  width: 94%;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px auto;
  padding: 0 5px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.25);
  > div {
    font-size: 0.75rem;
    width: 24.25%;
  }
  >div:nth-child(5){
    width:3%;
    text-align: left;
  }
`;
export {
  Container,
  Row,
  Title,
  TableRow
};

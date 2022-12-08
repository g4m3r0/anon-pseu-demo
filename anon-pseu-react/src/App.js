import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TopNavBar from "./components/TopNavBar";
import ResultTable from './components/ResultTable';
import CsvUpload from './components/CsvUpload';

function App() {
  return (
    <div className="App">
      Test
      <TopNavBar />

      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={9}>
            <CsvUpload />
          </Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={5}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

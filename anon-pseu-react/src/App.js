import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

import TopNavBar from "./components/TopNavBar";
import CsvUpload from './components/CsvUpload';
import BottomNavBar from "./components/BottomNavBar";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <Container className='mt-3 mb-5'>        
        <Row>
          <Col></Col>
          <Col xs={10}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>How does the app work?</Accordion.Header>
                <Accordion.Body>
                  This demo webapp allows users to upload a CSV file and display the data in a table. 
                  The user can select a file using the input field and then click the "Upload" button to load the data into the table.
                  The user can also pseudonymize/anonymize certain columns by selecting a pseudonymization method from the dropdown menus next to each column header.
                  The pseudonymized/anonymized data can then be exported as a CSV file by clicking the "Export" button.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>What is pseudonymization?</Accordion.Header>
                <Accordion.Body>
                  Pseudonymization is the practice of replacing personally identifiable information with a pseudonym, 
                  or fake name, in order to protect the privacy of individuals.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>What is anonymization?</Accordion.Header>
                <Accordion.Body>
                  Anonymization is the process of removing personally identifiable information from data in order to make it impossible to identify the individuals to whom the data belongs. 
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col></Col>
        </Row>
        <Row className='mb-2'>
          <Col></Col>
          <Col xs={10}>
            <CsvUpload />
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <BottomNavBar />
    </div>
  );
}

export default App;

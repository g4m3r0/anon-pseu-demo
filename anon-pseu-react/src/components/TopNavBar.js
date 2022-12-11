import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function TopNavBar() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="./logo.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Anonymization and Pseudonymization Demo
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default TopNavBar
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function BotttomNavBar() {
  return (
    <footer>
      <Navbar bg="dark" variant="dark" className='fixed-bottom'>
      <Container>
        <Navbar.Brand>© Copyright 2022 Lucas Schmutzler</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>This is a demo app made for the web engineering `Forschungsseminar` in WS 2022/23</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </footer>
  )
}

export default BotttomNavBar
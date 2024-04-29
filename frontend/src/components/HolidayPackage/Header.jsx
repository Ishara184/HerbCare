// Header component for the application
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">Ceylon Herbcare</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/create_holiday_package">Create Package</Nav.Link>
          <Nav.Link href="/edit_packages">Create Package</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

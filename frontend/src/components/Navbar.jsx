import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = ({ loggedIn }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3 fixed-top w-100">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: "#fda77b" }}>
          MyFoodApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex flex-row gap-3"> {/* 按钮横向排列 */}
            <Nav.Link as={Link} to="/" className="fw-medium">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/my-food" className="fw-medium">
              My Food
            </Nav.Link>
          </Nav>
          <Nav className="d-flex flex-row gap-3"> {/* 右侧按钮也横向排列 */}
            {!loggedIn ? (
              <Nav.Link as={Link} to="/account" className="fw-medium">
                Account
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/my-information" className="fw-medium">
                My Information
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

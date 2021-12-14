import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import './header.css'

const Header = ({ users, signOutUser }) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/" bsPrefix="brand-adjustment">The Exchange</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/shop">Products</Nav.Link>
        </Nav>
        <Nav>

          { users.auth ?
          <>
              <Nav.Link href="/dashboard/user/user_cart"><Badge color="primary" badgeContent={1}><ShoppingCartIcon /></Badge></Nav.Link>
            <Nav.Link eventKey={2} href="/dashboard">
              My Account
            </Nav.Link>
            <Nav.Link eventKey={3} href="" onClick={()=>signOutUser()}>
              Log Out
            </Nav.Link>
          </>

          :

          <Nav.Link eventKey={4} href="/sign_in">
            Sign In / Register
          </Nav.Link>
          

          }
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

export default Header;
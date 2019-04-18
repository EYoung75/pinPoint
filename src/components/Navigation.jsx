import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

const Navigation = props => {
  const { isAuthenticated } = props.auth;
  return (
    <Container className={"navigation"}>
      <Navbar light expand="md">
        <NavbarBrand href="/">PinPoint | Denver</NavbarBrand>
        <NavbarToggler onClick={props.toggleNavbar} />
        <Collapse isOpen={props.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            { props.loggedIn === false ? 
            <NavItem>
              <NavLink onClick={props.handleLogin}>Login | Sign-Up</NavLink>
            </NavItem>
            :
            <NavItem>
              <NavLink onClick={props.handleLogout}>Logout</NavLink>
            </NavItem>
            }
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>Options</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>About</DropdownItem>
                <DropdownItem>FAQ's</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Contact</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default Navigation;

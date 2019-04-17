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
  return (
    <Container className={"navigation"}>
      <Navbar light expand="md">
        <NavbarBrand href="/">PinPoint | Denver</NavbarBrand>
        <NavbarToggler onClick={props.toggleNavbar} />
        <Collapse isOpen={props.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={props.toggleLogin}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={props.toggleSignUp}>Sign-Up</NavLink>
            </NavItem>
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

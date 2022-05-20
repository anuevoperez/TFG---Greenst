import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
const CustomerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">GREENST</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen((prev) => !prev)} />
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                Vehiculos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/reservations">
                Reservas
              </NavLink>
            </NavItem>
            <NavItem className="ml-auto">
              <NavLink tag={ReactLink} to="/logout"  >
                Cerrar Sesion
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default CustomerLayout;

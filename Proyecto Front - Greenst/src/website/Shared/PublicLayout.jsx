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

const PublicLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">GREENST</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen((prev) => !prev)} />
        <Collapse navbar isOpen={isOpen}>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Iniciar Sesión
              </NavLink>
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink> */}
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/register">
                Registrarse
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div>PublicLayout</div>
      <Outlet />
    </>
  );
};

export default PublicLayout;

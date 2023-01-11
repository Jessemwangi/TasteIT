import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Container,
} from "reactstrap";
import RecipeSearch from "../Components/RecipeSearch";

import "./CSS/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <header className="sticky-top">
      <Container className="border" fluid="sm">
        <Navbar container="lg" expand="lg" className="navContainer">
          <NavbarBrand href="/">

            <img
              alt="logo"
              src={require('../Assets/Logo.png')}
              style={{
                height: 40,
                width: 40,
                marginRight: "0.4rem",
              }}
            />
            <span
              style={{
                marginRight: "2rem",
              }}
            >
              {" "}
              Chef Zone
            </span>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/addRecipe">Add Recipes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/viewRecipes">Recipes</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <RecipeSearch></RecipeSearch>
            </NavbarText>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;

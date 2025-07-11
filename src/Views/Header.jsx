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
import { UserAuth } from "../DataLayer/Context/Context";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();

  const toggle = () => setIsOpen(!isOpen);
  return (
    <header className="sticky-top">
      <Container className="border" fluid="sm">
        <Navbar container="lg" expand="lg" className="navContainer">
          <NavbarBrand href="/">
            <img
              alt="logo"
              src={require("../Assets/Logo.png")}
              style={{
                height: 90,
                width: 90,
                marginRight: "0.4rem",
              }}
            />
            <span
              style={{
                marginRight: "2rem",
                color: "#ffe",
              }}
            >
              {" "}
              CHEF
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
              <NavItem>
                {user && user.uid ? (
                  <NavLink to="/profile">Profile</NavLink>
                ) : (
                  <NavLink to="/signIn">Sign In</NavLink>
                )}
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

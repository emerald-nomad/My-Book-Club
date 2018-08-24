import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavItem,
  NavbarToggler,
  Collapse
} from "reactstrap";
import { Link } from "react-router-dom";

class Navigation extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar expand="sm" dark className="bg-dark mb-4">
        <div className="container">
          <NavbarBrand tag={Link} to="/">
            My Book Club
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/clubs" tag={Link}>
                  Clubs
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Navigation;

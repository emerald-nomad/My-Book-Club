import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
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

  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <Nav navbar className="ml-auto">
        <NavItem>
          <NavLink to="/register" tag={Link}>
            Sign Up
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login" tag={Link}>
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );

    const authLinks = (
      <Nav navbar className="ml-auto">
        <NavItem>
          <NavLink to="/bookshelf" tag={Link}>
            My Bookshelf
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.onLogoutClick} to="" tag={Link}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

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
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navigation);

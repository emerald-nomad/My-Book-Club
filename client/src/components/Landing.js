import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing ">
        <div className="dark-overlay landing-inner">
          <Container>
            <Row>
              <div className="col-md-12 text-center mt-5">
                <h1 className="display-3 mb-4">My Book Club</h1>
                <p className="lead">
                  {" "}
                  Create the perfect book club for you and your friends to
                  connect from anywhere
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-success mr-4">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

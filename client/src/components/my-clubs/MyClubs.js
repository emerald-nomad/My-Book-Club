import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Container, Row, Col } from "reactstrap";
import Spinner from "../common/Spinner";
import CreatedClubs from "./CreatedClubs";
import JoinedClubs from "./JoinedClubs";

class MyClubs extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let content;

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        const { clubs, myClubs } = profile;

        content = (
          <div>
            <p className="lead text-muted">
              <Link to="my-profile">
                {" "}
                <i className="fas fa-arrow-left" /> Back to profile
              </Link>
            </p>
            <CreatedClubs user={user} clubs={myClubs} />
            <JoinedClubs user={user} clubs={clubs} />
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet set up a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="my-clubs">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="display-4">My Clubs</h1>
              {content}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

MyClubs.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyClubs);

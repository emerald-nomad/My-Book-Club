import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class JoinedClubs extends Component {
  render() {
    const { clubs, user } = this.props;
    let content;

    if (clubs.length > 0) {
    } else {
      content = (
        <div>
          <p>
            You have not joined any clubs. Click{" "}
            <span className="font-italic">"Join a club"</span> to join one.
          </p>
          <Link to="#" className="btn btn-lg btn-info">
            Join a club
          </Link>
        </div>
      );
    }

    return (
      <div>
        <h4 className="text-muted">Joined Clubs</h4>
        {content}
      </div>
    );
  }
}

JoinedClubs.propTypes = {
  clubs: PropTypes.array.isRequired
};

export default connect(
  null,
  {}
)(JoinedClubs);

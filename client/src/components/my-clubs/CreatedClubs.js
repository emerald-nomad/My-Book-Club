import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CreatedClubs extends Component {
  render() {
    const { clubs, user } = this.props;
    let content;

    if (clubs.length > 0) {
    } else {
      content = (
        <div>
          <p>
            You have not started any clubs. Click{" "}
            <span className="font-italic">"Start a club"</span> to start one.
          </p>
          <Link to="#" className="btn btn-lg btn-info">
            Start a club
          </Link>
        </div>
      );
    }

    return (
      <div className="mb-5">
        <h4 className="text-muted">Created Clubs</h4>
        {content}
      </div>
    );
  }
}

CreatedClubs.propTypes = {
  clubs: PropTypes.array.isRequired
};

export default connect(
  null,
  {}
)(CreatedClubs);

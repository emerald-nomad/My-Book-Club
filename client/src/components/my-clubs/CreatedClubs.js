import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

class CreatedClubs extends Component {
  render() {
    const { clubs, user } = this.props;
    let content;

    if (clubs.length > 0) {
      const clubList = clubs.map(club => (
        <tr key={club._id}>
          <td className="align-middle text-center">{club.name}</td>
          <td className="align-middle text-center">{club.description}</td>
        </tr>
      ));
      content = (
        <div>
          <Link to="create-club" className="btn btn-lg btn-info mb-3">
            Start a club
          </Link>
          <Table hover>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Description</th>
              </tr>
            </thead>
            <tbody>{clubList}</tbody>
          </Table>
        </div>
      );
    } else {
      content = (
        <div>
          <p>
            You have not started any clubs. Click{" "}
            <span className="font-italic">"Start a club"</span> to start one.
          </p>
          <Link to="create-club" className="btn btn-lg btn-info">
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

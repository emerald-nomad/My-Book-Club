import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

class JoinedClubs extends Component {
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
          <Link to="clubs" className="btn btn-lg btn-info">
            Join a club
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
            You have not joined any clubs. Click{" "}
            <span className="font-italic">"Join a club"</span> to join one.
          </p>
          <Link to="clubs" className="btn btn-lg btn-info">
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

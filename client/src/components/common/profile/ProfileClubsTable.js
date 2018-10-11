import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

class ProfileClubsTable extends Component {
  render() {
    const { clubs } = this.props;
    let content;

    if (clubs.length > 0) {
      const clubList = clubs.map(club => (
        <tr key={club._id}>
          <td className="align-middle text-center">{club.name}</td>
          <td className="align-middle text-center">{club.description}</td>
          <td className="align-middle text-center">
            <Link to={`/club/${club._id}`}>
              <Button color="info">Go to club</Button>
            </Link>
          </td>
        </tr>
      ));

      content = (
        <Table>
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Description</th>
              <th />
            </tr>
          </thead>
          <tbody>{clubList}</tbody>
        </Table>
      );
    } else {
      content = <p>You do not have any clubs in this list.</p>;
    }

    return content;
  }
}

export default ProfileClubsTable;

import React from "react";
import { Table } from "reactstrap";

export default ({ clubs }) => {
  let content;

  if (clubs.length > 0) {
    const clubList = clubs.map(club => (
      <tr key={club._id}>
        <td className="align-middle text-center">{club.name}</td>
        <td className="align-middle text-center">{club.description}</td>
      </tr>
    ));

    content = (
      <Table>
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Description</th>
          </tr>
        </thead>
        <tbody>{clubList}</tbody>
      </Table>
    );
  } else {
    content = <p>You do not have any clubs in this list.</p>;
  }

  return content;
};

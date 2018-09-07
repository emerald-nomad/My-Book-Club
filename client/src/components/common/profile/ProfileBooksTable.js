import React from "react";
import { Table } from "reactstrap";

export default ({ books }) => {
  let content;

  if (books.length > 0) {
    const bookList = books.map(book => (
      <tr key={book._id}>
        <th scope="row">
          <img
            className="w-25 d-block mx-auto"
            src={book.imgUrl}
            alt={book.title}
          />
        </th>
        <td className="align-middle text-center">{book.title}</td>
        <td className="align-middle text-center">{book.author}</td>
      </tr>
    ));

    content = (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th />
              <th className="text-center">Title</th>
              <th className="text-center">Author</th>
            </tr>
          </thead>
          <tbody>{bookList}</tbody>
        </Table>
      </div>
    );
  } else {
    // User is logged in but has no profile
    content = (
      <div>
        <p>You do not have any books in this list.</p>
      </div>
    );
  }

  return content;
};

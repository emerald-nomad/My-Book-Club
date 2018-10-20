import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

const PastBooks = ({ books }) => {
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
        <Table hover>
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
    content = (
      <div>
        <p>You do not have any books in your past books right now.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h4 className="text-muted">Past Books</h4>
      {content}
    </div>
  );
};

PastBooks.propTypes = {
  books: PropTypes.array.isRequired
};

export default PastBooks;

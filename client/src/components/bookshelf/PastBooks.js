import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PastBooks = ({ books }) => {
  let content;

  if (books.length > 0) {
  } else {
    content = (
      <div>
        <p>You don't have any books in your past books right now.</p>
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

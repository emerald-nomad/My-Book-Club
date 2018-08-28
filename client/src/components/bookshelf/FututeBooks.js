import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FutureBooks = ({ books, user }) => {
  let content;

  if (books.length > 0) {
  } else {
    // User is logged in but has no profile
    content = (
      <div>
        <p>
          You do not have any books in your future books. Click{" "}
          <span className="font-italic">"Add a book"</span> to add one.
        </p>
        <Link
          to={`add_book/profile/${user.id}/future`}
          className="btn btn-lg btn-info"
        >
          Add a book
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h4 className="text-muted">Future Books</h4>
      {content}
    </div>
  );
};

FutureBooks.propTypes = {
  books: PropTypes.array.isRequired
};

export default FutureBooks;

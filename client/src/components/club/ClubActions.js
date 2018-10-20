import React from "react";
import { Link } from "react-router-dom";

export default ({ club }) => {
  return (
    <div className="mb-5">
      <div className="btn-group mb-2" role="group">
        <Link to={`/edit-club/${club._id}`} className="btn btn-light">
          <i className="fas fa-users text-info mr-1" /> Edit Club
        </Link>
        <Link to={`/bookshelf/${club._id}`} className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Manage Bookshelf
        </Link>
      </div>
    </div>
  );
};

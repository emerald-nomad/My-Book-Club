import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="mb-5">
      <div className="btn-group mb-2" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/bookshelf" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Manage Bookshelf
        </Link>
        <Link to="/my-clubs" className="btn btn-light">
          <i className="fas fa-users text-info mr-1" />
          Manage Clubs
        </Link>
      </div>
    </div>
  );
};

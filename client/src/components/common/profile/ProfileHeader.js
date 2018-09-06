import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileActions from "./ProfileActions";

const ProfileHeader = ({ myProfile, profile }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto" />
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            {myProfile ? <ProfileActions /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;

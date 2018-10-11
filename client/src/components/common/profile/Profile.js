import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import { Container, Row, Col } from "reactstrap";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileBooks from "./ProfileBooks";
import ProfileClubs from "./ProfileClubs";

const Profile = ({ myProfile, profile, user, loading, history }) => {
  let content;

  if (profile === null || loading) {
    content = <Spinner />;
  } else {
    // Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      content = (
        <div className="pb-5">
          <ProfileHeader myProfile={myProfile} profile={profile} />
          <ProfileInfo profile={profile} />
          <ProfileBooks
            booksCurrent={profile.booksCurrent}
            booksFuture={profile.booksFuture}
            booksPast={profile.booksPast}
          />
          <ProfileClubs
            history={history}
            clubs={profile.clubs}
            myClubs={profile.myClubs}
          />
          {myProfile ? (
            <div style={{ marginBottom: "60px" }}>
              <button className="btn btn-danger">Delete My Account</button>
            </div>
          ) : null}
        </div>
      );
    } else {
      // User is logged in but has no profile
      content = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet set up a profile, please add some info.</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <Container>
      <Row>
        <Col md="12">{content}</Col>
      </Row>
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

export default Profile;

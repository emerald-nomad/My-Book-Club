import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Profile from "../common/profile/Profile";

class MyProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <Profile
        history={this.props.history}
        myProfile={true}
        user={this.props.auth.user}
        profile={this.props.profile.profile}
        loading={this.props.profile.loading}
      />
    );
  }
}

MyProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);

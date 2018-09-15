import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postToProfile, getCurrentProfile } from "../../actions/profileActions";
import { Container, Row, Col, Form, Input } from "reactstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import CheckboxGroup from "../common/CheckboxGroup";

class CreateEditProfile extends Component {
  state = {
    handle: "",
    location: "",
    bio: "",
    genres: [],
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    console.log("Component Mounted");
  }

  componentDidUpdate(prevProps) {
    const { profile } = this.props.profile;
    const prevProfile = prevProps.profile.profile;

    if (prevProfile !== profile && Object.keys(profile).length > 0) {
      this.setState({
        handle: profile.handle,
        location: profile.location,
        bio: profile.bio,
        genres: profile.genres
      });
    }

    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      location: this.state.location,
      handle: this.state.handle,
      bio: this.state.bio,
      genres: this.state.genres.join(",")
    };

    this.props.postToProfile(profileData, this.props.history);
  };

  onTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheckboxChange = e => {
    const { checked, value } = e.target;
    const { genres } = this.state;
    if (checked) {
      genres.push(value);
      this.setState({ genres });
    } else {
      const removeIndex = genres.indexOf(value);
      genres.splice(removeIndex, 1);
      this.setState({ genres });
    }
  };

  render() {
    const { errors } = this.state;

    let genres;
    this.state.genres ? (genres = this.state.genres) : (genres = []);

    // Options for genre
    const options = [
      "Fiction",
      "Novel",
      "Science Fiction",
      "Fantasy",
      "Non-Fiction",
      "Mystery",
      "Thriller",
      "Romance",
      "Young Adult"
    ];

    return (
      <div className="create-profile">
        <Container>
          <Row>
            <Col md="8" className="m-auto">
              <h1 className="display-4 text-center">Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <Form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onTextChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onTextChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, Ma)."
                />
                <TextAreaFieldGroup
                  placeholder="* Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onTextChange}
                  error={errors.bio}
                  info="Tell us a little about yourself."
                />
                <CheckboxGroup
                  onChange={this.onCheckboxChange}
                  options={options}
                  header="Genres"
                  genres={genres}
                />
                <Input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

CreateEditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postToProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { postToProfile, getCurrentProfile }
)(withRouter(CreateEditProfile));

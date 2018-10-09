import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { createClub } from "../../actions/clubActions";
import { Container, Row, Col, Form, Input } from "reactstrap";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import CheckboxGroup from "../common/CheckboxGroup";

class CreateClub extends Component {
  state = {
    name: "",
    description: "",
    genres: [],
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, description, genres } = this.state;

    const clubData = {
      name: name,
      description: description,
      genres: genres.join(",")
    };

    this.props.createClub(clubData, this.props.history);
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
    const { errors, genres } = this.state;

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
      <div className="create-club">
        <Container>
          <Row>
            <Col md="8" className="m-auto">
              <h1 className="display-4 text-center">Club</h1>
              <Link to="my-clubs">
                {" "}
                <i className="fas fa-arrow-left" /> Back to My Clubs
              </Link>
              <small className="d-block pb-3">* = required fields</small>
              <Form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Club Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onTextChange}
                  error={errors.name}
                  info="A unique name for your club."
                />
                <TextAreaFieldGroup
                  placeholder="* Short Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onTextChange}
                  error={errors.description}
                  info="Give us a short description about your club, so that other readers can know more about it."
                />
                <CheckboxGroup
                  onChange={this.onCheckboxChange}
                  options={options}
                  genres={genres}
                  header="Genres"
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

CreateClub.propTypes = {
  errors: PropTypes.object.isRequired,
  createClub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClub }
)(withRouter(CreateClub));

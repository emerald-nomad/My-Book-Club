import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  Row,
  Col
} from "reactstrap";

class ProfileInfo extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Genres
    const genres = profile.genres.map((genre, index) => (
      <div key={index} className="p-3">
        <i className="far fa-dot-circle" /> {genre}
      </div>
    ));

    return (
      <Card className="rounded mb-3">
        <CardHeader className="p-0">
          <Button
            className="col-12 text-left py-3 px-4 d-flex"
            color="info"
            onClick={this.toggle}
          >
            <h4 className="m-0">Profile Information</h4>
            <i className="fas fa-plus ml-auto dropdown" />
          </Button>
          <Collapse isOpen={this.state.isOpen}>
            <CardBody>
              <Row>
                <Col md="12">
                  <h3 className="text-info">Location</h3>
                  <p className="lead">{profile.location}</p>
                  <hr />
                  <h3 className="text-info">{`${firstName}'s Bio`}</h3>
                  <p className="lead">{profile.bio}</p>
                  <hr />
                  <h3 className="text-info">Genres</h3>
                  <Row>
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                      {genres}
                    </div>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </CardHeader>
      </Card>
    );
  }
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileInfo;

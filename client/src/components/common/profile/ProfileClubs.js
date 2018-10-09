import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileClubsTable from "./ProfileClubsTable";
import { Button, Card, CardHeader, CardBody, Collapse } from "reactstrap";

class ProfileClubs extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { clubs, myClubs } = this.props;
    return (
      <Card className="rounded mb-3">
        <CardHeader className="p-0">
          <Button
            className="col-12 text-left py-3 px-4 d-flex"
            color="info"
            onClick={this.toggle}
          >
            <h4 className="m-0">Clubs</h4>
            <i className="fas fa-plus ml-auto dropdown" />
          </Button>
          <Collapse isOpen={this.state.isOpen}>
            <CardBody>
              <div className="mb-3">
                <h3 className="text-info">Your Clubs</h3>
                <ProfileClubsTable clubs={myClubs} />
              </div>
              <div className="mb-3">
                <h3 className="text-info">Clubs Joined</h3>
                <ProfileClubsTable clubs={clubs} />
              </div>
            </CardBody>
          </Collapse>
        </CardHeader>
      </Card>
    );
  }
}

ProfileClubs.propTypes = {
  clubs: PropTypes.array.isRequired
};

export default ProfileClubs;

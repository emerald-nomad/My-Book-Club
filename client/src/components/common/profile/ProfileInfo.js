import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardHeader, Collapse, CardBody } from "reactstrap";

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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
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

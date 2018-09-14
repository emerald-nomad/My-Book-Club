import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardHeader, CardBody, Collapse } from "reactstrap";
import ProfileBooksTable from "./ProfileBooksTable";

class ProfileBooks extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { booksCurrent, booksPast, booksFuture } = this.props;

    return (
      <Card className="rounded mb-3">
        <CardHeader className="p-0">
          <Button
            className="col-12 text-left py-3 px-4 d-flex"
            color="info"
            onClick={this.toggle}
          >
            <h4 className="m-0">Bookshelf</h4>
            <i className="fas fa-plus ml-auto dropdown" />
          </Button>
          <Collapse isOpen={this.state.isOpen}>
            <CardBody>
              <div className="mb-3">
                <h3 className="text-info">Current Books</h3>
                <ProfileBooksTable books={booksCurrent} />
              </div>
              <div className="mb-3">
                <h3 className="text-info">Future Books</h3>
                <ProfileBooksTable books={booksFuture} />
              </div>
              <div className="mb-3">
                <h3 className="text-info">Past Books</h3>
                <ProfileBooksTable books={booksPast} />
              </div>
            </CardBody>
          </Collapse>
        </CardHeader>
      </Card>
    );
  }
}

ProfileBooks.propTypes = {
  booksCurrent: PropTypes.array.isRequired,
  booksFuture: PropTypes.array.isRequired,
  booksPast: PropTypes.array.isRequired
};

export default ProfileBooks;

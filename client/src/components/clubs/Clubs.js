import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getClubs } from "../../actions/clubActions";
import { addClubToProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Table,
  Button
} from "reactstrap";
import Spinner from "../common/Spinner";

class Clubs extends Component {
  componentDidMount() {
    this.props.getClubs();
  }

  onJoinClick = e => {
    e.preventDefault();

    this.props.addClubToProfile(e.target.id, this.props.history);
  };

  render() {
    const { clubs, loading } = this.props.club;
    const { isAuthenticated, user } = this.props.auth;
    let content;

    if (clubs === null || loading) {
      content = <Spinner />;
    } else {
      // Check to see if any clubs have been made
      if (clubs.length > 0) {
        const clubList = clubs.map(club => (
          <Col key={club._id} md="4" className="mb-5 mx-auto text-center">
            <Card body>
              <CardTitle>{club.name}</CardTitle>
              <CardText>{club.description}</CardText>
              <hr />
              <Row>
                <Col md="6" className="mx-auto">
                  <Button>Go to club</Button>
                </Col>
                {isAuthenticated &&
                club.admin != user.id &&
                !club.members.includes(user.id) ? (
                  <Col md="6" className="mx-auto">
                    <Button id={club._id} onClick={this.onJoinClick}>
                      Join Club
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Card>
          </Col>
        ));

        content = <Row>{clubList}</Row>;
      } else {
        content = (
          <div>
            <p className="lead text-muted">
              Sorry! There are currently no clubs available at this time.
            </p>
          </div>
        );
      }
    }

    return (
      <div className="mb-5">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="display-4 mb-3">Clubs</h1>
              {content}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Clubs.propTypes = {
  getClubs: PropTypes.func.isRequired,
  addClubToProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getClubs, addClubToProfile }
)(withRouter(Clubs));

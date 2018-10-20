import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClub } from "../../actions/clubActions";
import { Container, Row, Col } from "reactstrap";
import Spinner from "../common/Spinner";
import CurrentBook from "./CurrentBook";
import FututeBooks from "./FututeBooks";
import PastBooks from "./PastBooks";

class ClubBookshelf extends Component {
  componentDidMount() {
    const { clubId } = this.props.match.params;
    this.props.getClub(clubId);
  }

  render() {
    const { club, loading } = this.props.club;
    let content;

    if (club === null || loading) {
      content = <Spinner />;
    } else {
      const { bookCurrent, booksFuture, booksPast } = club;

      content = (
        <div>
          <p className="lead text-muted">
            <Link to={`/club/${this.props.match.params.clubId}`}>
              {" "}
              <i className="fas fa-arrow-left" /> Back to club
            </Link>
          </p>
          <CurrentBook clubId={club._id} book={bookCurrent} />
          <FututeBooks clubId={club._id} books={booksFuture} />
          <PastBooks books={booksPast} />
        </div>
      );
    }

    return (
      <div className="bookshelf">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="display-4">Bookshelf</h1>
              {content}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ClubBookshelf.propTypes = {
  getClub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getClub }
)(ClubBookshelf);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClub } from "../../actions/clubActions";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import ClubActions from "./ClubActions";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

class Club extends Component {
  state = {
    club: {},
    user: {}
  };

  componentDidMount() {
    const { clubId } = this.props.match.params;

    this.setState({ user: this.props.user });
    this.props.getClub(clubId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.club != this.props.club) {
      this.setState({ club: this.props.club });
    }
  }

  render() {
    const { club, user } = this.state;
    if (club.members === undefined) club.members = [];

    let booksFuture, booksPast;

    if (club.booksFuture) {
      if (club.booksFuture.length > 0) {
        booksFuture = club.booksFuture.map(book => (
          <ListGroupItem key={book._id}>{book.title}</ListGroupItem>
        ));
      } else {
        booksFuture = (
          <ListGroupItem>
            There have been no books selected for the future.
          </ListGroupItem>
        );
      }
    }

    if (club.booksPast) {
      if (club.booksPast.length > 0) {
        booksPast = club.booksPast.map(book => (
          <ListGroupItem key={book._id}>{book.title}</ListGroupItem>
        ));
      } else {
        booksPast = (
          <ListGroupItem>There have been no books finished.</ListGroupItem>
        );
      }
    }

    const join =
      Object.keys(user).length > 0 &&
      club.admin !== user.id &&
      !club.members.includes(user.id) ? (
        <Button color="info" className="mb-5">
          Join Club
        </Button>
      ) : null;

    return (
      <Container>
        <h1 className="mb-2">{club.name}</h1>
        {club.admin == user.id ? <ClubActions club={this.state.club} /> : null}
        {join}
        <Row>
          <Col className="" md="3">
            <ListGroup className="mb-3">
              <h4>Current Book</h4>
              <ListGroupItem>
                {club.bookCurrent
                  ? club.bookCurrent.title
                  : `No book has been selected to read.`}
              </ListGroupItem>
            </ListGroup>

            <ListGroup className="mb-3">
              <h4>Future Books</h4>
              {booksFuture}
            </ListGroup>

            <ListGroup className="mb-3">
              <h4>Past Books</h4>
              {booksPast}
            </ListGroup>
          </Col>
          <Col md="6">
            {user &&
            (club.admin === user.id || club.members.includes(user.id)) ? (
              <PostForm clubId={club._id} />
            ) : null}

            {club.discussionPosts ? (
              <PostFeed clubId={club._id} posts={club.discussionPosts} />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

Club.propTypes = {
  getClub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getClub }
)(Club);

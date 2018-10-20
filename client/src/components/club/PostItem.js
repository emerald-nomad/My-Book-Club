import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import {
  deletePost,
  likePost,
  unlikePost,
  addComment
} from "../../actions/clubActions";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Row,
  Col,
  Button,
  Badge,
  Form
} from "reactstrap";
import PostComment from "./PostComment";

class PostItem extends Component {
  state = {
    comment: "",
    errors: {},
    showComments: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDeleteClick = () => {
    const { clubId, post } = this.props;

    this.props.deletePost(clubId, post._id);
  };

  onLikeClick = () => {
    const { clubId, post } = this.props;

    this.props.likePost(clubId, post._id);
  };

  onUnlikeClick = () => {
    const { clubId, post } = this.props;

    this.props.unlikePost(clubId, post._id);
  };

  addComment = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { clubId, post } = this.props;

    const comment = { text: this.state.comment, name: user.name };

    this.props.addComment(clubId, post._id, comment);
    this.setState({ comment: "" });
  };

  findUserLike = likes => {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  showComments = e => {
    e.preventDefault();
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    const { post, auth } = this.props;
    const { errors } = this.state;
    let showActions = true;
    if (Object.keys(auth.user).length <= 0) showActions = false;

    return (
      <Card className="mb-3">
        <CardBody>
          <CardTitle className="d-flex align-items-center">
            <i className="far fa-user-circle fa-2x mr-2" />
            {post.name}
            {post.user === auth.user.id ? (
              <Button
                onClick={() => this.onDeleteClick(post._id)}
                type="button"
                color="danger"
                className="ml-auto"
              >
                <i className="fas fa-times" />
              </Button>
            ) : null}
          </CardTitle>
          <CardText className="lead">{post.text}</CardText>
          <hr />
          <Row>
            <Col md="12">
              {showActions ? (
                <span>
                  <Button
                    onClick={() => this.onLikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <Badge color="light">{post.likes.length}</Badge>
                  </Button>
                  <Button
                    onClick={() => this.onUnlikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </Button>
                </span>
              ) : null}
              <Button
                color="info"
                onClick={this.showComments}
                className="float-right mr-1"
              >
                <Badge color="info">{post.comments.length}</Badge> Comments
              </Button>
            </Col>
          </Row>
          <div
            className={classnames("d-none", {
              "d-block": this.state.showComments && post.comments.length > 0
            })}
          >
            <hr />
            <Row>
              <PostComment comments={post.comments} />
            </Row>
          </div>
        </CardBody>
        <CardFooter>
          <Row>
            <Col md="2" className="d-flex">
              <i className="far fa-user-circle fa-2x mx-auto mt-2" />
            </Col>
            <Col md="10" className="">
              <Form onSubmit={this.addComment}>
                <TextFieldGroup
                  classes="m-0"
                  placeholder="Write a comment..."
                  name="comment"
                  type="text"
                  value={this.state.comment}
                  onChange={this.onChange}
                  error={errors.comment}
                  info="Press Enter to post"
                />
              </Form>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost, addComment }
)(PostItem);

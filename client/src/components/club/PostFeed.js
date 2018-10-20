import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts, clubId } = this.props;

    return posts
      .map(post => <PostItem key={post._id} post={post} clubId={clubId} />)
      .reverse();
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;

/*
  Club Post Routes
*/

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Club model
const Club = require("../models/Club");
// Load Profile model
const Profile = require("../models/Profile");

// Load Validation
const validatePostInput = require("../validation/posts");

// @route   POST api/club/post/:clubId
// @desc    Create post
// @access  Private
router.post(
  "/:clubId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    try {
      // Find the club by id
      const club = await Club.findById(req.params.clubId);
      const { discussionPosts } = club;

      // Create the post object
      const post = {
        user: req.user.id,
        text: req.body.text,
        name: req.body.name
      };

      // Add the post to discussionPosts
      discussionPosts.push(post);

      // Update the club
      await club.update({ discussionPosts });

      // Return the updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   DELETE api/club/post/clubId/postId
// @desc    Delete a post
// @access  Private
router.delete(
  "/:clubId/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the club by id
      const club = await Club.findById(req.params.clubId);
      const { discussionPosts } = club;

      // Get remove index
      const removeIndex = discussionPosts
        .map(post => post.id)
        .indexOf(req.params.postId);

      // Remove post
      discussionPosts.splice(removeIndex, 1);

      await club.update({ discussionPosts });

      // Return the updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   POST api/club/post/clubId/postId/like
// @desc    Like a post
// @access  Private
router.post(
  "/:clubId/:postId/like",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    try {
      // Find club by id
      const club = await Club.findById(req.params.clubId);
      const { discussionPosts } = club;

      // Get post index
      const postIndex = discussionPosts
        .map(post => post.id)
        .indexOf(req.params.postId);

      // Turn like objects into strings
      const likes = discussionPosts[postIndex].likes.map(like =>
        like.toString()
      );

      // See if user already liked the post
      if (likes.includes(req.user.id))
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });

      // Add user id to likes array
      discussionPosts[postIndex].likes.push(req.user.id);

      await club.update({ discussionPosts });

      // Return the updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   POST api/club/post/clubId/postId/unlike
// @desc    Like a post
// @access  Private
router.post(
  "/:clubId/:postId/unlike",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find club by id
      const club = await Club.findById(req.params.clubId);
      const { discussionPosts } = club;

      // Get post index
      const postIndex = discussionPosts
        .map(post => post.id)
        .indexOf(req.params.postId);

      // Turn like objects into strings
      const likes = discussionPosts[postIndex].likes.map(like =>
        like.toString()
      );

      // See if user already liked the post
      if (!likes.includes(req.user.id))
        return res
          .status(400)
          .json({ notliked: "You have not yet liked this post" });

      // Get remove index
      const removeIndex = discussionPosts[postIndex].likes
        .map(like => like.id)
        .indexOf(req.user.id);

      // Remove user out of likes array
      discussionPosts[postIndex].likes.splice(removeIndex, 1);

      // Update club
      await club.update({ discussionPosts });

      // Return updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   POST api/club/post/clubId/postId/comment
// @desc    Comment on a post
// @access  Private
router.post(
  "/:clubId/:postId/comment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    try {
      // Find club by id
      const club = await Club.findById(req.params.clubId);
      const { discussionPosts } = club;

      // Get post index
      const postIndex = discussionPosts
        .map(post => post.id)
        .indexOf(req.params.postId);

      // Create comment object
      const comment = {
        user: req.user.id,
        name: req.body.name,
        text: req.body.text
      };

      // Add comment to post
      discussionPosts[postIndex].comments.push(comment);

      // Update club
      await club.update({ comment });

      // Return updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   DELETE api/club/clubId/post/postId/comment/commentId
// @desc    Delete a comment on a post
// @access  Private
router.delete(
  "/:clubId/:postId/comment/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find club by id
      const club = await Club.findById(req.params.clubId);
      const { discussionPosts } = club;

      // Get post index
      const postIndex = discussionPosts
        .map(post => post.id)
        .indexOf(req.params.postId);

      // Get remove index
      const removeIndex = discussionPosts[postIndex].comments
        .map(comment => comment.id)
        .indexOf(req.params.commentId);

      // Splice comment out of the array
      discussionPosts[postIndex].comments.splice(removeIndex, 1);

      // Update club
      await club.update({ discussionPosts });

      // Return updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Profile model
const Profile = require("../models/Profile");
// Load Club model
const Club = require("../models/Club");
// Load Book model
const Book = require("../models/Book");

// Load Validation
const validateProfileInput = require("../validation/profile");
const validateBookInput = require("../validation/book");

// @route   Post /api/profile
// @desc    Create or update user's profile
// access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Check for input errors
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      // If not valid return errors object
      return res.status(400).json(errors);
    }

    const profileFields = { location: "", bio: "", handle: "", genres: "" };

    // Genres - Split into an Array
    if (typeof req.body.genres != "undefined") {
      profileFields.genres = req.body.genres.split(",");
    }

    profileFields.user = req.user.id;

    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.handle) profileFields.handle = req.body.handle;
    try {
      // Check if handle exists
      const handle = await Profile.findOne({ handle: profileFields.handle });

      // Find profile by user Id
      const profile = await Profile.findOne({ user: req.user.id });

      // Check if handle exists & is not equal to current user's handle
      if (handle && handle.handle !== profile.handle) {
        // If handle exists return an error
        errors.handle = "That handle already exists";
        return res.status(400).json(errors);
      }

      if (profile) {
        // Update
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        res.json(updatedProfile);
      } else {
        // Create
        const newProfile = await new Profile(profileFields).save();

        res.json(newProfile);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   GET /api/profile
// @desc    Get current user's profile
// access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      // Get user's profile
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user booksPast booksFuture booksCurrent clubs myClubs"
      );

      if (!profile) {
        errors.noprofile = "There is no profile for this user.";
        return res.status(404).json(errors);
      }

      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   GET /api/profile/id
// @desc    Get user's profile by Id
// access   Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find a user's profile by id
      let profile = await Profile.findOne({ user: req.user.id });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   POST /api/profile/club/
// @desc    Add club to user's profile
// access   Private
router.post(
  "/club",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      // Get club by club id
      const club = await Club.findById(req.body.clubId);

      // Check to see if club exists
      if (!club) {
        errors.club = "Club doesn't exists";
        return res.status(400).json(errors);
      }

      // Map club memeber id to strings
      const members = club.members.map(member => member.toString());

      // Check to see if user is a admin or member of club
      if (members.includes(req.user.id) || club.admin === req.user.id) {
        errors.club = "Already a member of this club.";
        return res.status(400).json(errors);
      }

      // Find user  profile
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.club = "Must create profile first";
        return res.status(400).json(errors);
      }

      // Add club to user's profile
      profile.clubs.push(club.id);

      // Save the updated profile
      const updatedProfile = await profile.save();

      // Add user to club's members
      club.members.push(req.user.id);
      club.save();

      res.json(updatedProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   DELETE /api/profile/club/clubId
// @desc    Remove user from club
// access   Private
router.delete(
  "/club/:clubId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Get profile by user id
      const profile = await Profile.findOne({ user: req.user.id });

      // Get club by club id
      const club = await Club.findById(req.params.clubId);

      // Get remove index
      const clubRemoveIndex = profile.clubs
        .map(club => club.id)
        .indexOf(req.params.clubId);

      // Splice out of array
      profile.clubs.splice(clubRemoveIndex, 1);
      const updatedProfile = await profile.save();

      // Get remove index
      const profileRemoveIndex = club.members
        .map(member => member.id)
        .indexOf(req.user.id);

      // Splice out of array
      club.members.splice(profileRemoveIndex, 1);
      await club.save();

      res.json(updatedProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/profile/book_current
// @desc    Add book to user's current books array
// access   Private
router.post(
  "/book_current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Check for input errors
      const { errors, isValid } = validateBookInput(req.body);

      if (!isValid) {
        // If not valid return errors object
        return res.status(400).json(errors);
      }

      // Get user's bookCurrent
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "booksCurrent"
      );
      const { booksCurrent } = profile;

      // Check to see if book is already in database
      let book = await Book.findOne({ isbn: req.body.isbn });

      // Add book to database if it isn't already there
      if (!book) {
        book = await new Book(req.body).save();
      }

      // Check to see if book is already in booksCurrent
      const books = booksCurrent.map(book => book.toString());
      if (books.includes(book._id.toString())) {
        return res.json(profile);
      }

      // Add book to booksCurrent
      booksCurrent.push(book);

      // Update Profile
      await profile.update({ booksCurrent });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/profile/book_future
// @desc    Add book to user's future books array
// access   Private
router.post(
  "/book_future",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Check for input errors
      const { errors, isValid } = validateBookInput(req.body);

      if (!isValid) {
        // If not valid return errors object
        return res.status(400).json(errors);
      }

      // Get user's booksFuture
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "booksFuture"
      );
      const { booksFuture } = profile;

      // Check to see if book is already in data
      let book = await Book.findOne({ isbn: req.body.isbn });

      // // Add book to database if it isn't already there
      if (!book) {
        book = await new Book(req.body).save();
      }

      // Check to see if book is already in booksFuture
      const books = booksFuture.map(book => book.toString());
      if (books.includes(book._id.toString())) {
        return res.json(bookshelf);
      }

      // Add book to booksFuture
      booksFuture.push(book);

      // Update profile
      await profile.update({ booksFuture });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/profile/book_future-current/bookId
// @desc    Move book from booksFuture to booksCurrent
// access   Private
router.post(
  "/book_future-current/:bookId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      // Get user's booksCurrent & booksFuture
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "booksCurrent booksFuture booksPast"
      );
      const { booksCurrent, booksFuture } = profile;

      // Find index of book in booksFuture
      const futures = booksFuture.map(book => book._id.toString());
      const bookIndex = futures.indexOf(req.params.bookId);

      // Get indexed book
      const book = booksFuture[bookIndex];

      // Remove book from user's future books
      booksFuture.splice(bookIndex, 1);

      // Check to see if book is already in booksCurrent
      const current = booksCurrent.map(book => book.toString());
      if (!current.includes(book._id.toString())) {
        booksCurrent.push(book);
      }

      await profile.update({ booksCurrent, booksFuture });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/profile/book_past/bookId
// @desc    Change user's current book
// access   Private
router.post(
  "/book_past/:bookId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      // Get user's bookshelf
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate("booksCurrent booksFuture booksPast");
      const { booksCurrent, booksFuture, booksPast } = profile;

      // Change book id's from objects to strings
      const current = booksCurrent.map(book => book._id.toString());
      if (!current.includes(req.params.bookId)) {
        errors.book = "You're not currently reading this book.";
        return res.status(400).json(errors);
      }

      // Find index of book in booksCurrent
      const bookIndex = current.indexOf(req.params.bookId);

      // Get indexed book
      const book = booksCurrent[bookIndex];

      // Remove book from user's current books
      booksCurrent.splice(bookIndex, 1);

      // Check to see if book is already in booksPast
      const past = booksPast.map(book => book.toString());
      if (!past.includes(book._id.toString())) {
        // Add book to user's books read
        booksPast.push(book);
      }

      // Update profile
      await profile.update({ booksCurrent, booksPast });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

module.exports = router;

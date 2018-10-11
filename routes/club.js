const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Club model
const Club = require("../models/Club");
// Load Profile model
const Profile = require("../models/Profile");
// Load Book model
const Book = require("../models/Book");

// Load Validation
const validateClubInput = require("../validation/club");
const validateBookInput = require("../validation/book");

// @route   Get /api/club/all
// @desc    Get all clubs
// access   Public
router.get("/all", async (req, res) => {
  try {
    // Get all clubs
    const clubs = await Club.find();

    res.json(clubs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// @route   Get /api/club/clubId
// @desc    Get club by id
// access   Public
router.get("/:clubId", async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);

    res.json(club);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// @route   Post /api/club
// @desc    Create new club
// access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate input
      const { errors, isValid } = validateClubInput(req.body);

      if (!isValid) {
        // If invalid return error
        return res.status(400).json(errors);
      }

      // Check if group name already exists
      const club = await Club.findOne({ name: req.body.name });
      if (club) {
        // If name exists send back error
        errors.name = "Club name already exists.";
        return res.status(400).json(errors);
      }

      // Create new club
      const newClub = new Club(req.body);
      // Making signed in user admin of club
      newClub.admin = req.user.id;

      const createdClub = await newClub.save();

      // After club is created add it to user's myClubs array
      const profile = await Profile.findOne({ user: req.user.id });
      profile.myClubs.push(createdClub._id);
      await profile.save();

      return res.json(createdClub);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);
// @route   DELETE /api/club/clubId
// @desc    Delete a club
// access   Private
router.delete(
  "/:clubId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find club by id
      const club = await Club.findById(req.params.clubId);

      // Check if signed in user is the admin
      if (club.admin.toString() !== req.user.id)
        return res.status(400).json({ admin: "You are not the admin." });

      // Get user's profile
      const admin = await Profile.findOne({ user: req.user.id });

      // Remove club from user's myClubs array
      const removeIndex = admin.myClubs.indexOf(req.body.clubId);
      admin.myClubs.splice(removeIndex, 1);
      await admin.save();

      // Loop through members of the club and remove club from their clubs array
      for (const member of club.members) {
        const clubMember = await Profile.findOne({ user: member });

        const removeIndex = clubMember.clubs.indexOf(req.params.clubId);

        clubMember.clubs.splice(removeIndex, 1);

        await clubMember.save();
      }

      // Remove club from database
      await Club.findByIdAndRemove(req.params.clubId);
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/club/clubId/book_current
// @desc    Change club's current book
// access   Private
router.post(
  "/:clubId/book_current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate input
      const { errors, isValid } = validateBookInput(req.body);

      if (!isValid) {
        // If not valid return errors object
        return res.status(400).json(errors);
      }

      // Get club by id
      const club = await Club.findById(req.params.clubId).populate(
        "booksCurrent booksPast"
      );

      // Check if signed in user is the admin
      if (club.admin.toString() !== req.user.id)
        return res.status(400).json({ admin: "You are not the admin." });

      // Get club's bookshelf
      const { bookCurrent, booksPast } = club;

      // Get book by isbn
      let book = await Book.findOne({ isbn: req.body.isbn });

      // Check to see if book is already set as current
      if (book._id.toString() === bookCurrent.toString()) {
        errors.book = "Book already set as the current book.";
        return res.status(400).json(errors);
      }

      // Add book to database if it isn't already there
      if (!book) {
        book = await new Book(req.body).save();
      }

      // If there is a book already in bookCurrent,
      // add that book to booksPast
      if (bookCurrent) {
        booksPast.push(bookCurrent);
      }

      // Add new book to bookCurrent
      bookCurrent = book;

      // Update club
      await club.update({ booksCurrent, booksPast });
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/club/clubId/book_future
// @desc    Change club's current book
// access   Private
router.post(
  "/:clubId/book_future",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate input
      const { errors, isValid } = validateBookInput(req.body);

      if (!isValid) {
        // If not valid return errors object
        return res.status(400).json(errors);
      }

      // Get club by id
      const club = await Club.findById(req.params.clubId).populate(
        "booksFuture"
      );

      // Check if signed in user is the admin
      if (club.admin.toString() !== req.user.id)
        return res.status(400).json({ admin: "You are not the admin." });

      // Get club's booksFuture
      const { booksFuture } = club;

      // Check to see if book is already in database
      let book = await Book.findOne({ isbn: req.body.isbn });

      // Add book to database if it isn't already there
      if (!book) {
        book = await new Book(req.body).save();
      }

      // Add book to booksFuture
      booksFuture.push(book);

      // Update the club
      await club.update({ booksFuture });
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);
module.exports = router;

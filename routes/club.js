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
    const club = await Club.findById(req.params.clubId).populate(
      "bookCurrent booksPast booksFuture"
    );

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

      const profileFields = { name: "", description: "", genres: "" };

      // Genres - Split into an Array
      if (typeof req.body.genres != "undefined") {
        profileFields.genres = req.body.genres.split(",");
      }

      if (req.body.name) profileFields.name = req.body.name;
      if (req.body.description)
        profileFields.description = req.body.description;

      // Create new club
      const newClub = new Club(profileFields);
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
        "bookCurrent booksPast"
      );

      // Check if signed in user is the admin
      if (club.admin.toString() !== req.user.id)
        return res.status(400).json({ admin: "You are not the admin." });

      // Get club's bookshelf
      const { booksPast } = club;
      let bookCurrent = club.bookCurrent;

      // Get book by isbn
      let book = await Book.findOne({ isbn: req.body.isbn });

      // Add book to database if it isn't already there
      if (!book) {
        book = await new Book(req.body).save();
      }

      // Check to see if book is already set as current
      if (bookCurrent && book._id.toString() === bookCurrent.toString()) {
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
      await club.update({ bookCurrent, booksPast });
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/club/clubId/book_future-current/bookId
// @desc    Change club's current book
// access   Private
router.post(
  "/:clubId/book_future-current/:bookId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Get club by id
      const club = await Club.findById(req.params.clubId).populate(
        "bookCurrent booksFuture booksPast"
      );

      const { booksFuture } = club;
      let bookCurrent = club.bookCurrent;

      // Find index of book in booksFuture
      const bookIndex = booksFuture
        .map(book => book._id.toString())
        .indexOf(req.params.bookId);

      // Get indexed book
      const book = booksFuture[bookIndex];

      // Remove book from booksFuture
      booksFuture.splice(bookIndex, 1);

      // check to see if book is already in bookCurrent
      if (bookCurrent !== book._id) {
        bookCurrent = book;
        club.bookCurrent = book;
      }

      // Update club
      await club.update({ bookCurrent, booksFuture });

      // Return updated club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

// @route   Post /api/club/clubId/book_future
// @desc    Add book to club's booksFuture
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

// @route   POST /api/club/clubId/book_past/bookId
// @desc    Move current book to booksPast
// access   Private
router.post(
  "/:clubId/book_past/:bookId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      // Get club by id
      const club = await Club.findById(req.params.clubId).populate(
        "bookCurrent bookFuture booksPast"
      );
      const { booksPast } = club;
      let bookCurrent = club.bookCurrent;

      // change book id's from objects to strings
      const current = bookCurrent._id.toString();

      // Check to see if club is currently reading book
      if (current !== req.params.bookId) {
        errors.book = "Club not currently reading this book";
        return res.status(400).json(errors);
      }

      // Check to see if book is already in booksPast
      const past = booksPast.map(book => book._id.toString());
      console.log(past.includes(bookCurrent._id.toString()));
      console.log();
      if (!past.includes(bookCurrent._id.toString())) {
        // Add book to club's books read
        booksPast.push(bookCurrent);
      }

      // Remove book from bookCurrent
      bookCurrent = null;
      club.bookCurrent = null;

      // Update club
      await club.update({ bookCurrent, booksPast });

      // Return update club
      res.json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);
module.exports = router;

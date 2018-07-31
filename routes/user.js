const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load User model
const User = require("../models/User");

// Load Profile model
const Profile = require("../models/Profile");

// Load Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route   POST /api/user/register
// @desc    Register a user
// access   Public
router.post("/register", async (req, res) => {
  try {
    // Check for valid input
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      // If not valid return errors object
      return res.status(400).json(errors);
    }

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists send back error
      errors.email = "Email already exists.";
      return res.status(400).json(errors);
    }

    const newUser = new User(req.body);

    // Encrypt password before saving user
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        try {
          if (error) throw error;

          newUser.password = hash;
          const user = await newUser.save();
          return res.json(user);
        } catch (error) {
          console.log(error);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// @route   POST /api/user/login
// @desc    Login a user
// access   Public
router.post("/login", async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      errors.password = "Incorrect user/password combination.";
      return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Check password
    if (isMatch) {
      // If correct password

      // Create JWT Payload
      const payload = { id: user.id, name: user.name };

      // Sign Token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 86400 }, // Expires after a day
        (error, token) => {
          if (error) throw error;

          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      // If incorrect password
      errors.password = "Incorrect user/password combination.";
      res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

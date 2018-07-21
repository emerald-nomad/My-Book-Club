const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load User model
const User = require("../models/User");

// Load Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route   POST /api/users/register
// @desc    Register a user
// access   Public
router.post("/register", (req, res) => {
  // Check for valid input
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    // If not valid return errors object
    return res.status(400).json(errors);
  }

  // Check if user already exists
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // If user exists send back error
        errors.email = "Email already exists.";
        return res.status(400).json(errors);
      }

      const newUser = new User(req.body);

      // Encrypt password before saving user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => console.log(err));
});

// @route   POST /api/users/login
// @desc    Login a user
// access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found.";
        return res.status(400).json(errors);
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched

          // Create JWT Payload
          const payload = { id: user.id, name: user.name };

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) console.log(err);

              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          // If incorrect password, send back error
          errors.password = "Password is incorrect.";
          res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});

// @route   GET /api/users/current
// @desc    Return current user
// access   Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;

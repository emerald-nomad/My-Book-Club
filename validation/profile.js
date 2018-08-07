const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.bio = isEmpty(data.bio) ? "" : data.bio;
  data.genres = isEmpty(data.genres) ? "" : data.genres;

  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio field is required.";
  }

  if (Validator.isEmpty(data.genres)) {
    errors.genres = "Genre field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.bio = isEmpty(data.bio) ? "" : data.bio;
  data.genres = isEmpty(data.genres) ? "" : data.genres;

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters.";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required.";
  }

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

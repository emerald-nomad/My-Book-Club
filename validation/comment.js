const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.comment = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

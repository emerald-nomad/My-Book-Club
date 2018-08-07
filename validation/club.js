const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClubInput(data) {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.description = isEmpty(data.description) ? "" : data.description;

  if (Validator.isEmpty(data.name)) {
    errors.name = "Club name is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Club Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

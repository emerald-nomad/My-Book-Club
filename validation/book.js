const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookInput(data) {
  let errors = {};

  data.isbn = isEmpty(data.isbn) ? "" : data.isbn;
  data.title = isEmpty(data.title) ? "" : data.title;
  data.author = isEmpty(data.author) ? "" : data.author;

  if (!Validator.isISBN(data.isbn, 13)) {
    errors.isbn = "Must be a valid ISBN.";
  }

  if (Validator.isEmpty(data.isbn)) {
    errors.isbn = "ISBN field is required.";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required.";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "Author field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

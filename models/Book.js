const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String
  },
  imgUrl: {
    type: String
  }
});

module.exports = Book = mongoose.model("books", BookSchema);

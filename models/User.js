const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  profile: {
    location: {
      type: String
    },
    bio: {
      type: String
    },
    genres: [
      {
        type: String
      }
    ],
    bookShelf: {
      booksPast: [
        {
          type: Schema.Types.ObjectId,
          ref: "books"
        }
      ],
      booksFuture: [
        {
          type: Schema.Types.ObjectId,
          ref: "books"
        }
      ],
      booksCurrent: [
        {
          type: Schema.Types.ObjectId,
          ref: "books"
        }
      ]
    },
    clubs: [
      {
        type: Schema.Types.ObjectId,
        ref: "clubs"
      }
    ]
  }
});

module.exports = User = mongoose.model("users", UserSchema);

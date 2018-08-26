const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  location: {
    type: String
  },
  bio: {
    type: String,
    required: true
  },
  genres: [
    {
      type: String,
      required: true
    }
  ],
  bookshelf: {
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
  myClubs: [
    {
      type: Schema.Types.ObjectId,
      ref: "clubs"
    }
  ],
  clubs: [
    {
      type: Schema.Types.ObjectId,
      ref: "clubs"
    }
  ]
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

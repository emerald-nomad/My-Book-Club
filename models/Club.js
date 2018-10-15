const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  name: {
    type: String,
    required: true,
    max: 30
  },
  description: {
    type: String,
    required: true
  },
  genres: [
    {
      type: String,
      required: true
    }
  ],
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
  bookCurrent: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  discussionPosts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "users"
        }
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Club = mongoose.model("clubs", ClubSchema);

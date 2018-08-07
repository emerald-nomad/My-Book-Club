const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Load routes
const user = require("./routes/user");
const profile = require("./routes/profile");
const club = require("./routes/club");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Confing
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// Use Routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/club", club);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

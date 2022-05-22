"use strict";
// import './modules/DB'
// import DB from './modules/DB';
const morgan = require("morgan");
const express = require("express");
// init express
const app = new express();
app.use(morgan("dev"));
const port = 3001;
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session"); // session middleware

passport.use(
  new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication
    userDao
      .getUser(username, password)
      .then((user) => {
        if (user) done(null, user);
        else done(null, false, { message: "Username or password wrong" });
      })
      .catch((err) => {
        done(err);
      });
  })
);

const userDao = require("./modules/dao/User_dao");
// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao
    .getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

app.use(express.json());
// const db=new DB;
app.use(
  session({
    secret: "pink-panther",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

const internalOrder = require("./modules/routers/InternalOrder");
const restockOrder = require("./modules/routers/RestockOrder");
const testDescriptors = require("./modules/routers/TestDescriptor");
const SKU = require("./modules/SKU");
const SKU_item = require("./modules/routers/SKU_item");
const item = require("./modules/routers/item");
const test_result = require("./modules/routers/testResult");
const returnOrder = require("./modules/routers/ReturnOrder");
const position = require("./modules/routers/Position");
const user = require("./modules/routers/User");

app.use("/api", internalOrder);
app.use("/api", restockOrder);
app.use("/api", testDescriptors);
app.use("/api", SKU);
app.use("/api", SKU_item);
app.use("/api", item);
app.use("/api", test_result);
app.use("/api", returnOrder);
app.use("/api", position);
app.use("/api", user);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

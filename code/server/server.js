"use strict";
// import './modules/DB'
// import DB from './modules/DB';
const userManager = require("./modules/userManager");
const express = require("express");
// init express
const app = new express();
const port = 3001;

app.use(express.json());
// const db=new DB;




const internalOrder = require("./modules/InternalOrder");
const restockOrder = require("./modules/RestockOrder");
const testDescriptors = require("./modules/TestDescriptor");
const SKU = require("./modules/SKU");
const SKU_item = require("./modules/SKU_item");
const item = require("./modules/item");
const test_result = require("./modules/testResult");

app.use("/api", internalOrder);
app.use("/api", restockOrder);
app.use("/api", testDescriptors);
app.use("/api", SKU);
app.use("/api", SKU_item);
app.use("/api", item);
app.use("/api", test_result);
// USER

// custom middleware: check if a given request is coming from an authenticated user
/*
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};
*/
app.get(
  "/api/userinfo",
  /* isLoggedIn */ (req, res) => {
    // req.user.id
    userManager
      .getUserInfo()
      .then((userInfo) => {
        res.status(200).json(userInfo);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

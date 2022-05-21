"use strict";
const express = require("express");
const routerUser = express.Router();

const User_dao = require("../dao/User_dao");

const { param, body, validationResult } = require("express-validator");

const dao = new User_dao();

routerUser.get("/userinfo", (req, res) => {});

routerUser.get(
  "/suppliers",
  /* isLoggedIn , */ (req, res) => {
    // todo: check is req.user.role == "manager"
    dao
      .getAllSuppliers()
      .then((suppliers) => {
        res.status(200).json(suppliers);
      })
      .catch((err) => {
        res.status(err).json(err.message);
      });
  }
);

module.exports = routerUser;

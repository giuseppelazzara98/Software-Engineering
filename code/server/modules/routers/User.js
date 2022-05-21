"use strict";
const express = require("express");
const routerUser = express.Router();

const User_dao = require("../dao/User_dao");

const { param, body, validationResult } = require("express-validator");

const dao = new User_dao();

routerUser.get("/userinfo", (req, res) => {});

module.exports = routerUser;

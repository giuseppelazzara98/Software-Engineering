"use strict";
const express = require("express");
const routerPO = express.Router();
var fs = require("fs");
const Position_dao = require("./Position_dao");
var {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");

var positionSchema = JSON.parse(
  fs.readFileSync("./JSON-Schemas/position_schema.json").toString()
);
var validator = new Validator({ allErrors: true });
validator.ajv.addSchema([positionSchema]);
var validate = validator.validate;

const dao = new Position_dao();

routerPO.get("/positions", (req, res) => {
  dao
    .getAllPositions()
    .then((positions) => {
      return res.status(200).json(positions);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

routerPO.post("/position", validate({ body: positionSchema }), (req, res) => {
  if (
    !dao.validatePositionID(
      req.body.positionID,
      req.body.aisleID,
      req.body.row,
      req.body.col
    )
  )
    res.status(422).end();
  dao
    .createNewPosition(req.body)
    .then((code) => {
      return res.status(code).end();
    })
    .catch((err) => {
      return res.status(err).end();
    });
});

routerPO.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(422).end();
  } else next(err);
});
module.exports = routerPO;

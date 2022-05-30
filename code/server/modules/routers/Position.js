"use strict";
const express = require("express");
const routerPO = express.Router();
var fs = require("fs");
const Position_dao = require("../dao/Position_dao");
var {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
const { param, body, validationResult } = require("express-validator");

var positionSchema = JSON.parse(
  fs.readFileSync("./JSON-Schemas/position_schema.json").toString()
);
var newPositionSchema = JSON.parse(
  fs.readFileSync("./JSON-Schemas/newPosition_schema.json").toString()
);

var validator = new Validator({ allErrors: true });
validator.ajv.addSchema([positionSchema, newPositionSchema]);
var validate = validator.validate;

const dao = new Position_dao();

routerPO.get("/positions", (req, res) => {
  dao
    .getAllPositions()
    .then((positions) => {
      return res.status(200).json(positions);
    })
    .catch((err) => {
      res.status(500).end();
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
    return res.status(422).end();
  dao
    .createNewPosition(req.body)
    .then((code) => {
      return res.status(code).end();
    })
    .catch((err) => {
      return res.status(err).end();
    });
});

routerPO.put(
  "/position/:positionID",
  validate({ body: newPositionSchema }),
  param("positionID").isNumeric(),
  param("positionID").isLength({ min: 12, max: 12 }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .updatePositionByPosId(req.params.positionID, req.body)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);

routerPO.put(
  "/position/:positionID/changeID",
  body("newPositionID").isNumeric(),
  body("newPositionID").isLength({ min: 12, max: 12 }),
  param("positionID").isLength({ min: 12, max: 12 }),
  param("positionID").isNumeric(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .updatePositionId(req.params.positionID, req.body.newPositionID)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);

routerPO.delete(
  "/position/:positionID",
  param("positionID").isNumeric(),
  param("positionID").isLength({ min: 12, max: 12 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .deletePositionByPosid(req.params.positionID)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);


routerPO.delete(
  "/positions",
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .deleteAll()
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);


routerPO.use(function (err, req, res, next) {
  if (err instanceof ValidationError || err instanceof validationResult) {
    res.status(422).end();
  } else next(err);
});
module.exports = routerPO;

"use strict";
const express = require("express");
const routerRe = express.Router();
const ReturnOrders_dao = require("./ReturnOrders_dao");
const { body, param, check, validationResult } = require("express-validator");

const dao = new ReturnOrders_dao();

routerRe.get("/returnOrders", (req, res) => {
  dao
    .getAllReturnOrders()
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch(() => {
      res.status(500).end();
    });
});

routerRe.get("/returnOrders/:id", param("id").isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).end();
  }
  dao
    .getReturnOrderById(req.params.id)
    .then((order) => {
      return res.status(200).json(order);
    })
    .catch((e) => {
      res.status(e).end();
    });
});
routerRe.post(
  "/returnOrder",
  body("products").isArray(),
  check("products.*.SKUId").isInt(),
  check("products.*.description").isString(),
  check("products.*.price").exists(),
  check("products.*.RFID").exists(),
  body("restockOrderId").isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .createNewReturnOrder(req.body)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);
routerRe.delete("/returnOrder/:id", param("id").isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).end();
  }
  dao
    .deleteReturnOrderById(req.params.id)
    .then(() => {
      return res.status(204).end();
    })
    .catch((e) => {
      return res.status(e).end;
    });
});

module.exports = routerRe;

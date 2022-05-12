'use strict';
const express = require('express');
const routerSKU = express.Router();
const SKU_dao = require('./SKU_dao')
const { body, param, validationResult } = require('express-validator');

const SKU_dao = new SKU_dao(); //dao class

routerSKU.get("/skus", async (req, res) => {
    try {
      const skus = await SKU_dao.getSKUs();
      res.status(200).json(skus);
    } catch (err) {
      res.status(404).end();
    }
  });

  routerSKU.get("/skus:id", async (req, res) => {
    try {
      const id = req.params.id;
      const skus = await SKU_dao.getSKUsID(id);
      res.status(200).json(skus);
    } catch (err) {
      res.status(404).end();
    }
  });

  routerSKU.post("/sku", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let sku = req.body.sku;
    if (
      sku === undefined ||
      sku.RFID === undefined ||
      sku.SKUId === undefined
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
    SKU_dao.postSku(sku);
    return res.status(201).end();
  });

  routerSKU.put("/sku:id", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let sku = req.body.sku;
    let id=req.params.id;
    if (
      sku === undefined ||
      sku.newRFID === undefined ||
      sku.newAvailable === undefined ||
      sku.newDateOfStock === undefined
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
  
    SKU_dao.putSku(sku,id);
    return res.status(201).end();
  });

  routerSKU.put("/sku/:id/position", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let position = req.body.position;
    let id = req.params.id;
    if (
      sku.position === undefined 
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
  
    SKU_dao.putSkuPosition(id,position);
    return res.status(201).end();
  });

  routerSKU.delete("/skus/:id", (req, res) => {
    try {
      const id = req.params.id;
      SKU_dao.deleteSKU(id);
      res.status(204).end();
    } catch (err) {
      res.status(503).end();
    }
  });






module.exports = routerSKU;
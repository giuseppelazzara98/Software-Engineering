'use strict';
const express = require('express');
const routerSKU_item = express.Router();
const SKU_dao = require('./SKU_item_dao')
const { body, param, validationResult } = require('express-validator');

const SKU_item_dao = new SKU_item_dao(); //dao class

routerSKU_item.get("/api/skuitems", async (req, res) => {
    try {
      const skuitems = await SKU_dao.getSKUItems();
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).end();
    }
  });
  routerSKU_item.get("/api/skuitems:id", async (req, res) => {
    try {
      const id = req.params.id;
      const skuitems = await SKU_dao.getSKUItemsID(id);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(404).end();
    }
  });
  routerSKU_item.get("/api/skuitems:rfid", async (req, res) => {
    try {
      const rfid = req.params.rfid;
      const skuitems = await SKU_dao.getSKUItemsRFID(rfid);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(404).end();
    }
  });
  
  routerSKU_item.post("/api/skuitem", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let skuitem = req.body.skuitem;
    if (
      skuitem === undefined ||
      skuitem.RFID === undefined ||
      skuitem.SKUId === undefined
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
    await SKU_dao.newTableName(); //MODIFY THIS FUNCTION
    SKU_dao.postSkuItem(skuitem);
    return res.status(201).end();
  });
  
  routerSKU_item.put("/api/skuitem:rfid", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let skuitem = req.body.skuitem;
    if (
      skuitem === undefined ||
      skuitem.newRFID === undefined ||
      skuitem.newAvailable === undefined ||
      skuitem.newDateOfStock === undefined
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
  
    SKU_dao.putSkuItem(skuitem);
    return res.status(201).end();
  });
  
  routerSKU_item.delete("/api/skuitems/:rfid", (req, res) => {
    try {
      const rfid = req.params.rfid;
      SKU_dao.deleteSKUItem(rfid);
      res.status(204).end();
    } catch (err) {
      res.status(503).end();
    }
  });
  






module.exports = routerSKU_item;
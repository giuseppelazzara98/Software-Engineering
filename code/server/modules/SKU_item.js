'use strict';
const express = require('express');
const routerSKU_item = express.Router();
const SKUItem_dao = require('./SKU_item_dao');

const { body, param, validationResult } = require('express-validator');

const SKU_item_dao = new SKUItem_dao(); //dao class

routerSKU_item.get("/skuitems", async (req, res) => {
    try {
      const skuitems = await SKU_item_dao.getSKUItems();
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });
  routerSKU_item.get("/skuitems:id", async (req, res) => {
    try {
      const id = req.params.id;
      const skuitems = await SKU_item_dao.getSKUItemsID(id);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });
  routerSKU_item.get("/skuitems:rfid", async (req, res) => {
    try {
      const rfid = req.params.rfid;
      const skuitems = await SKU_item_dao.getSKUItemsRFID(rfid);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });
  
  routerSKU_item.post("/skuitem", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let skuitem = req.body.skuitem;
    if (
      skuitem === undefined ||
      skuitem.RFID === undefined ||
      skuitem.SKUId === undefined ||
      skuitem.DateOfStock===undefined
    ) {
      return res.status(422).send("422 Unprocessable Entity"); //ADD CHECK FOR DATA
    }
    try{
    SKU_item_dao.postSkuItem(skuitem);
    }
    catch(err){
      return res.status(404).send("404 NOT FOUND");
    }
    return res.status(201).send("201 Created");
  });
  
  routerSKU_item.put("/skuitem:rfid", async (req, res) => {
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
      return res.status(404).send("422 Unprocessable Entity");
    }
    const rfid=req.params.rfid;
    try{
      SKU_item_dao.putSkuItem(skuitem,rfid);
    }
    catch (err){
      return res.status(404).send("404 NOT FOUND");
    }
    return res.status(201).send("201 Created");
    
  });
  
  routerSKU_item.delete("/skuitems/:rfid", (req, res) => {
    try {
      const rfid = req.params.rfid;
      SKU_item_dao.deleteSKUItem(rfid);
      res.status(204).end();
    } catch (err) {
      res.status(503).end();
    }
  });
  






module.exports = routerSKU_item;
'use strict';
const express = require('express');
const routerSKU_item = express.Router();
const SKUItem_dao = require('./SKU_item_dao');

const { body, param, validationResult } = require('express-validator');

const SKU_item_dao = new SKUItem_dao(); //dao class
//ADD 404
routerSKU_item.get("/skuitems", async (req, res) => {
    try {
      const skuitems = await SKU_item_dao.getSKUItems();
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });
  routerSKU_item.get("/skuitems/sku/:id",param("id").isInt(), async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      const skuitems = await SKU_item_dao.getSKUItemsID(id);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });
  routerSKU_item.get("/skuitems/:rfid",
  param("rfid").isString(),
  param("rfid").isLength({min:32}),
  param("rfid").isLength({max:32})
  , async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    try {
      const rfid = req.params.rfid;
      const skuitems = await SKU_item_dao.getSKUItemsRFID(rfid);
      if (skuitems.length === 0) {
        return res.status(404).send("404 NOT FOUND");
      }
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });
  
  routerSKU_item.post("/skuitem", 
  body("RFID").isString(),
  body("RFID").isLength({min:32}),
  body("RFID").isLength({max:32}),
  body("SKUId").isInt(),
  body("DateOfStock").isString(),
  async (req, res) => {
    const errors=validationResult(req);
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    let skuitem = req.body;
    if (
      skuitem === undefined ||
      skuitem.RFID === undefined ||
      skuitem.SKUId === undefined ||
      skuitem.DateOfStock===undefined//validazione data
    ) {
      return res.status(422).send("422 Unprocessable Entity"); 
    }
    try{
    SKU_item_dao.postSkuItem(skuitem);
    return res.status(201).send("201 Created");
    }
    catch(err){
      return res.status(503).send("503 INTERNAL SERVER ERROR");
    }
    
  });
  
  routerSKU_item.put("/skuitems/:rfid", 
  body("newRFID").isString(),
  body("newRFID").isLength({min:32}),
  body("newRFID").isLength({max:32}),
  param("rfid").isString(),
  param("newRFID").isLength({min:32}),
  param("newRFID").isLength({max:32}),
  body("newAvailable").isInt(),
  body("newAvailable").isLength({min:1}),
  body("newAvailable").isLength({max:1}),//check format data
  async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    let skuitem = req.body;
    if (
      skuitem === undefined ||
      skuitem.newRFID === undefined ||
      skuitem.newAvailable === undefined 
    ) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    const rfid=req.params.rfid;
    
      SKU_item_dao.putSkuItem(skuitem,rfid);
      return res.status(201).send("201 Created");
  }
    catch (err){
      return res.status(503).send("503 Service Unavailable");
    }
    
    
  });
  
  routerSKU_item.delete("/skuitems/:rfid",
  param("rfid").isString(),
  param("rfid").isLength({min:32}),
  param("rfid").isLength({max:32}),
  (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const rfid = req.params.rfid;
      SKU_item_dao.deleteSKUItem(rfid);
      return res.status(204).send("204 succes");
    } catch (err) {
      return res.status(503).send("503 Service Unavailable");
    }
  });
  






module.exports = routerSKU_item;
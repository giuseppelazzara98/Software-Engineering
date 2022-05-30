'use strict';
const express = require('express');
const routerSKU_item = express.Router();
const SKUItemService = require('../services/SKU_item_service');
const dayjs = require ('dayjs');
const { body, param, validationResult } = require('express-validator');

const SKU_item_service = new SKUItemService(); 

routerSKU_item.get("/skuitems", async (req, res) => {
    try {
      const skuitems = await SKU_item_service.getSKUItems();
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(err).end();
    }
  });
  routerSKU_item.get("/skuitems/sku/:id",
  param("id").isInt(), async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      const skuitems = await SKU_item_service.getSKUItemsID(id);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(err).end();
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
      const skuitems = await SKU_item_service.getSKUItemsRFID(rfid);
      res.status(200).json(skuitems);
    } catch (err) {
      res.status(err).end();
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
      return res.status(422).send("422 Unprocessable Entity");
    }
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    let skuitem = req.body;
    if (
      skuitem === undefined ||
      skuitem.RFID === undefined ||
      skuitem.SKUId === undefined ||
      skuitem.DateOfStock===undefined
    ) {
      return res.status(422).send("422 Unprocessable Entity"); 
    }
    if ((skuitem.DateOfStock !== null && skuitem.DateOfStock !== undefined && skuitem.DateOfStock !== "") &&
            !(dayjs(skuitem.DateOfStock, ['YYYY/MM/DD', 'YYYY/MM/DD HH:mm'], true).isValid())) {
            console.log("Invalid date");
            return res.status(422).send("422 Unprocessable Entity"); 
        }
    try{
    await SKU_item_service.postSkuItem(skuitem);
    return res.status(201).send("201 Created");
    }
    catch(err){
      return res.status(err).end();
    }
    
  });
  
  routerSKU_item.put("/skuitems/:rfid", 
  body("newRFID").isString(),
  body("newRFID").isLength({min:32}),
  body("newRFID").isLength({max:32}),
  param("rfid").isString(),
  param("rfid").isLength({min:32}),
  param("rfid").isLength({max:32}),
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
    if(!(dayjs(skuitem.newDateOfStock,"YYYY/MM/DD",true).isValid()||dayjs(skuitem.newDateOfStock,"YYYY/MM/DD HH:MM",true).isValid()||skuitem.newDateOfStock==null)){
      return res.status(422).send("422 Unprocessable Entity"); 
    }
      const rfid=req.params.rfid;
      await SKU_item_service.putSkuItem(skuitem,rfid);
      return res.status(201).send("201 Created");
  }
    catch (err){
      return res.status(err).end();
    }
    
    
  });
  
  routerSKU_item.delete("/skuitems/:rfid",
  param("rfid").isString(),
  param("rfid").isLength({min:32}),
  param("rfid").isLength({max:32}),
  async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const rfid = req.params.rfid;
      await SKU_item_service.deleteSKUItem(rfid);
      return res.status(204).send("204 success");
    } catch (err) {
      return res.status(err).end();
    }
  });
  






module.exports = routerSKU_item;
'use strict';
const express = require('express');
const routerSKU = express.Router();
const SKU_Dao = require('./SKU_dao');
const { body, param, validationResult } = require('express-validator');

const SKU_dao = new SKU_Dao(); //dao class

routerSKU.get("/skus", async (req, res) => {
    try {
      const skus = await SKU_dao.getSKUs();
      return res.status(200).json(skus);
    } catch (err) {
      return res.status(500).send("500 Internal Server Error");
    }
  });

  routerSKU.get("/skus/:id", param('id').isInt(), async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      const skus = await SKU_dao.getSKUsID(id);
      if (skus.length===0){
        return res.status(404).send("404 NOT FOUND")
      }
      return res.status(200).json(skus);
    } catch (err) {
      return res.status(500).send("500 Internal Server Error");
    }
  });

  routerSKU.post("/sku",
  body("availableQuantity").isInt(),
  body("weight").isNumeric(),
  body("price").isNumeric(),
  body("notes").isString(),
  body("description").isString(),
  async (req, res) => {
    try{
      const errors=validationResult(req);
    if (Object.keys(req.body).length === 0) {
       return res.status(422).send("422 Unprocessable Entity");
    }
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    
    if (
      req.body === undefined || req.body.description === undefined || req.body.weight === undefined || req.body.volume === undefined
      ||req.body.notes === undefined || req.body.price===undefined||req.body.availableQuantity === undefined 
      || Number(req.body.weight)<=0|| Number(req.body.volume)<=0 || Number(req.body.price)<=0
    ) {
       return res.status(422).send("422 Unprocessable Entity"); 
    }
    SKU_dao.postSku(req.body);
     return res.status(201).send("Created");
  }
    catch (err) {
      return res.status(503).send("503 Service Unavailable");
    }
  });

  routerSKU.put("/sku/:id",body("newAvailableQuantity").isInt(),
  body("newAvailableQuantity").isInt(),
  body("newDescription").isString(),
  body("newWeight").isNumeric(),
  body("newVolume").isNumeric(),
  body("newNotes").isString(),
  body("newPrice").isNumeric(),
  async (req, res) => {
    const errors=validationResult(req);
    try{
    if (Object.keys(req.body).length === 0) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    let sku = req.body;
    let id=req.params.id;
    if (
      sku === undefined ||
      sku.newDescription === undefined ||
      sku.newWeight === undefined ||
      sku.newVolume === undefined ||
      sku.newNotes === undefined ||
      sku.newPrice === undefined 
    ) {
      return res.status(422).send("422 Unprocessable Entity"); 
    }

    const volume= Number(sku.newVolume) * Number(sku.newavailableQuantity);
    const weight= Number(sku.newWeight) * Number(sku.newavailableQuantity);
   
    let info= await SKU_dao.checkPosition(id);
    if ( (Number(info.maxWeight) - Number(info.occupiedWeight)) > weight && (Number(info.maxVolume) - Number(info.occupiedVolume)) > volume ){
        SKU_dao.putSku(sku,id);
        return res.status(200).send("200 OK");
    }
    else {
      return res.status(422).send("422 Unprocessable Entity");
    }
  }
  catch(err){
    return res.status(500).send("503 Service Unavailable");
  }
  


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

  routerSKU.delete("/skus/:id",param('id').isInt(), (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      SKU_dao.deleteSKU(id);
      return res.status(204).send("204 No Content");
    } catch (err) {
      return res.status(503).send("503 Service Unavailable");
    }
  });






module.exports = routerSKU;
'use strict';
const express = require('express');
const routerSKU = express.Router();
const SKUService = require('../services/SKU_service');
const { body, param, validationResult } = require('express-validator');
const dayjs = require ('dayjs');

const SKU_service = new SKUService(); 

routerSKU.get("/skus", async (req, res) => {
    try {
      const skus = await SKU_service.getSKUs();
      return res.status(200).json(skus);
    } catch (err) {
      return res.status(err).end();
    }
  });

  routerSKU.get("/skus/:id", 
  param('id').isInt(), 
  async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      const skus = await SKU_service.getSKUsID(id);

      return res.status(200).json(skus);
    } catch (err) {
      return res.status(err).end();
    }
  });

  routerSKU.post("/sku",
  body("availableQuantity").isInt(),
  body("weight").isNumeric(),
  body("weight").isInt(),
  body("volume").isInt(),
  body("price").isNumeric(),
  body("volume").isNumeric(),
  body("notes").isString(),
  body("notes").isLength({min:1}),
  body("description").isString(),
  body("description").isLength({min:1}),
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
      || Number(req.body.weight)<=0|| Number(req.body.volume)<=0 || Number(req.body.price)<=0 || Number(req.body.availableQuantity)<=0
    ) {
       return res.status(422).send("422 Unprocessable Entity"); 
    }
      await SKU_service.postSku(req.body);
      return res.status(201).send("Created");
  }
    catch (err) {
      return res.status(err).end();
    }
  });

  routerSKU.put("/sku/:id",
  body("newAvailableQuantity").isInt(),
  body("newDescription").isString(),
  body("newWeight").isNumeric(),
  body("newVolume").isNumeric(),
  body("newNotes").isString(),
  body("newPrice").isNumeric(),
  param("id").isInt(),
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
    await SKU_service.putSku(sku,id);
    return res.status(200).end();

  }
  catch(err){
    return res.status(err).end();
  }
  });

  routerSKU.put("/sku/:id/position",
  param("id").isInt(),
  body("position").isString(),
  body("position").isLength({min:12}),
  body("position").isLength({max:12}),
  async (req, res) => {
    const errors=validationResult(req);
    try{
    if (Object.keys(req.body).length === 0) {
      return res.status(422).end();
    }
    if(!errors.isEmpty()){
      return res.status(422).send("422 Unprocessable Entity");
    }
    let position = req.body.position;
    let id = req.params.id;
    if (
      req.body.position === undefined 
    ) {
      return res.status(422).end();
    }  
    await SKU_service.putSkuPosition(id,position);
    return res.status(201).end();
  }
  catch(err){
    return res.status(err).end();
  }
  });

  routerSKU.delete("/skus/:id",
  param('id').isInt(), async(req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      await SKU_service.deleteSKU(id);
      return res.status(204).end();
    } catch (err) {
      return res.status(err).end();
    }
  });






module.exports = routerSKU;
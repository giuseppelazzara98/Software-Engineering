'use strict';
const express = require('express');
const routeritem = express.Router();
const itemService = require('../services/item_service');
const { body, param, validationResult } = require('express-validator');

const item_service = new itemService();
routeritem.get("/items", async (req, res) => {
    try {
      const items = await item_service.getItems();
       res.status(200).json(items);
    } catch (err) {
      res.status(err).end();
    }
  });
  
  routeritem.get("/items/:id", param('id').isInt(),async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      const items = await item_service.getItemsById(id);
      return res.status(200).json(items);
    } catch (err) {
        res.status(err).end();
    }
  });
  
  routeritem.post("/item",
  body('id').isInt(),
  body('SKUId').isInt(),
  body('supplierId').isInt(),
  body('price').isNumeric(),
  body('description').isString(),
   async (req, res) => {
    try{
    if (Object.keys(req.body).length === 0) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    let item = req.body;
    if (
      item === undefined ||
      item.id===undefined||
      item.description === undefined ||
      item.price === undefined ||
      item.SKUId === undefined ||
      item.supplierId === undefined||
      Number(item.price)<=0
    ) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    await item_service.postItem(item);
    return res.status(201).send("Created");
  }
  catch(err){
    res.status(err).end();
  }
  });
  
  routeritem.put("/item/:id", 
  param('id').isInt(),
  body('newDescription').isString(),
  body('newPrice').isNumeric(), 
  async (req, res) => {
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(422).send("422 Unprocessable Entity");
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    let item = req.body;
    let id = req.params.id;
    if (
      item === undefined ||
      item.newDescription === undefined ||
      item.newPrice === undefined ||
      Number(item.newPrice)<=0
    ) {
      return res.status(422).send("422 Unprocessable Entity");
    }
    
    await item_service.putItem(item, id);
    return res.status(200).send("OK");
  }
  catch(err){
    res.status(err).end();
  }
  });
  
  routeritem.delete("/items/:id",
  param('id').isInt(), 
  async(req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      await item_service.deleteItem(id);
      return res.status(204).end();
    } catch (err) {
       res.status(err).end();
    }
  });

module.exports = routeritem;
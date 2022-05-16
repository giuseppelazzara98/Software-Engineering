'use strict';
const express = require('express');
const routeritem = express.Router();
const itemDao = require('./item_dao');
const { body, param, validationResult } = require('express-validator');

const item_dao = new itemDao();
routeritem.get("/items", async (req, res) => {
    try {
      const items = await item_dao.getItems();
       res.status(200).json(items);
    } catch (err) {
       res.status(500).send("500 Internal Server Error");
    }
  });
  
  routeritem.get("/items/:id", param('id').isInt(),async (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      const items = await item_dao.getItemsById(id);
      if (items.length===0){
        return res.status(404).send("404 NOT FOUND")
      }
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).send("500 Internal Server Error");
    }
  });
  
  routeritem.post("/item",body('id').isInt(),body('SKUId').isInt(),body('supplierId').isInt(), async (req, res) => {
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
    const check1 = await item_dao.checkSKUId(item.supplierId,item.SKUId);
    if (check1.length!==0){
      return res.status(422).send("422 Unprocessable Entity");
    }
    const check2 = await item_dao.checkId(item.supplierId,item.id);
    if (check2.length!==0){
      return res.status(422).send("422 Unprocessable Entity");
    }
  
    item_dao.postItem(item);
    return res.status(201).send("Created");
  }
  catch(err){
    return res.status(503).send("503 Service Unavailable");
  }
  });
  
  routeritem.put("/item/:id", param('id').isInt(), async (req, res) => {
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
    const check = await item_dao.getItemsById(id);
    if (check.length===0){
      return res.status(422).send("404 NOT FOUND");
    }
    item_dao.putItem(item, id);
    return res.status(200).send("OK");
  }
  catch(err){
    return res.status(503).send("503 Service Unavailable");
  }
  });
  
  routeritem.delete("/items/:id",param('id').isInt(), (req, res) => {
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).send("422 Unprocessable Entity");
      }
      const id = req.params.id;
      item_dao.deleteItem(id);
      return res.status(204).send("204 No Content");
    } catch (err) {
      return res.status(503).send("503 Service Unavailables");
    }
  });

module.exports = routeritem;
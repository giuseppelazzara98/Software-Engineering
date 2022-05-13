'use strict';
const express = require('express');
const routeritem = express.Router();
const item_dao = require('./item_dao');
const { body, param, validationResult } = require('express-validator');
const item_dao = require('./item_dao');

const item_dao = new item_dao();
routeritem.get("/items", async (req, res) => {
    try {
      const items = await item_dao.getItems();
      res.status(200).json(items);
    } catch (err) {
      res.status(404).end();
    }
  });
  
  routeritem.get("/items/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const items = await item_dao.getItemsById(id);
      res.status(200).json(items);
    } catch (err) {
      res.status(404).end();
    }
  });
  
  routeritem.post("/item", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let item = req.body.item;
    if (
      item === undefined ||
      item.id === undefined ||
      item.description === undefined ||
      item.price === undefined ||
      item.SKUId === undefined ||
      item.supplierId === undefined
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
  
    item_dao.postItem(item);
    return res.status(201).end();
  });
  
  routeritem.put("/item/:id", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ error: `Empty body request` });
    }
    let item = req.body.item;
    let id = req.params.id;
    if (
      item === undefined ||
      item.newDescription === undefined ||
      item.newPrice === undefined
    ) {
      return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
    }
  
    item_dao.putItem(item, id);
    return res.status(201).end();
  });
  
  routeritem.delete("/items/:id", (req, res) => {
    try {
      const id = req.params.id;
      item_dao.deleteItem(id);
      res.status(204).end();
    } catch (err) {
      res.status(503).end();
    }
  });

module.exports = routeritem;
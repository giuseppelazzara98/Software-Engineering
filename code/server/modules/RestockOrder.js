'use strict';
const express = require('express');
const routerRO = express.Router();
const ROManager = require('./ROManager')

const roManager = new ROManager();

// GET
routerRO.get('/restockOrders', async (req, res) => {
  const list = await roManager.getAllRO();
  if(list){
    return res.status(200).json(list);
  }
  return res.status(500).json('Error');
  
})

module.exports = routerRO;
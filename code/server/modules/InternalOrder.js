'use strict';
const express = require('express');
const routerIO = express.Router();
const IOManager = require('./IOManager')

const ioManager = new IOManager();

// GET
routerIO.get('/internalOrders', async (req, res) =>{
  const list = await ioManager.getAllIO();
  // console.log(list);
  return res.status(200).json(list);
});

routerIO.get('/internalOrdersIssued', async (req, res) =>{
  const list = await ioManager.getAllIOIssued();
  // console.log(list);
  return res.status(200).json(list);
});

routerIO.get('/internalOrdersAccepted', async (req, res) =>{
  const list = await ioManager.getAllIOAccepted();
  return res.status(200).json(list);
});

routerIO.get('/internalOrders/:id', async(req, res) =>{
  const io = await ioManager.getIO(req.params.id);
  return res.status(200).json(io);
});

// POST
routerIO.post('/internalOrders', async (req, res) => {
  const result = await ioManager.addIO(req.body);
  if(result===true){
    return res.status(201).json('Success');
  }
  return res.status(422).json('Error');
});

// PUT
routerIO.put('/internalOrders/:id', async (req, res)=>{
  // console.log("ID:" + req.params.id);
  // console.log("Body: " + req.body.newState);
  const result = await ioManager.updateStateIO(req.params.id, req.body);
  if (result === 200){
    return res.status(200).json('SUCCESS');
  } else if(result === 404){
    return res.status(404).json("404 Not Found");
  } else if(result === 422){
    return res.status(422).json('422 Unprocessable Entity');
  } else {
    return res.status(503).json('Service Unavailable');
  }
  
});

// DELETE
routerIO.delete('/internalOrders/:id', async(req, res) => {
  const result = await ioManager.deleteIO(req.params.id);
  if(result){
    return res.status(204).json('SUCCESS');
  }
  return res.status(503).json('ERROR');
})

module.exports = routerIO;
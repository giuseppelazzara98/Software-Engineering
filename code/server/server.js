'use strict';
import './modules/DB'
import DB from './modules/DB';
const express = require('express');
// init express
const app = new express();
const port = 3001;

app.use(express.json());
const db=new DB;

const IOManager = require('./modules/IOManager'); //for managing Internal Orders

//SKUITEM
app.get('/api/skuitems', async (req,res) => {
  try {
    const skuitems = await db.getSKUItems();
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(500).end();
  }
});
app.get('/api/skuitems:id', async (req,res) => {
  try {
    const id= req.params.id;
    const skuitems = await db.getSKUItemsID(id);
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});
app.get('/api/skuitems:rfid', async (req,res) => {
  try {
    const rfid= req.params.rfid;
    const skuitems = await db.getSKUItemsRFID(rfid);
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});

app.post('/api/skuitem', async (req,res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({error: `Empty body request`});
  }
  let skuitem = req.body.skuitem;
  if (skuitem === undefined || skuitem.RFID === undefined || skuitem.SKUId === undefined ) {
    return res.status(422).json({error: `Invalid user data`});//ADD CHECK FOR DATA
  }
  await db.newTableName();//MODIFY THIS FUNCTION 
  db.postSkuItem(skuitem);
  return res.status(201).end();
});

app.put('/api/skuitem:rfid', async (req,res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({error: `Empty body request`});
  }
  let skuitem = req.body.skuitem;
  if (skuitem === undefined || skuitem.newRFID === undefined || skuitem.newAvailable === undefined|| skuitem.newDateOfStock === undefined ) {
    return res.status(422).json({error: `Invalid user data`});//ADD CHECK FOR DATA
  }

  db.putSkuItem(skuitem);
  return res.status(201).end();
});

app.delete('/api/skuitems/:rfid', (req,res) => {
  try {
    const rfid= req.params.rfid;
    db.deleteSKUItem(rfid);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
});

// INTERNAL ORDERS
const ioManager = new IOManager();

app.get('/api/internalOrders', async (req, res) =>{
  const list = await ioManager.getAllIO();
  // console.log(list);
  return res.status(200).json(list);
});

app.get('/api/internalOrdersIssued', async (req, res) =>{
  const list = await ioManager.getAllIOIssued();
  // console.log(list);
  return res.status(200).json(list);
});

app.get('/api/internalOrdersAccepted', async (req, res) =>{
  const list = await ioManager.getAllIOAccepted();
  return res.status(200).json(list);
});

app.get('/api/internalOrders/:id', async(req, res) =>{
  const io = await ioManager.getIO(req.params.id);
  return res.status(200).json(io);
});

app.post('/api/internalOrders', async (req, res) => {
  const result = await ioManager.addIO(req.body);
  if(result===true){
    return res.status(201).json('Success');
  }
  return res.status(422).json('Error');
});
//TEST RESULT

app.get('/api/skuitems/:rfid/testResults', async (req,res) => {
  try {
    const rfid= req.params.rfid;
    const testResults = await db.getTestResultsByRFID(rfid);
    res.status(200).json(testResults);
  } catch (err) {
    res.status(404).end();
  }
});

app.get('/api/skuitems/:rfid/testResults/:id', async (req,res) => {
  try {
    const rfid= req.params.rfid;
    const id = req.params.id;
    const testResults = await db.getTestResultsById(rfid, id);
    res.status(200).json(testResults);
  } catch (err) {
    res.status(404).end();
  }
});

app.post('/api/skuitems/testResult', async (req,res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({error: `Empty body request`});
  }
  let testResult = req.body.testResult;
  if (testResult === undefined || testResult.rfid === undefined || testResult.idTestDescriptor === undefined|| testResult.Date === undefined || testResult.Result === undefined ) {
    return res.status(422).json({error: `Invalid user data`});//ADD CHECK FOR DATA
  }

  db.postTestResult(testResult);
  return res.status(201).end();
});


app.put('/api/skuitems/:rfid/testResult/:id', async (req,res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({error: `Empty body request`});
  }
  let testResult = req.body.testResult;
  let rfid=req.params.rfid;
  let id=req.params.id;
  if (testResult === undefined || testResult.newIdTestDescriptor === undefined || testResult.newDate === undefined|| testResult.newResult === undefined ) {
    return res.status(422).json({error: `Invalid user data`});//ADD CHECK FOR DATA
  }

  db.putTestResult(skuitem,rfid,id);
  return res.status(201).end();
});








// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
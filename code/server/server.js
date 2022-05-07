'use strict';
import './modules/DB'
import DB from './modules/DB';
const express = require('express');
// init express
const app = new express();
const port = 3001;

app.use(express.json());
const db=new DB;

//SKUITEM
app.get('/api/skuitems', async (req,res) => {
  try {
    const skuitems = await db.getSKUItems();
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
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

app.delete('/api/skuitems/:rfid', (req,res) => {
  try {
    const rfid= req.params.rfid;
    db.deleteSKUItem(rfid);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
});





// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
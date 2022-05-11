"use strict";
// import './modules/DB'
// import DB from './modules/DB';
const userManager = require("./modules/userManager");
const express = require("express");
// init express
const app = new express();
const port = 3001;

app.use(express.json());
// const db=new DB;

//SKUITEM
app.get("/api/skuitems", async (req, res) => {
  try {
    const skuitems = await db.getSKUItems();
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(500).end();
  }
});
app.get("/api/skuitems:id", async (req, res) => {
  try {
    const id = req.params.id;
    const skuitems = await db.getSKUItemsID(id);
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});
app.get("/api/skuitems:rfid", async (req, res) => {
  try {
    const rfid = req.params.rfid;
    const skuitems = await db.getSKUItemsRFID(rfid);
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});

app.post("/api/skuitem", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({ error: `Empty body request` });
  }
  let skuitem = req.body.skuitem;
  if (
    skuitem === undefined ||
    skuitem.RFID === undefined ||
    skuitem.SKUId === undefined
  ) {
    return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
  }
  await db.newTableName(); //MODIFY THIS FUNCTION
  db.postSkuItem(skuitem);
  return res.status(201).end();
});

app.put("/api/skuitem:rfid", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({ error: `Empty body request` });
  }
  let skuitem = req.body.skuitem;
  if (
    skuitem === undefined ||
    skuitem.newRFID === undefined ||
    skuitem.newAvailable === undefined ||
    skuitem.newDateOfStock === undefined
  ) {
    return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
  }

  db.putSkuItem(skuitem);
  return res.status(201).end();
});

app.delete("/api/skuitems/:rfid", (req, res) => {
  try {
    const rfid = req.params.rfid;
    db.deleteSKUItem(rfid);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
});

//TEST RESULT

app.get("/api/skuitems/:rfid/testResults", async (req, res) => {
  try {
    const rfid = req.params.rfid;
    const testResults = await db.getTestResultsByRFID(rfid);
    res.status(200).json(testResults);
  } catch (err) {
    res.status(404).end();
  }
});

app.get("/api/skuitems/:rfid/testResults/:id", async (req, res) => {
  try {
    const rfid = req.params.rfid;
    const id = req.params.id;
    const testResults = await db.getTestResultsById(rfid, id);
    res.status(200).json(testResults);
  } catch (err) {
    res.status(404).end();
  }
});

app.post("/api/skuitems/testResult", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({ error: `Empty body request` });
  }
  let testResult = req.body.testResult;
  if (
    testResult === undefined ||
    testResult.rfid === undefined ||
    testResult.idTestDescriptor === undefined ||
    testResult.Date === undefined ||
    testResult.Result === undefined
  ) {
    return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
  }

  db.postTestResult(testResult);
  return res.status(201).end();
});

app.put("/api/skuitems/:rfid/testResult/:id", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({ error: `Empty body request` });
  }
  let testResult = req.body.testResult;
  let rfid = req.params.rfid;
  let id = req.params.id;
  if (
    testResult === undefined ||
    testResult.newIdTestDescriptor === undefined ||
    testResult.newDate === undefined ||
    testResult.newResult === undefined
  ) {
    return res.status(422).json({ error: `Invalid user data` }); //ADD CHECK FOR DATA
  }

  db.putTestResult(skuitem, rfid, id);
  return res.status(201).end();
});

app.delete("/api/skuitems/:rfid/testResult/:id", (req, res) => {
  try {
    const rfid = req.params.rfid;
    const id = req.params.id;
    db.deleteTestResult(rfid, id);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
});

//ITEM

app.get("/api/items", async (req, res) => {
  try {
    const items = await db.getItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(404).end();
  }
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const items = await db.getItemsById(id);
    res.status(200).json(items);
  } catch (err) {
    res.status(404).end();
  }
});

app.post("/api/item", async (req, res) => {
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

  db.postItem(item);
  return res.status(201).end();
});

app.put("/api/item/:id", async (req, res) => {
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

  db.putItem(item, id);
  return res.status(201).end();
});

app.delete("/api/items/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.deleteItem(id);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
});

const internalOrder = require("./modules/InternalOrder");
const restockOrder = require("./modules/RestockOrder");
app.use("/api", internalOrder);
app.use("/api", restockOrder);

// USER

// custom middleware: check if a given request is coming from an authenticated user
/*
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};
*/
app.get(
  "/api/userinfo",
  /* isLoggedIn */ (req, res) => {
    // req.user.id
    userManager
      .getUserInfo()
      .then((userInfo) => {
        res.status(200).json(userInfo);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

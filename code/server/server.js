"use strict";
// import './modules/DB'
// import DB from './modules/DB';
const morgan = require("morgan");
const express = require("express");
const sqlite3 = require('sqlite3');
// init express
const app = new express();
app.use(morgan("dev"));
const port = 3001;

const session = require("express-session"); // session middleware
const passport = require("./modules/passport");
const db = new sqlite3.Database('./modules/database/ezwh.sqlite', (err) => {
  if (err) {
    console.log(`Error Occured - ${err.message}`);
  } else {
    console.log('DataBase Connected');
  }
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  const query = 'CREATE TABLE internalOrders (id INTEGER PRIMARY KEY , issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, customerID INTEGER NOT NULL);';
  db.run(query, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query1 = 'CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, price NUMERIC, SKUid INTEGER, supplierId INTEGER);';
  db.run(query1, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  
  const query2 = 'CREATE TABLE restockOrders (id INTEGER PRIMARY KEY , issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, supplierID INTEGER NOT NULL, transportNoteID INTEGER, skuItems TEXT);';
  db.run(query2, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query3 = 'CREATE TABLE SKUItems (rowID INTEGER PRIMARY KEY , RFID TEXT, SKUId INTEGER, Available INTEGER, DateOfStock TEXT);';
  db.run(query3, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query4 = 'CREATE TABLE SKUs (id INTEGER PRIMARY KEY , description TEXT, weight NUMERIC, volume NUMERIC, notes TEXT, position INTEGER, availableQuantity INTEGER, price NUMERIC, testDescriptors TEXT);';
  db.run(query4, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query5 = 'CREATE TABLE testDescriptors (id INTEGER PRIMARY KEY, name TEXT, procedureDescription TEXT, idSKU INTEGER);';
  db.run(query5, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query6 = 'CREATE TABLE testResults (id INTEGER PRIMARY KEY , rfid TEXT, idTestDescriptor INTEGER, Date TEXT, Result INTEGER);';
  db.run(query6, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query7 = 'CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, name TEXT, surname TEXT, type TEXT);';
  db.run(query7, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query8 = 'CREATE TABLE returnOrder (id INTEGER PRIMARY KEY AUTOINCREMENT, returnDate TEXT, products TEXT, restockOrderId INTEGER REFERENCES restockOrders (id) ON DELETE CASCADE ON UPDATE CASCADE);';
  db.run(query8, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query9 = 'CREATE TABLE position (id INTEGER PRIMARY KEY AUTOINCREMENT, positionID TEXT, aisleID TEXT, row TEXT, col TEXT, maxWeight INTEGER, maxVolume INTEGER, occupiedWeight INTEGER, occupiedVolume INTEGER);';
  db.run(query9, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });
  const query10 = 'CREATE TABLE transportNote (id INTEGER PRIMARY KEY , deliveryDate TEXT);';
  db.run(query10, (err) => {
    if (err) {
      console.log('Some Error Occured');
    } else {
      console.log('Table Created');
    }
  });


  
});
app.use(express.json());
// const db=new DB;
app.use(
  session({
    secret: "pink-panther",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

const internalOrder = require("./modules/routers/InternalOrder");
const restockOrder = require("./modules/routers/RestockOrder");
const testDescriptors = require("./modules/routers/TestDescriptor");
const SKU = require("./modules/routers/SKU");
const SKU_item = require("./modules/routers/SKU_item");
const item = require("./modules/routers/item");
const test_result = require("./modules/routers/testResult");
const returnOrder = require("./modules/routers/ReturnOrder");
const position = require("./modules/routers/Position");
const user = require("./modules/routers/User");

app.use("/api", internalOrder);
app.use("/api", restockOrder);
app.use("/api", testDescriptors);
app.use("/api", SKU);
app.use("/api", SKU_item);
app.use("/api", item);
app.use("/api", test_result);
app.use("/api", returnOrder);
app.use("/api", position);
app.use("/api", user);

// activate the server



module.exports = app;

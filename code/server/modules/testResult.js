'use strict';
const express = require('express');
const routertestResult = express.Router();
const testResult_dao = require('./testResult_dao');
const { body, param, validationResult } = require('express-validator');


const testResult_dao = new testResult_dao();
routertestResult.get("/skuitems/:rfid/testResults", async (req, res) => {
    try {
      const rfid = req.params.rfid;
      const testResults = await testResult_dao.getTestResultsByRFID(rfid);
      res.status(200).json(testResults);
    } catch (err) {
      res.status(404).end();
    }
  });
  
  routertestResult.get("/skuitems/:rfid/testResults/:id", async (req, res) => {
    try {
      const rfid = req.params.rfid;
      const id = req.params.id;
      const testResults = await testResult_dao.getTestResultsById(rfid, id);
      res.status(200).json(testResults);
    } catch (err) {
      res.status(404).end();
    }
  });
  
  routertestResult.post("/skuitems/testResult", async (req, res) => {
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
  
    testResult_dao.postTestResult(testResult);
    return res.status(201).end();
  });
  
  routertestResult.put("/skuitems/:rfid/testResult/:id", async (req, res) => {
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
  
    testResult_dao.putTestResult(skuitem, rfid, id);
    return res.status(201).end();
  });
  
  routertestResult.delete("/skuitems/:rfid/testResult/:id", (req, res) => {
    try {
      const rfid = req.params.rfid;
      const id = req.params.id;
      testResult_dao.deleteTestResult(rfid, id);
      res.status(204).end();
    } catch (err) {
      res.status(503).end();
    }
  });




module.exports = routertestResult;
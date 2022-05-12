'use strict';
const express = require('express');
const routerSKU = express.Router();
const SKU_dao = require('./SKU_dao')
const { body, param, validationResult } = require('express-validator');

const SKU_dao = new SKU_dao(); //dao class






module.exports = routerSKU;
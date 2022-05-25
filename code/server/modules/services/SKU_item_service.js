'use strict';
const res = require('express/lib/response');
const SKU_itemDao= require('../dao/SKU_item_dao');
const SKU_item_dao= new SKU_itemDao();

class SKU_item_service{
  getSKUItems=async()=>{
    try{
      const sku_items= await SKU_item_dao.getSKUItems();
      return sku_items;
    }
    catch(err){
      return err;
    }
  }
  getSKUItemsID=async(id)=>{
    try{
      const sku_item=await SKU_item_dao.getSKUItemsID(id);
      if (sku_item.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      return sku_item;
    }
    catch(err){
      return err;
    }
  }
  getSKUItemsRFID=async(rfid)=>{
    try{
      const skuitems = await SKU_item_dao.getSKUItemsRFID(rfid);
      if (skuitems.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      return skuitems;

    }
    catch(err){
      return err;
    }
  }

  postSkuItem = async (skuitem)=>{
    try{
      const check1= await SKU_item_dao.checkSKU(skuitem.SKUId);
      if (check1.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      await SKU_item_dao.postSkuItem(skuitem);
      return new Promise( (resolve,reject)=> resolve(201));
    }
    catch(err){
      return err;
    }
  }
  putSkuItem=async(skuitem,rfid)=>{
    try{
      const check1= await SKU_item_dao.checkSKUItemsRFID(rfid);
      if (check1.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      await SKU_item_dao.putSkuItem(skuitem,rfid);
      return new Promise( (resolve,reject)=> resolve(200));
    }
    catch(err){
      return err;
    }
  }
  deleteSKUItem=async(rfid)=>{
    try{
    await SKU_item_dao.deleteSKUItem(rfid);
    return new Promise( (resolve,reject)=> resolve(204));
    }
    catch(err){
      return err;
    }
  }



}








module.exports = SKU_item_service;
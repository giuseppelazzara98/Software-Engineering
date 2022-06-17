'use strict';
const itemDao = require('../dao/item_dao');

const item_dao = new itemDao();
const SKU_DAO = require('../dao/SKU_dao');
const sku_dao = new SKU_DAO();

class item_service{
  getItems = async()=>{
    try{
      const items = await item_dao.getItems();
      return items;
    }
    catch(err){
      return err;
    }
  }
  getItemsById= async(id, supplierId)=>{
    try{
      const items = await item_dao.getItemsById(id,supplierId);
      if (items.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      return items;
    }
    catch(err){
      return err;
    }

  }
  postItem=async (item)=>{
    try{
      const check = await sku_dao.getSKUsID(item.SKUId);
      if (check===undefined){
        return new Promise( (resolve,reject)=> reject(404));
      }
    }
    catch(err){
      return err;

    }
    try{ 
      const check1 = await item_dao.checkSKUId(item.supplierId,item.SKUId);
    if (check1.length!==0){
      return new Promise( (resolve,reject)=> reject(422));
    }
    const check2 = await item_dao.checkId(item.supplierId,item.id);
    if (check2.length!==0){
      return new Promise( (resolve,reject)=> reject(422));
    }
    await item_dao.postItem(item);
    return new Promise( (resolve,reject)=> resolve(201));

    }
    catch(err){
      return err;
    }
  }
  putItem= async (item, id, supplierId)=>{
    try{
    const check = await item_dao.getItemsById2(id);
    if (check.length===0){
      return new Promise( (resolve,reject)=> reject(404));
    }
    await item_dao.putItem(item,id,supplierId);
    return new Promise( (resolve,reject)=> resolve(200));
    }
    catch(err){
      return err;
    }
  }
  deleteItem=async(id, supplierId)=>{
    try{
      await item_dao.deleteItem(id, supplierId);
      return new Promise( (resolve,reject)=> resolve(204));
    }
    catch(err){
      return err;
    }
  }



}


module.exports = item_service;
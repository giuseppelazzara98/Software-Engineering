'use strict';

const SKU_Dao = require('../dao/SKU_dao');
const sku_dao=new SKU_Dao();

class SKU_service{
  getSKUs=async()=>{
    try{
      const sku=await sku_dao.getSKUs();
      return sku;
    }
    catch(err){
      return err;
    }
  }

  getSKUsID=async(id)=>{
    try{
      const skus = await sku_dao.getSKUsID(id);
      if (skus.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      return skus;
        }
    catch(err){
      res.status(err).end();
    }

  }
  postSku=async(sku)=>{
    try{
      await sku_dao.postSku(sku);
      return new Promise( (resolve,reject)=> resolve(201));
    }
    catch(err){
      return err;
    }
  }
  putSku=async(sku,id)=>{
    try{

      const volume= sku.newVolume * sku.newAvailableQuantity;
      const weight= Number(sku.newWeight) * Number(sku.newAvailableQuantity);
      const info= await sku_dao.checkPosition(id);
      if ( (Number(info.maxWeight) - Number(info.occupiedWeight)) > weight && (Number(info.maxVolume) - Number(info.occupiedVolume)) > volume ){
        await sku_dao.updatePosition(weight,volume,info.positionID);
        await sku_dao.putSku(sku,id);
        return new Promise( (resolve,reject)=> resolve(200));
    }
    else {
      return new Promise( (resolve,reject)=> reject(422));
    }
    }
    catch(err){
      return err;
    }
  }

  putSkuPosition=async(id,position)=>{
    try{
      const check1= await sku_dao.checkPositionID(position);
      if (check1.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      const check2= await sku_dao.getSKUsID(id);
      if (check2.length===0){
        return new Promise( (resolve,reject)=> reject(404));
      }
      await sku_dao.putSkuPosition(id,position);
      return new Promise( (resolve,reject)=> resolve(200));
    }
    catch(err){
      return err;
    }
  }




  deleteSKU=async(id)=>{
    try{
      await sku_dao.deleteSKU(id);
      return new Promise( (resolve,reject)=> resolve(204));
    }
    catch(err){
      return err;
    }

  }
}


module.exports = SKU_service;
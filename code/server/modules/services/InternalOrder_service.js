'use strict';
const dayjs = require('dayjs');

function InternalOrder_service(dao) {
    this.dao = dao;

    this.getAllIO = () => {
        return dao.getAllIO();
    }

    this.getAllIOIssued = () => {
        return dao.getAllIOIssued();
    }

    this.getAllIOAccepted = () => {
        return dao.getAllIOAccepted();
    }

    this.getIO = (id) => {
        return dao.getIO(id);
    }

    this.addIO = (body) => {
        if(!body.issueDate){
            return Promise.reject(422);
        }
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:MM").toString(); //date is in ISO8601 format supported by SQLite 
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const customerID = body.customerId;
        return dao.insertIO(date, IDs, customerID);
    }

    this.updateStateIO = (id, body) => {
        const newState = body.newState;
        var IDs = "";
        if(body.products){
            
            const products = [...body.products];
            IDs = products.map(e => e.SkuID).toString();
        }
        
        return new Promise(async (resolve, reject) => {
            const io = await dao.IOexists(id);
            if( io === undefined){
                reject(404);
            } else {
                resolve(io);
            }
        }).then(
            () => {
                return dao.updateStateIO(id, newState, IDs);
            }
        ).catch((err) => Promise.reject(err));
    }

    this.deleteIO = (id) => {
        return dao.deleteIO(id);
    }
}

module.exports = InternalOrder_service;
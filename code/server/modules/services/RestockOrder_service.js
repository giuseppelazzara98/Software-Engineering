'use strict';
const dayjs = require('dayjs');

function RestockOrders_service(dao) {
    this.dao = dao;

    this.getAllRO = () => {
        return dao.getAllRO();
    }

    this.getAllROIssued = () => {
        return dao.getAllROIssued();
    }

    this.getRO = (id) => {
        return dao.getRO(id);
    }

    this.getROReturnedItems = (id) => {
        return new Promise(async (resolve, reject) => {
            const ro = await dao.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return dao.getROReturnedItems(id);
            }
        )
    }

    this.addRO = (body) => {
        if(!dayjs(body.issueDate,"YYYY/MM/DD HH:mm", true).isValid()){
            return Promise.reject(422);
        }
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:mm").toString();
        const supplierId = body.supplierId;
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => {
            const pair = p.SKUId + ":" + p.qty;
            IDs.push(pair)
        });
        // console.log(IDs);
        IDs = IDs.toString();

        return dao.insertRO(date, IDs, supplierId);
    }

    this.updateStateRO = (id, body) => {
        const newState = body.newState;
        return new Promise(async (resolve, reject) => {
            const ro = await dao.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return dao.updateStateRO(id, newState)
            }
        )
    }

    this.addSkuItems = (id, body) => {
        const skuItems = body.skuItems;
        var RFIDs = String();
        for (let SkuItem of skuItems) {
            RFIDs += SkuItem.rfid + ",";
        }
        RFIDs = RFIDs.slice(0, RFIDs.length - 1);

        return new Promise(async (resolve, reject) => {
            const ro = await dao.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else if(ro.state !== 'DELIVERED'){
                reject(422);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return dao.addSkuItems(id, RFIDs)
            }
        )
    }

    this.addTransportNote = (id, body) => {
        if(!body.transportNote.deliveryDate || !dayjs(body.transportNote.deliveryDate, "YYYY/MM/DD", true).isValid()){
            return Promise.reject(422);
        }
        const date = dayjs(body.transportNote.deliveryDate).format("YYYY-MM-DD").toString();

        return new Promise(async (resolve, reject) => {
            const ro = await dao.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else if(ro.state !== 'DELIVERY' || dayjs(date).isBefore(dayjs(ro.issueDate))){
                reject(422);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return dao.insertTransportNote(date);
            }
        ).then(
            (row) => {
                return dao.updateSKUNote(id, row.max);
            }
        )
    }

    this.deleteRO = (id) => {
        return dao.deleteRO(id);
    }

}

module.exports = RestockOrders_service;
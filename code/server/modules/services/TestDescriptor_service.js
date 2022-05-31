'use strict';

function TestDescriptor_service(dao) {
    this.dao = dao;

    this.getAllTD = () => {
        return dao.getAllTD();
    }

    this.getTD = (id) => {
        return dao.getTD(id).then((row) => {
            return new Promise((resolve, reject) => {
                if (row === undefined) {
                    reject(404);
                } else {
                    resolve(row);
                }

            })
        });
    }

    this.addTD = (body) => {
        const name = body.name;
        const procedure = body.procedureDescription;
        const idSKU = body.idSKU;

        return dao.getSKU(idSKU).then(  //check if the SKU exists in the database
            (row) => {
                if (row === undefined) {
                    return new Promise((resolve, reject) => reject(404));
                } else {
                    return dao.insertTD(name, procedure, idSKU);
                }
            }
        ).catch(
            (err) => {
                return new Promise((resolve, reject) => reject(err));
            }
        );
    }

    this.modifyTD = (id, body) => {
        const newName = body.newName;
        const newProcedure = body.newProcedureDescription;
        const newIdSKU = body.newIdSKU;


        if (newIdSKU == undefined) {
            return Promise.reject(422);
        } else {
            return dao.getTD(id).then(  //check if the test descriptor exists
                (td) => {
                    if (td === undefined) {
                        return new Promise((resolve, reject) => reject(404));
                    } else {
                        //the td exists
                        return dao.getSKU(newIdSKU); // check if the new SKUId exists
                    }

                }
            ).then(
                (row) => {
                    if (row === undefined) {
                        return new Promise((resolve, reject) => reject(404));
                    } else {
                        //the newSKUId exists
                        return dao.updateTD(id, newName, newProcedure, newIdSKU)
                    }

                }
            ).catch(
                (err) => {
                    return new Promise((resolve, reject) => reject(err));
                }
            );
        }

    }

    this.deleteTD = (id) => {
        return dao.deleteTD(id);
        // return dao.getTD(id).then(
        //     (row) => {
        //         if (row === undefined) {
        //             return new Promise((resolve, reject) => reject(404));
        //         } else {
        //             //update SKU table: delete test descriptor from the field
        //             return dao.getSKU(row.idSKU);
        //         }
        //     }
        // ).then(
        //     (row) => {
        //         if (row === undefined) {  //sku does not exist
        //             return new Promise((resolve, reject) => reject(422));
        //         } else {
        //             const IDs = row.testDescriptors.split(',').map(e => parseInt(e)).filter(e => e != id).toString();
        //             return dao.updateSKUTestDescriptors(row.id, IDs);
        //         }
        //     }
        // ).then(
        //     () => {
        //         return dao.deleteTD(id);
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

}

module.exports = TestDescriptor_service;
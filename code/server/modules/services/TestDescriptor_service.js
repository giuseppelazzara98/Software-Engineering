'use strict';

function TestDescriptor_service(dao) {
    this.dao = dao;

    this.getAllTD = () => {
        return dao.getAllTD();
        // return db.getAllTD().then(      //first get all the rows in the db
        //     (rows) => {
        //         return new Promise((resolve, reject) => {
        //             const list = rows.map(row => {      //mapping each row in a test descriptor
        //                 return {
        //                     id: row.id,
        //                     name: row.name,
        //                     procedureDescription: row.procedureDescription,
        //                     idSKU: row.idSKU
        //                 }
        //             });
        //             resolve(list);      //return the array of test descriptors
        //         })
        //     }
        // ).catch(
        //     (err) => new Promise((resolve, reject) => reject(500))
        // );
    }

    this.getTD = (id) => {
        //TODO: validation of id
        return dao.getTD(id);
        // return db.getTD(id).then(       //get the test descriptor
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if (row === undefined) {    //not found in the database
        //                 reject(404);
        //             } else {
        //                 resolve(
        //                     {
        //                         id: row.id,
        //                         name: row.name,
        //                         procedureDescription: row.procedureDescription,
        //                         idSKU: row.idSKU
        //                     }
        //                 );
        //             }
        //         });
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(500));
        //     }
        // );
    }

    this.addTD = (body) => {
        const name = body.name;
        const procedure = body.procedureDescription;
        const idSKU = body.idSKU;
        // TODO: validation on these fields

        return dao.getSKU(idSKU).then(  //check if the SKU exists in the database
            (row) => {
                if (row === undefined) {
                    return new Promise((resolve, reject) => reject(404));
                }
                return dao.insertTD(name, procedure, idSKU);
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
        // TODO: validation on these fields

        return dao.getTD(id).then(  //check if the test descriptor exists
            (td) => {
                if (td === undefined) {
                    return new Promise((resolve, reject) => reject(404));
                }
                //the td exists
                return dao.getSKU(newIdSKU); // check if the new SKUId exists
            }
        ).then(
            (row) => {
                if (row === undefined) {
                    return new Promise((resolve, reject) => reject(404));
                }
                //the newSKUId exists
                return dao.updateTD(id, newName, newProcedure, newIdSKU)
            }
        ).catch(
            (err) => {
                return new Promise((resolve, reject) => reject(err));
            }
        );
    }

    this.deleteTD = (id) => {
        //TODO: validation of id
        return dao.getTD(id).then(
            (row) => {
                if (row === undefined) {
                    return new Promise((resolve, reject) => reject(404));
                }
                //update SKU table: delete test descriptor from the field
                return dao.getSKU(row.idSKU);
            }
        ).then(
            (row) => {
                if(row === undefined){  //sku does not exist
                    return new Promise((resolve, reject) => reject(404));
                }
                const IDs = row.testDescriptors.split(',').map(e => parseInt(e)).filter(e => e != id).toString();
                return dao.updateSKUTestDescriptors(row.id, IDs);
            }
        ).then(
            () => {
                return dao.deleteTD(id);
            }
        ).catch(
            (err) => {
                return new Promise((resolve, reject) => reject(err));
            }
        );
    }

}

module.exports = TestDescriptor_service;
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('GET sku_items', function() {
    testBySkuID(1, 200);
    testBySkuID("aa", 422);
    testBySkuID(7, 404);
    testBySkuRFID("12345678901234567890123456789011",200);
    testBySkuRFID("1234567890123456789012345678901",422);
    testBySkuRFID("12345678901234567890123456789590",404);
})

function testBySkuID(id, HTTPresponse){
    it('get by id', async () => {
        var result = await agent.get('/api/skuitems/sku/' + id);
        result.should.have.status(HTTPresponse);
    })
}

function testBySkuRFID(rfid, HTTPresponse){
    it('get by rfid', async () => {
        var result = await agent.get('/api/skuitems/' + rfid);
        result.should.have.status(HTTPresponse);
        
    })
}





/*************************************************************************/
describe('POST and DELETE SKU Items', () => {
    
    testPOSTDescriptor(201,"12345678901234567890123456789018",1,"2021/11/29 12:30");
    testDELETEDescriptor("12345678901234567890123456789017", 204);
    testPOSTDescriptor(422, "12345678901234567890123456789017", 1,"patate" );
    testDELETEDescriptor("csfknvsns", 422);

    
})

function testPOSTDescriptor(HTTPresponse, rfid, SKUId, DateOfStock) {
    it('post', async () => {
        const td = {
            'RFID': rfid,
            'SKUId': SKUId,
            'DateOfStock': DateOfStock
        };
        const result = await agent.post('/api/skuitem')
            .set('content-type', 'application/json')
            .send(td);
        result.should.have.status(HTTPresponse);
    })
}

function testDELETEDescriptor(rfid, HTTPresponse){
    it('delete by id', async() => {
        const res = await agent.delete('/api/skuitems/' + rfid);
        res.should.have.status(HTTPresponse);
    })    
}

/*************************************************************************/
describe('PUT SKU ITEMS', () => {
    testPUTSKUItems(200, "12345678901234567890123456789011", '12345678901234567890123456789018', 1,"2021/12/29 12:30" );
    testPUTSKUItems(404, '12345678901234567890123456789018', "12345678901234567890123456789011",1, "2021-12-29 12:30");
    testPUTSKUItems(422, "vfhjbvdvd","fsdfkjsjn","vnjsk","fdfdsff");
    
    
})

function testPUTSKUItems(HTTPresponse, rfid, newRFID, newAvailable, newDateOfStock){
    it('modify td', async () => {
        var res = await agent.put('/api/skuitems/' + rfid)
            .set('content-type', 'application/json')
            .send({
                'newRFID': newRFID,
                'newAvailable': newAvailable,
                'newDateOfStock': newDateOfStock
            });
        res.should.have.status(HTTPresponse);

    })
}

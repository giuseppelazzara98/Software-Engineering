const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('Integration Internal Orders', function (){
    const products = [{ "SKUId": 1, "description": "a product", "price": 10.99, "qty": 3 },
    { "SKUId": 2, "description": "another product", "price": 11.99, "qty": 3 }];
    const items = [{ "SkuID": 1, "RFID": "12345678901234567890123456789016" },
                        { "SkuID": 2, "RFID": "12345678901234567890123456789038" },
                        { "SkuID": 3, "RFID": "12345678901234567890123456789038" }];
    testPOSTio(201, '2021/11/29 09:11', products, 1);
    testPUTio(200, 1, 'ACCEPTED', items);
    testPOSTio(201, "2021/11/30 19:11", products, 1);
    testPUTio(200, 2, 'COMPLETED', items);
    testPOSTio(201, "2022/02/11 12:02", products, 1);
    testPUTio(200, 3, 'ISSUED', items);

    testGETio(1, 200);
    testGETio("asd", 422);
    testGETio(9999, 404);
    testGETio('', 200);

    testDELETEio(1, 204);
    testDELETEio(2, 204);
    testDELETEio(3, 204);
    
})

function testGETio(id, HTTPresponse) {
    it('get IO by id', async () => {
        var result = await agent.get('/api/internalOrders/' + id);

        result.should.have.status(HTTPresponse);
        if (HTTPresponse === 200 && id) {
            result.should.to.be.json;
        }
    })
}

/*************************************************************************/


function testPOSTio(HTTPresponse, issueDate, products, customerId) {
    it('post IO', async () => {
        const io = {
            'issueDate': issueDate,
            'products': products,
            'customerId': customerId
        };
        const result = await agent.post('/api/internalOrders')
            .set('content-type', 'application/json')
            .send(io);
        result.should.have.status(HTTPresponse);
    })
}

function testDELETEio(id, HTTPresponse) {
    it('delete IO by id', async () => {
        const res = await agent.delete('/api/internalOrders/' + id);
        res.should.have.status(HTTPresponse);
    })
}

/*************************************************************************/


function testPUTio(HTTPresponse, id, newState, products) {
    it('modify IO', async () => {
        var res = await agent.put('/api/internalOrders/' + id)
            .set('content-type', 'application/json')
            .send({
                'newState': newState,
                'products': products
            });
        res.should.have.status(HTTPresponse);
        if (HTTPresponse === 200) {
            res = await agent.get('/api/internalOrders/' + id);
            expect(res.body).to.include({
                "id": id,
                "state": newState
            })
        }
    })
}
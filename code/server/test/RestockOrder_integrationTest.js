const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

describe('Integration Restock Orders', () => {
    products = [{ "SKUId": 1, "description": "a product", "price": 10.99, "qty": 3 },
    { "SKUId": 2, "description": "another product", "price": 11.99, "qty": 3 }]
    testPOSTro(201, '2010/12/12', products, 1);
    testGETro(1, 200);
    testDELETEro(1, 204);
    testPOSTro(422, 'a', products, 1);
    testPOSTro(422, '2010/12/12', '', 1);
    testPOSTro(422, '2010/12/12', [], 1);

})

/*************************************************************************/


function testGETro(id, HTTPresponse) {
    it('get by id', async () => {
        var result = await agent.get('/api/restockOrders/' + id);
        console.log(id);
        result.should.have.status(HTTPresponse);
        if (HTTPresponse === 200 && id) {
            result.should.to.be.json;
        }
    })
}
/*************************************************************************/


function testPOSTro(HTTPresponse, issueDate, products, supplierId) {
    it('post', async () => {
        const ro = {
            'issueDate': issueDate,
            'products': products,
            'supplierId': supplierId
        };
        const result = await agent.post('/api/restockOrder')
            .set('content-type', 'application/json')
            .send(ro);
        result.should.have.status(HTTPresponse);
    })
}

function testDELETEro(id, HTTPresponse) {
    it('delete by id', async () => {
        const res = await agent.delete('/api/restockOrder/' + id);
        res.should.have.status(HTTPresponse);
    })
}

/*************************************************************************/

function testPUTroState(HTTPresponse, id, newState) {
    it('modify ro state', async () => {
        var res = await agent.put('/api/restockOrder/' + id)
            .set('content-type', 'application/json')
            .send({
                'newState': newState
            });
        res.should.have.status(HTTPresponse);
        if (HTTPresponse === 200) {
            res = await agent.get('/api/restockOrders/' + id);
            expect(res.body).to.include({
                "state": newState
            })
        }
    })
}

function testPUTroskuItems(HTTPresponse, id, skuItems) {
    it('modify ro skuItems', async () => {
        var res = await agent.put('/api/restockOrder/' + id + '/skuItems')
            .set('content-type', 'application/json')
            .send({
                'skuItems': skuItems
            });
        res.should.have.status(HTTPresponse);

    })
}

function testPUTroTransport(HTTPresponse, id, date) {
    it('modify ro transportNote', async () => {
        var res = await agent.put('/api/restockOrder/' + id + '/transportNote')
            .set('content-type', 'application/json')
            .send({
                'transportNote': { 'deliveryDate': date }
            });
        res.should.have.status(HTTPresponse);

    })
}
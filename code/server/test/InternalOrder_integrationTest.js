const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('GET Internal Order', function () {
    it('get all', async () => {
        const result = await agent.get('/api/internalOrders');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 1
            },
            {
                "id": 2,
                "issueDate": "2021/11/30 19:11",
                "state": "COMPLETED",
                "products": [
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "RFID": "12345678901234567890123456789011"
                    }
                ],
                "customerID": 1
            },
            {
                "id": 3,
                "issueDate": "2022/02/11 12:02",
                "state": "ISSUED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 3
            },
            {
                "id": 4,
                "issueDate": "2021/10/01 13:10",
                "state": "REFUSED",
                "products": [
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 2
            },
            {
                "id": 5,
                "issueDate": "2021/03/14 15:03",
                "state": "CANCELED",
                "products": [
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "customerID": 1
            }
        ])
    })

    it('get all issued', async () => {
        const result = await agent.get('/api/internalOrdersIssued');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 3,
                "issueDate": "2022/02/11 12:02",
                "state": "ISSUED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 3
            }
        ])
    })

    it('get all accepted', async () => {
        const result = await agent.get('/api/internalOrdersAccepted');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 1
            }
        ])
    })

    testGETio(1, 200);
    testGETio("asd", 422);
    testGETio(9999, 404);
    testGETio('', 200);

})

function testGETio(id, HTTPresponse) {
    it('get by id', async () => {
        var result = await agent.get('/api/internalOrders/' + id);

        result.should.have.status(HTTPresponse);
        if (HTTPresponse === 200 && id) {
            result.should.to.be.json;
            expect(result.body).to.deep.equal({
                "id": result.body.id,
                "issueDate": result.body.issueDate,
                "state": result.body.state,
                "products": result.body.products,
                "customerID": result.body.customerID
            });
        }
    })
}

/*************************************************************************/
describe('POST and DELETE Internal Orders', () => {
    products = [{ "SKUId": 1, "description": "a product", "price": 10.99, "qty": 3 },
    { "SKUId": 2, "description": "another product", "price": 11.99, "qty": 3 }]
    testPOSTio(201, '2010/12/12', products, 1);
    testDELETEio(6, 204);
    testPOSTio(422, 'a', products, 1);
    testPOSTio(422, '2010/12/12', '', 1);
    testPOSTio(422, '2010/12/12', [], 1);

})

function testPOSTio(HTTPresponse, issueDate, products, customerId) {
    it('post', async () => {
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
    it('delete by id', async () => {
        const res = await agent.delete('/api/internalOrders/' + id);
        res.should.have.status(HTTPresponse);
    })
}

/*************************************************************************/

describe('PUT internal Order', () => {
    const products = [{ "SkuID": 1, "RFID": "12345678901234567890123456789016" },
                        { "SkuID": 2, "RFID": "12345678901234567890123456789038" },
                        { "SkuID": 3, "RFID": "12345678901234567890123456789038" }];
    testPUTio(200, 1, 'ISSUED', products);
    testPUTio(200, 1, 'COMPLETED', products);
    testPUTio(404, 9999, 'REFUSED', []);
    testPUTio(422, 1, 'REFUSEDA', []);
    testPUTio(422, 'aaa', 'REFUSED', []);
    testPUTio(200, 1, 'COMPLETED', products);
    testPUTio(200, 1, 'ACCEPTED', products);

})

function testPUTio(HTTPresponse, id, newState, products) {
    it('modify io', async () => {
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
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('GET Restock Order', function () {
    it('get all restock orders', async () => {
        const result = await agent.get('/api/restockOrders');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 1,
                "issueDate": "2021/11/11 09:11",
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
                "supplierId": 1,
                "skuItems": []
            },
            {
                "id": 2,
                "issueDate": "2022/01/22 09:01",
                "state": "DELIVERY",
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
                    }
                ],
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2022/01/11"
                },
                "skuItems": []
            },
            {
                "id": 3,
                "issueDate": "2021/11/11 11:11",
                "state": "DELIVERED",
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
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "supplierId": 3,
                "transportNote": {
                    "transportDate": "2021/12/21"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    }
                ]
            },
            {
                "id": 4,
                "issueDate": "2021/10/21 21:10",
                "state": "TESTED",
                "products": [
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
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2021/10/31"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    }
                ]
            },
            {
                "id": 5,
                "issueDate": "2021/04/06 19:04",
                "state": "COMPLETED",
                "products": [
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
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    }
                ],
                "supplierId": 1,
                "transportNote": {
                    "transportDate": "2021/09/11"
                },
                "skuItems": [
                    {
                        "SKUId": 3,
                        "RFID": "12345678901234567890123456789016"
                    },
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789017"
                    }
                ]
            },
            {
                "id": 6,
                "issueDate": "2020/04/22 12:04",
                "state": "COMPLETEDRETURN",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "supplierId": 1,
                "transportNote": {
                    "transportDate": "2021/11/01"
                },
                "skuItems": [
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789012"
                    }
                ]
            }
        ])
    })

    it('get issued restock orders', async () => {
        const result = await agent.get('/api/restockOrdersIssued');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 1,
                "issueDate": "2021/11/11 09:11",
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
                "supplierId": 1,
                "skuItems": []
            }
        ])
    })

    testGETro(1, 200);
    testGETro('asd', 422);
    testGETro(9999, 404);
    testGETro('', 200);
})

function testGETro(id, HTTPresponse) {
    it('get by id', async () => {
        var result = await agent.get('/api/restockOrders/' + id);
        // console.log(id);
        result.should.have.status(HTTPresponse);
        if (HTTPresponse === 200 && id) {
            result.should.to.be.json;
        }
    })
}
/*************************************************************************/

describe('POST and DELETE Restock Orders', () => {
    products = [{ "SKUId": 1, "description": "a product", "price": 10.99, "qty": 3 },
    { "SKUId": 2, "description": "another product", "price": 11.99, "qty": 3 }]
    testPOSTro(201, '2010/12/12', products, 1);
    testDELETEro(7, 204);
    testPOSTro(422, 'a', products, 1);
    testPOSTro(422, '2010/12/12', '', 1);
    testPOSTro(422, '2010/12/12', [], 1);

})

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

describe('PUT internal Order', () => {
    const products = [{ "SkuID": 1, "rfid": "12345678901234567890123456789013" },
    { "SkuID": 2, "rfid": "12345678901234567890123456789011" },
    { "SkuID": 3, "rfid": "12345678901234567890123456789012" },
    { "SkuID": 4, "rfid": "12345678901234567890123456789014" }];

    const products2 = [{ "SkuID": 1, "rfid": "12345678901234567890123456789013" },
    { "SkuID": 2, "rfid": "12345678901234567890123456789011" }];

    const skuIDs = '12345678901234567890123456789013,12345678901234567890123456789011,12345678901234567890123456789012,12345678901234567890123456789014';
    const skuIDs2 = '12345678901234567890123456789013,12345678901234567890123456789011';
    testPUTroState(200, 1, 'DELIVERY');
    testPUTroTransport(422, 1, '2020/11/10')
    testPUTroState(404, 9999, 'DELIVERED');
    testPUTroState(422, 1, '');
    testPUTroState(422, 'aaa', 'DELIVERED');
    testPUTroskuItems(422, 1, products2);
    testPUTroState(200, 1, 'DELIVERED');
    

    testPUTroskuItems(200, 1, products2);
    testPUTroState(200, 1, 'DELIVERED');
    testPUTroskuItems(200, 1, products);
    testPUTroState(200, 1, 'ISSUED');

})

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
                'transportNote': {'deliveryDate': date}
            });
        res.should.have.status(HTTPresponse);

    })
}
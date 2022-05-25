const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('GET items ', function() {
    it('get all', async () => {
        const result = await agent.get('/api/items');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 12,
                "description": "new description",
                "price": 15.5,
                "supplierId": 2
            },
            {
                "id": 13,
                "description": "a new item",
                "price": 10.99,
                "supplierId": 3
            },
            {
                "id": 14,
                "description": "a new item",
                "price": 10.99,
                "supplierId": 5
            }
        ]
            )
    });

  
    testGETitems("aa", 422);
    testGETitems("", 200);
    testGETitems(1, 404);
})

function testGETitems(id, HTTPresponse){
    it('get by id', async () => {
        var result = await agent.get('/api/items/' + id);
        result.should.have.status(HTTPresponse);
        if(HTTPresponse === 200 && id){
            result.should.to.be.json;
            expect(result.body).to.deep.equal({
                "id": result.body.id,
                "description": result.body.description,
                "price": result.body.price,
                "SKUid": result.body.SKUId,
                "supplierId":result.body.supplierId
            });
        }
    })
}

/*************************************************************************/
describe('POST and DELETE items', () => {
    
    testPOSTItems(201, 15, 'description', 10.99,3,4);
    testDELETEItems(15, 204);
    testPOSTItems(422, 16, 'description',12,4,5);
    testDELETEItems(5, 404);
    
    
})

function testPOSTItems(HTTPresponse, id, description, price,SKUId,supplierId) {
    it('post', async () => {
        const td = {
            'id': id,
            'description': description,
            'price': price,
            'SKUId': SKUId,
            'supplierId':supplierId
        };
        const result = await agent.post('/api/item')
            .set('content-type', 'application/json')
            .send(td);
        result.should.have.status(HTTPresponse);
    })
}

function testDELETEItems(id, HTTPresponse){
    it('delete by id', async() => {
        const res = await agent.delete('/api/items/' + id);
        res.should.have.status(HTTPresponse);
    })    
}

/*************************************************************************/
describe('PUT Test Descriptor', () => {
    testPUTitem(200, 12,"new description",15.50);
    testPUTitem(404,2,"prova",12.00);
    
    
})

function testPUTitem(HTTPresponse, id, newDescription, newPrice){
    it('modify td', async () => {
        var res = await agent.put('/api/item/' + id)
            .set('content-type', 'application/json')
            .send({
                'newDescription': newDescription,
                'newPrice': newPrice
            });
        res.should.have.status(HTTPresponse);

    })
}

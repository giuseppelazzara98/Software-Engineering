const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('GET test Descriptor', function() {
    it('get all', async () => {
        const result = await agent.get('/api/testDescriptors');
        result.should.have.status(200);
        result.should.to.be.json;
        expect(result.body).to.deep.equal([
            {
                "id": 1,
                "name": "test descriptor 1",
                "procedureDescription": "this test is described by",
                "idSKU": 1
            },
            {
                "id": 2,
                "name": "test descriptor 2",
                "procedureDescription": "this test is described by",
                "idSKU": 2
            },
            {
                "id": 3,
                "name": "test descriptor 3",
                "procedureDescription": "this test is described by",
                "idSKU": 3
            },
            {
                "id": 4,
                "name": "test descriptor 4",
                "procedureDescription": "this test is described by",
                "idSKU": 4
            }
        ])
    });

    testGETdescriptor(1, 200);
    testGETdescriptor("aa", 422);
    testGETdescriptor("", 200);
    testGETdescriptor("1", 200);
})

function testGETdescriptor(id, HTTPresponse){
    it('get by id', async () => {
        var result = await agent.get('/api/testDescriptors/' + id);

        result.should.have.status(HTTPresponse);
        if(HTTPresponse === 200 && id){
            result.should.to.be.json;
            expect(result.body).to.deep.equal({
                "id": result.body.id,
                "name": result.body.name,
                "procedureDescription": result.body.procedureDescription,
                "idSKU": result.body.idSKU
            });
        }
    })
}

/*************************************************************************/
describe('POST and DELETE Test Descriptor', () => {
    
    testPOSTDescriptor(201, 'test', 'proc', 1);
    testDELETEDescriptor(5, 204);
    testPOSTDescriptor(422, 1, 'proc', 1);
    testDELETEDescriptor(5, 404);
    testPOSTDescriptor(201, 'a', 'a', 1);
    testDELETEDescriptor(5, 204);
    
})

function testPOSTDescriptor(HTTPresponse, name, procedure, idSKU) {
    it('post', async () => {
        const td = {
            'name': name,
            'procedureDescription': procedure,
            'idSKU': idSKU
        };
        const result = await agent.post('/api/testDescriptor')
            .set('content-type', 'application/json')
            .send(td);
        result.should.have.status(HTTPresponse);
    })
}

function testDELETEDescriptor(id, HTTPresponse){
    it('delete by id', async() => {
        const res = await agent.delete('/api/testDescriptor/' + id);
        res.should.have.status(HTTPresponse);
    })    
}

/*************************************************************************/
describe('PUT Test Descriptor', () => {
    testPUTDescriptor(200, 1, 'test 1', 'new proc', 2);
    testPUTDescriptor(404, 1, 'test 1', 'new proc', 200);
    testPUTDescriptor(422, 1, 'test 1', 'new proc', 'a');
    testPUTDescriptor(422, 1, '', 'new proc', 2);
    testPUTDescriptor(422, 1, 'tee', '', 2);
    testPUTDescriptor(200, 1, 'test descriptor 1', 'this test is described by', 1);
    
})

function testPUTDescriptor(HTTPresponse, id, newName, newProcedure, newIdSKU){
    it('modify td', async () => {
        var res = await agent.put('/api/testDescriptor/' + id)
            .set('content-type', 'application/json')
            .send({
                'newName': newName,
                'newProcedureDescription': newProcedure,
                'newIdSKU': newIdSKU
            });
        res.should.have.status(HTTPresponse);
        if(HTTPresponse === 200){
            res = await agent.get('/api/testDescriptors/' + id);
            expect(res.body).to.deep.equal({
                "id": id,
                "name": newName,
                "procedureDescription": newProcedure,
                "idSKU": newIdSKU
            })
        }
    })
}

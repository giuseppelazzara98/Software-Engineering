const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

describe('Integration Test Descriptor', () => {
    
    testPOSTDescriptor(404, 'test', 'proc', 1);
    testGETdescriptor(1, 404)
    testDELETEDescriptor(1, 422);

    testPOSTDescriptor(422, 1, 'proc', 1);
    testDELETEDescriptor(5, 422);

    testPOSTDescriptor(404, 'a', 'a', 1);
    testGETdescriptor(1, 404)
    testDELETEDescriptor(1, 422);
    
})

/*************************************************************************/

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

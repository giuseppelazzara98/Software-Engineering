const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http');
const res = require('express/lib/response');

chai.use(chaiHttp);
chai.should();

const app = require('../server')
var agent = chai.request.agent(app);

/*************************************************************************/
describe('GET Test Result ', function () {
    testresultRFID("12345678901234567890123456789012", 200);
    testresultRFID_ID("12345678901234567890123456789012",1, 200);
    testresultRFID_ID("12345678901234567890123456789012","fhvd", 422);
    testresultRFID("dvsdvsv", 422);
    testresultRFID("12345678901234567890123456789471", 404);
})

function testresultRFID(rfid, HTTPresponse) {
    it('get by rfid', async () => {
        var result = await agent.get('/api/skuitems/'+rfid+'/testResults');
        result.should.have.status(HTTPresponse);
        if (HTTPresponse === 200 && rfid) {
            result.should.to.be.json;
            expect(result.body).to.deep.equal({
                "id": result.body.id,
                "idTestDescriptor": result.body.idTestDescriptor,
                "Date": result.body.Date,
                "Result": result.body.Result
            });
        }
    })
}

function testresultRFID_ID(rfid,id, HTTPresponse) {
    it('get by rfid and id', async () => {
        var result = await agent.get('/api/skuitems/'+rfid+'/testResults'+id);
        result.should.have.status(HTTPresponse);
        if (HTTPresponse === 200 && rfid && id) {
            result.should.to.be.json;
            expect(result.body).to.deep.equal({
                "id": result.body.id,
                "idTestDescriptor": result.body.idTestDescriptor,
                "Date": result.body.Date,
                "Result": result.body.Result
            });
        }
    })
}

/*************************************************************************/
describe('POST and DELETE testResult', () => {

    testPOSTtestResult(201, "12345678901234567890123456789019", 2,"2021/11/20", true);
    testDELETEio("12345678901234567890123456789019",2,201);
    testPOSTtestResult(422, "djnksv",2,"sdvd",false);
    

})

function testPOSTtestResult(HTTPresponse, rfid, idTestDescriptor, Date,Result) {
    it('post', async () => {
        const testResult = {
            'rfid': rfid,
            'idTestDescriptor': idTestDescriptor,
            'Date': Date,
            'Result': Result
        };
        const result = await agent.post('/api/internalOrders')
            .set('content-type', 'application/json')
            .send(testResult);
        result.should.have.status(HTTPresponse);
    })
}

function testDELETEio(rfid,id, HTTPresponse) {
    it('delete by id and rfid', async () => {
        const res = await agent.delete('/api/skuitems/'+rfid+'/testResult/' + id);
        res.should.have.status(HTTPresponse);
    })
}

/*************************************************************************/

describe('PUT internal Order', () => {

    testPUTio(200,"12345678901234567890123456789016",2,12,"2021/11/28",true);
    testPUTio(404,"12345678901234567890123456789016",2,90,"2021/11/28",true);
    testPUTio(422,"1234567890123456123456789016",2,12,"2021/11/28",true);
})

function testPUTio(HTTPresponse, rfid,id, newIdTestDescriptor, newDate,newResult) {
    it('modify io', async () => {
        var res = await agent.put('/api/skuitems/'+rfid+'/testResult/'+id)
            .set('content-type', 'application/json')
            .send({
                'newIdTestDescriptor': newIdTestDescriptor,
                'newDate': newDate,
                'newResult':newResult
            });
        res.should.have.status(HTTPresponse);
    })
}
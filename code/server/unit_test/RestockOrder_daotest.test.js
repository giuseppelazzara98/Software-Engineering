const RO_dao = require('../modules/dao/RestockOrders_dao');
const dao = new RO_dao();

describe('test io dao', () => {

    test('get all ro', async () => {
        var res = await dao.getAllRO();
        expect(res.length).toBe(6);

        res = await dao.getAllROIssued();
        expect(res.length).toBe(1);

    })
    testNewRO('2022-11-13 13:14', '2,3,4', 3);
    testDeleteTD(7);
})

function testNewRO(date, IDs, supplierID) {
    test('create new RO', async () => {
        await dao.insertRO(date, IDs, supplierID);
        var res = await dao.getAllRO();
        expect(res.length).toBe(7);

        res = await dao.ROexists(7);
        expect(res.id).toEqual(7);
        expect(res.issueDate).toEqual(date);
        expect(res.products).toEqual(IDs);
        expect(res.supplierID).toEqual(supplierID);
    })
}

function testDeleteTD(id) {
    test('delete TD', async () => {
        await dao.deleteRO(id)
        var res = await dao.getAllRO();
        expect(res.length).toBe(6);
    })
}
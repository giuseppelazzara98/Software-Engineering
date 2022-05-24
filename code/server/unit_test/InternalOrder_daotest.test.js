const IO_dao = require('../modules/dao/InternalOrders_dao');
const dao = new IO_dao();

describe('test io dao', () => {

    test('get all io', async () => {
        var res = await dao.getAllIO();
        expect(res.length).toBe(5);

        res = await dao.getAllIOIssued();
        expect(res.length).toBe(1);

        res = await dao.getAllIOAccepted();
        expect(res.length).toBe(1);
    })
    testNewIO('2022-11-13 13:14', '2,3,4', 3);
    testDeleteTD(6);
})

function testNewIO(date, IDs, customerID) {
    test('create new IO', async () => {
        await dao.insertIO(date, IDs, customerID);
        var res = await dao.getAllIO();
        expect(res.length).toBe(6);

        res = await dao.IOexists(6);
        expect(res.id).toEqual(6);
        expect(res.issueDate).toEqual(date);
        expect(res.products).toEqual(IDs);
        expect(res.customerID).toEqual(customerID);
    })
}

function testDeleteTD(id) {
    test('delete TD', async () => {
        await dao.deleteIO(id)
        var res = await dao.getAllIO();
        expect(res.length).toBe(5);
    })
}
const Td_dao = require('../modules/dao/TestDescriptor_dao');
const dao = new Td_dao();

describe('test dao', () => {

    test('get all test descriptor', async () => {
        const res = await dao.getAllTD();
        expect(res.length).toBe(4);
    })
    testNewTD('test 4', 'proc 5', 3);
    testDeleteTD(5);
})

function testNewTD(name, procedure, idSKU) {
    test('create new TD', async () => {
        await dao.insertTD(name, procedure, idSKU);
        var res = await dao.getAllTD();
        expect(res.length).toBe(5);

        res = await dao.getTD(5);
        expect(res.id).toEqual(5);
        expect(res.name).toEqual(name);
        expect(res.procedureDescription).toEqual(procedure);
        expect(res.idSKU).toEqual(idSKU);
    })
}

function testDeleteTD(id) {
    test('delete TD', async () => {
        await dao.deleteTD(id)
        var res = await dao.getAllTD();
        expect(res.length).toBe(4);
    })
}

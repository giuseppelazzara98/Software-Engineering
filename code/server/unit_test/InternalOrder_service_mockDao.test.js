const Io_service = require('../modules/services/InternalOrder_service');
const dao = require('../modules/dao/InternalOrder_mockdao');
const io_service = new Io_service(dao);

const product1 = {
    SKUId: 1,
    description: "a new sku",
    price: 10.99,
    qty: 10
}
const product2 = {
    SKUId: 2,
    description: "a new sku",
    price: 10.99,
    qty: 1
}
const product3 = {
    SKUId: 3,
    description: "a new sku",
    price: 14.99,
    qty: 11
}

const product1_COMPLETED = {
    SKUId: 1,
    description: "a new sku",
    price: 10.99,
    RFID: "12345678901234567890123456789011"
}
const product2_COMPLETED = {
    SKUId: 2,
    description: "a new sku",
    price: 10.99,
    RFID: "12345678901234567890123456789012"
}
const product3_COMPLETED = {
    SKUId: 3,
    description: "a new sku",
    price: 14.99,
    RFID: "12345678901234567890123456789013"
}

const io1 = {
    id: 1,
    issueDate: "2021/11/29 09:11",
    state: "ACCEPTED",
    products: [product1, product2, product3],
    customerID: 1
}

const io2 = {
    id: 2,
    issueDate: "2021/06/23 15:11",
    state: "COMPLETED",
    products: [product1_COMPLETED, product2_COMPLETED, product3_COMPLETED],
    customerID: 1
}

const io3 = {
    id: 3,
    issueDate: "2022/02/11 12:11",
    state: "ISSUED",
    products: [product1, product3],
    customerID: 3
}

const io4 = {
    id: 4,
    issueDate: "2022/10/11 13:21",
    state: "REFUSED",
    products: [product2, product3],
    customerID: 2
}

const io5 = {
    id: 5,
    issueDate: "2022/12/11 12:21",
    state: "CANCELED",
    products: [product1],
    customerID: 1
}

describe('get all internal orders', () => {
    beforeEach(() => {
        dao.getAllIO.mockReset();
        dao.getAllIO
            .mockResolvedValueOnce([io1, io2, io3, io4, io5])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([io1, io2, io3, io4, io5]);

        dao.getAllIOIssued.mockReset();
        dao.getAllIOIssued
            .mockResolvedValueOnce([io3])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([io3]);

        dao.getAllIOAccepted.mockReset();
        dao.getAllIOAccepted
            .mockResolvedValueOnce([io1])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([io1]);
    })

    test('get all internal orders', async () => {
        var res = await io_service.getAllIO();
        expect(res).toEqual([io1, io2, io3, io4, io5]);

        try {
            await io_service.getAllIO();
        } catch (e) {
            expect(e).toEqual(500);
        }
    })

    test('get issued internal orders', async () => {
        var res = await io_service.getAllIOIssued();
        expect(res).toEqual([io3]);

        try {
            await io_service.getAllIOIssued();
        } catch (e) {
            expect(e).toEqual(500);
        }
    })

    test('get accepted internal orders', async () => {
        var res = await io_service.getAllIOAccepted();
        expect(res).toEqual([io1]);

        try {
            await io_service.getAllIOAccepted();
        } catch (e) {
            expect(e).toEqual(500);
        }
    })

})

describe('get IO by ID', () => {
    beforeEach(() => {
        dao.getIO.mockReset();
        dao.getIO
            .mockResolvedValueOnce(io1)
            .mockRejectedValueOnce(404)
            .mockResolvedValueOnce(io2)
            .mockResolvedValue(io1)
    })

    test('getIO', async () => {
        let id = 1;
        var res = await io_service.getIO(id);
        expect(res).toEqual(io1)

        id = 9999;
        try {
            res = await io_service.getIO(id);
        } catch (e) {
            expect(e).toEqual(404);
        }

        id = 2;
        res = await io_service.getIO(id);
        expect(res).toEqual(io2)

        id = 1;
        try {
            res = await io_service.getIO(id);
            expect(res).toEqual(io1)
        } catch (e) {
            expect(e).toEqual(404);
        }
    })

})

describe('insert new IO', () => {
    beforeEach(() => {
        dao.insertIO.mockReset();
        dao.insertIO
            .mockResolvedValueOnce(201)
            .mockRejectedValueOnce(500)
            .mockResolvedValue(201)
    })
    test('insert IO', async () => {
        var body = {
            "issueDate": '2022/11/04 08:23',
            "products": [
                {
                    "SKUid": 1,
                    "qty": 1,
                },
                {
                    "SKUid": 4, "qty": 3
                }
            ],
            "customerId": 1
        }
        var res;

        try {
            res = await io_service.addIO(body);
            expect(res).toEqual(201);
        } catch (e) {
            expect(e).toEqual(500);
        }

        try {
            res = await io_service.addIO(body);
            expect(res).toEqual(201);
        } catch (e) {
            expect(e).toEqual(500);
        }

        try {
            res = await io_service.addIO(body);
            expect(res).toEqual(201);
        } catch (e) {
            expect(e).toEqual(500);
        }

        body = {
            "products": [{ "SKUid": 1, "qty": 1 }, { "SKUid": 4, "qty": 3 }],
            "customerId": 1
        }
        try {
            res = await io_service.addIO(body);
        } catch (e) {
            expect(e).toEqual(422);
        }
    })
})

describe('update IO', () => {
    beforeEach(() => {
        dao.IOexists.mockReset()
            .mockResolvedValueOnce({
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": "1-0:1,2-0:3,3-0:2",
                "customerId": 1
            })
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue({
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": "1-0:1,2-0:3,3-0:2",
                "customerId": 1
            })


        dao.updateStateIO.mockReset()
            .mockResolvedValue(200)
    })

    test('update', async () => {
        var body = {
            newState: "COMPLETED",
            products: [
                {
                    "SkuID": 1,
                    "RFID": "12345678901234567890123456789011",
                    "qty": 1
                },
                {
                    "SkuID": 2,
                    "RFID": "12345678901234567890123456789012",
                    "qty": 1
                }]
        }

        let id = 1;
        var res;

        try {
            res = await io_service.updateStateIO(id, body);
            expect(res).toEqual(200);
        } catch (e) {
            expect(e).toEqual(500);
        }

        try {
            res = await io_service.updateStateIO(id, body);
            expect(res).toEqual(200);
        } catch (e) {
            expect(e).toEqual(404);
        }


    })

})

describe('delete IO', () => {
    beforeEach(() => {
        dao.deleteIO.mockReset();
        dao.deleteIO.mockResolvedValueOnce(204)
            .mockResolvedValue(204)
            .mockRejectedValueOnce(500)
    })

    test("delete", async () => {
        let id = 1;
        var res;

        try {
            res = await io_service.deleteIO(id);
            expect(res).toEqual(204);
        } catch (e) {
            expect(e).toEqual(500);
        }

        id = 2;
        try {
            res = await io_service.deleteIO(id);
            expect(res).toEqual(204);
        } catch (e) {
            expect(e).toEqual(500);
        }

        try {
            res = await io_service.deleteIO(id);
            expect(res).toEqual(204);
        } catch (e) {
            expect(e).toEqual(500);
        }

    })
})
const Ro_service = require('../modules/services/RestockOrder_service');
const dao = require('../modules/dao/RestockOrder_mockdao');
const ro_service = new Ro_service(dao);

const product1 = {
    SKUId: 1,
    itemId: 10,
    description: "a new sku",
    price: 10.99,
    qty: 10
}
const skuItem1 = {
    SKUId: 1,
    itemId: 10,
    rfid: "12345678901234567890123456789011"
}
const skuItem2 = {
    SKUId: 1,
    itemId: 10,
    rfid: "12345678901234567890123456789012"
}


const product2 = {
    SKUId: 2,
    itemId: 11,
    description: "a new sku",
    price: 9.99,
    qty: 5
}
const skuItem3 = {
    SKUId: 2,
    itemId: 11,
    rfid: "12345678901234567890123456789021"
}

const skuItem4 = {
    SKUId: 2,
    itemId: 11,
    rfid: "12345678901234567890123456789022"
}


const product3 = {
    SKUId: 3,
    itemId: 31,
    description: "a new sku",
    price: 5.99,
    qty: 1
}
const skuItem5 = {
    SKUId: 3,
    itemId: 31,
    rfid: "12345678901234567890123456789031"
}
const skuItem6 = {
    SKUId: 3,
    itemId: 31,
    rfid: "12345678901234567890123456789032"
}

const ro1 = {
    id: 1,
    issueDate: "2021/11/11 09:11",
    state: "ISSUED",
    products: [product1, product2],
    supplierId: 1,
    // transportNote: { deliveryDate: "2021/12/29" },
    skuItems: []
};

const ro2 = {
    id: 2,
    issueDate: "2022/01/22 09:11",
    state: "DELIVERY",
    products: [product1, product2],
    supplierId: 1,
    transportNote: { deliveryDate: "2021/12/29" },
    skuItems: []
};

const ro3 = {
    id: 3,
    issueDate: "2021/11/11 11:11",
    state: "DELIVERED",
    products: [product2],
    supplierId: 1,
    transportNote: { deliveryDate: "2021/12/29" },
    skuItems: [skuItem3]
};

const ro4 = {
    id: 4,
    issueDate: "2021/10/21 11:10",
    state: "TESTED",
    products: [product1, product2],
    supplierId: 1,
    transportNote: { deliveryDate: "2021/10/29" },
    skuItems: [skuItem1, skuItem2, skuItem3]
};

const ro5 = {
    id: 5,
    issueDate: "2021/10/21 12:14",
    state: "COMPLETED",
    products: [product1, product3],
    supplierId: 1,
    transportNote: { deliveryDate: "2021/09/22" },
    skuItems: [skuItem1, skuItem2, skuItem5]
};

const ro6 = {
    id: 6,
    issueDate: "2021/10/21 15:12",
    state: "COMPLETEDRETURN",
    products: [product2, product3],
    supplierId: 1,
    transportNote: { deliveryDate: "2021/11/02" },
    skuItems: [skuItem3, skuItem4, skuItem6]
};



describe('Get all restock orders', () => {
    beforeEach(() => {
        dao.getAllRO.mockReset();
        dao.getAllRO
            .mockResolvedValueOnce([ro1, ro2, ro3, ro4, ro5, ro6])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([ro1, ro2, ro3, ro4, ro5, ro6])

        dao.getAllROIssued.mockReset();
        dao.getAllROIssued
            .mockResolvedValueOnce([ro1])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([ro1])
    })

    test('get all restock orders', async () => {
        var res = await ro_service.getAllRO();
        expect(res).toEqual([ro1, ro2, ro3, ro4, ro5, ro6])

        try {
            res = await ro_service.getAllRO();

        } catch (e) {
            expect(e).toEqual(500)
        }

        res = await ro_service.getAllRO();
        expect(res).toEqual([ro1, ro2, ro3, ro4, ro5, ro6])

    })

    test('get ro issued', async () => {
        var res = await ro_service.getAllROIssued();
        expect(res).toEqual([ro1])
        try {
            res = await ro_service.getAllROIssued();
        } catch (e) {
            expect(e).toEqual(500)
        }

        res = await ro_service.getAllROIssued();
        expect(res).toEqual([ro1])
    })

})

describe('get ro by ID', () => {
    beforeEach(() => {
        dao.getRO.mockReset();
        dao.getRO
            .mockResolvedValueOnce(ro3)
            .mockRejectedValueOnce(404)
            .mockResolvedValueOnce(ro2)
            .mockResolvedValue(ro3)
    })

    test('getRO', async () => {
        let id = 3;
        var res = await ro_service.getRO(id);
        expect(res).toEqual(ro3);

        id = 9999;
        try {
            res = await ro_service.getRO(id);
        } catch (e) {
            expect(e).toEqual(404);
        }

        id = 2;
        res = await ro_service.getRO(id);
        expect(res).toEqual(ro2)
    })
})

describe('get return items by roID', () => {
    beforeEach(() => {
        dao.ROexists.mockReset();
        dao.ROexists
            .mockResolvedValueOnce({ "id": 6 })
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue({ "id": 6 })

        dao.getROReturnedItems.mockReset();
        dao.getROReturnedItems
            .mockResolvedValueOnce([skuItem3, skuItem4, skuItem6])
            .mockRejectedValueOnce(422)
            .mockResolvedValue([skuItem3, skuItem4, skuItem6])
    })

    test('get RO items', async () => {
        let id = 6;
        var res = await ro_service.getROReturnedItems(id);
        expect(res).toEqual([skuItem3, skuItem4, skuItem6])

        id = 9999;
        try {
            res = await ro_service.getROReturnedItems(id);
        } catch (e) {
            expect(e).toEqual(404);
        }

        id = 6;
        try {
            res = await ro_service.getROReturnedItems();
            expect(res).toEqual([skuItem3, skuItem4, skuItem6])
        } catch (e) {
            expect(e).toEqual(422);
        }

        res = await ro_service.getROReturnedItems();
        expect(res).toEqual([skuItem3, skuItem4, skuItem6])
    })
})

describe('insert new RO', () => {
    beforeEach(() => {
        dao.insertRO.mockReset();
        dao.insertRO
            .mockResolvedValueOnce(201)
            .mockRejectedValueOnce(422)
            .mockRejectedValueOnce(500)
            .mockResolvedValue(201)
    })

    test('insert RO', async () => {
        const body = {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "itemId": 10, "description": "a product", "price": 10.99, "qty": 30 },
            { "SKUId": 180, "itemId": 18, "description": "another product", "price": 11.99, "qty": 20 }],
            "supplierId": 1
        }

        var res = await ro_service.addRO(body);
        expect(res).toEqual(201);

        const body2 = {
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 30 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 20 }],
            "supplierId": 1
        }
        try {
            res = await ro_service.addRO(body2);
        } catch (e) {
            expect(e).toEqual(422);
        }

        try {
            res = await ro_service.addRO(body);
        } catch (e) {
            expect(e).toEqual(500);
        }

        try {
            res = await ro_service.addRO(body2);
            expect(res).toEqual(201);
        } catch (e) {
            expect(e).toEqual(422);
        }
    })
})

describe('update RO', () => {
    beforeEach(() => {
        dao.ROexists.mockReset();
        dao.ROexists
            .mockResolvedValueOnce({ "id": 1, 'state': 'DELIVERED' })
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce({ "id": 1, 'state': 'ACCEPTED' })
            .mockResolvedValue({ "id": 1, 'state': 'DELIVERED' })

        dao.updateStateRO.mockReset();
        dao.updateStateRO
            .mockResolvedValueOnce(200)
            .mockRejectedValueOnce(503)
            .mockResolvedValueOnce(200)

        dao.addSkuItems.mockReset();
        dao.addSkuItems
            .mockResolvedValueOnce(200)
            .mockRejectedValueOnce(503)
            .mockResolvedValueOnce(200)
    })

    test('update RO state', async () => {
        let id = 1;
        const body = {
            newState: "DELIVERED"
        }
        var res = await ro_service.updateStateRO(id, body);
        expect(res).toEqual(200);

        id = 9999;
        try {
            res = await ro_service.updateStateRO(id, body);
        } catch (e) {
            expect(e).toEqual(404)
        }

        id = 1;
        try {
            res = await ro_service.updateStateRO(id, body);
        } catch (e) {
            expect(e).toEqual(503)
        }

        try {
            res = await ro_service.updateStateRO(id, body);
            expect(res).toEqual(200);
        } catch (e) {
            expect(e).toEqual(503)
        }

    })

    test('update RO skuItems', async () => {
        let id = 1;
        const body = {
            skuItems: [skuItem1, skuItem2]
        }

        var res = await ro_service.addSkuItems(id, body);
        expect(res).toEqual(200);

        id = 9999;
        try {
            res = await ro_service.addSkuItems(id, body);
        } catch (e) {
            expect(e).toEqual(404)
        }

        id = 1;
        try {
            res = await ro_service.addSkuItems(id, body);
        } catch (e) {
            expect(e).toEqual(422)
        }

        id = 1;
        try {
            res = await ro_service.addSkuItems(id, body);
        } catch (e) {
            expect(e).toEqual(503)
        }
    })

})

describe('note', () => {
    beforeEach(() => {
        dao.ROexists.mockReset();
        dao.ROexists
            .mockResolvedValueOnce({ "id": 1, 'state': 'DELIVERY', 'issueDate': '2022-03-02' })
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce({ "id": 1, 'state': 'COMPLETED', 'issueDate': '2022-03-02' })
            .mockResolvedValue({ "id": 1, 'state': 'DELIVERY', 'issueDate': '2022-03-02' })
        dao.insertTransportNote.mockReset();
        dao.insertTransportNote
            .mockResolvedValue({ max: 7 })


        dao.updateSKUNote.mockReset();
        dao.updateSKUNote
            .mockResolvedValueOnce(200)
    })

    test('update RO transportNote', async () => {
        let id = 1;
        const body = {
            'transportNote': { 'deliveryDate': '2023/09/09' }
        }
        const body2 = {
            transportNote: { deliveryDate: 'asd' }
        }

        var res = await ro_service.addTransportNote(id, body);
        expect(res).toEqual(200)

        try {
            res = await ro_service.addTransportNote(id, body);
            expect(res).toEqual(200)
        } catch (e) {
            expect(e).toEqual(404)
        }

        try {
            res = await ro_service.addTransportNote(id, body2);
            expect(res).toEqual(200)
        } catch (e) {
            expect(e).toEqual(422)
        }


        try {
            res = await ro_service.addTransportNote(id, body);
            expect(res).toEqual(200)
        } catch (e) {
            expect(e).toEqual(422)
        }



    })
})
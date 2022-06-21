const RO_dao = require("../modules/dao/RestockOrders_dao");
const SKUItem_dao = require("../modules/dao/SKU_item_dao");
const Item_dao = require("../modules/dao/item_dao");
const TestResult_dao = require("../modules/dao/testResult_dao");

const ro_dao = new RO_dao();
const skuItem_dao = new SKUItem_dao();
const item_dao = new Item_dao();
const tr_dao = new TestResult_dao();

const item1 = {
    id: 1,
    description: "a new item",
    price: 10.99,
    SKUId: 1,
    supplierId: 2
}
const item2 = {
    id: 2,
    description: "item",
    price: 11.99,
    SKUId: 2,
    supplierId: 2
}

const skuitem1 = {
    RFID: "12345678901234567890123456789010",
    SKUId: 1,
    DateOfStock: "2021/11/29 12:30"
}

const skuitem2 = {
    RFID: "12345678901234567890123456789020",
    SKUId: 2,
    DateOfStock: "2021/11/29 11:30"
}

const ro1_insert = {
    issueDate: "2021/11/11 09:11",
    products: "1-1:2,2-2:1",
    supplierId: "2"
}

const ro2_insert = {
    issueDate: "2022/01/22 09:11",
    products: "1-1:2",
    supplierId: "2"
}
const ro3_insert = {
    issueDate: "2022/01/22 09:11",
    products: "1-1:2,2-2:4",
    supplierId: "2"
}

const ro1 = {
    id: 1,
    issueDate: "2021/11/11 09:11",
    state: "ISSUED",
    products: [
        {
            SKUId: "1",
            itemId: "1",
            description: "a new item",
            price: 10.99,
            qty: "2"
        },
        {
            SKUId: "2",
            itemId: "2",
            description: "item",
            price: 11.99,
            qty: "1"
        }
    ],
    supplierId: 2,
    skuItems: []
}

const ro2 = {
    id: 2,
    issueDate: "2022/01/22 09:11",
    state: "DELIVERY",
    products: [
        {
            SKUId: "1",
            itemId: "1",
            description: "a new item",
            price: 10.99,
            qty: "2"
        }
    ],
    supplierId: 2,
    transportNote: {},
    skuItems: []
}

const ro3 = {
    id: 3,
    issueDate: "2022/01/22 09:11",
    state: "DELIVERED",
    products: [
        {
            SKUId: "1",
            itemId: "1",
            description: "a new item",
            price: 10.99,
            qty: "2"
        },
        {
            SKUId: "2",
            itemId: "2",
            description: "item",
            price: 11.99,
            qty: "4"
        }
    ],
    supplierId: 2,
    transportNote: {},
    skuItems: [
        {
            SKUId: "1",
            itemId: "1",
            RFID: "12345678901234567890123456789010"
        }
    ]
}

describe("Test get RO", () => {
    beforeAll(async () => {
        try {
            await item_dao.postItem(item1);
            await item_dao.postItem(item2);
            await skuItem_dao.postSkuItem(skuitem1);
            await skuItem_dao.postSkuItem(skuitem2);
            await ro_dao.insertRO(ro1_insert.issueDate, ro1_insert.products, ro1_insert.supplierId);
            await ro_dao.insertRO(ro2_insert.issueDate, ro2_insert.products, ro2_insert.supplierId);
            await ro_dao.insertRO(ro3_insert.issueDate, ro3_insert.products, ro3_insert.supplierId);
            await ro_dao.addSkuItems(3, "1-1:12345678901234567890123456789010");
            await ro_dao.updateStateRO(2, "DELIVERY")
            await ro_dao.updateStateRO(3, "DELIVERED");
        } catch (e) {
            console.error(e);
        }
    })
    afterAll(() => {
        item_dao.deleteAll();
        skuItem_dao.deleteAll();
        ro_dao.deleteAll();
    });

    test("get all ro", async () => {
        try {
            let res = await ro_dao.getAllRO();
            expect(res).toEqual([ro1, ro2, ro3]);
        } catch (e) {
            console.log(e)
            expect(e).toEqual(500)
        }

    })

    test("get issued ro", async () => {
        let res = await ro_dao.getAllROIssued();
        expect(res).toEqual([ro1]);
    })

    test("get ro by id", async () => {
        let res;
        res = await ro_dao.getRO(1);
        expect(res).toEqual({
            issueDate: "2021/11/11 09:11",
            state: "ISSUED",
            products: [
                {
                    SKUId: "1",
                    itemId: "1",
                    description: "a new item",
                    price: 10.99,
                    qty: "2"
                },
                {
                    SKUId: "2",
                    itemId: "2",
                    description: "item",
                    price: 11.99,
                    qty: "1"
                }],
            supplierId: 2,
            transportNote: {},
            skuItems: []
        });

        res = await ro_dao.getRO(2);
        expect(res).toEqual(
            {
                issueDate: "2022/01/22 09:11",
                state: "DELIVERY",
                products: [
                    {
                        SKUId: "1",
                        itemId: "1",
                        description: "a new item",
                        price: 10.99,
                        qty: "2"
                    }
                ],
                supplierId: 2,
                transportNote: {},
                skuItems: []
            }
        );
        try {
            res = await ro_dao.getRO(999);
        } catch (e) {
            expect(e).toEqual(404);
        }

    })
})

describe("Test post and delete ro", () => {
    beforeAll(async () => {
        try {
            await item_dao.postItem(item1);
            await item_dao.postItem(item2);
            await skuItem_dao.postSkuItem(skuitem1);
            await skuItem_dao.postSkuItem(skuitem2);
            // await ro_dao.insertRO(ro1_insert.issueDate, ro1_insert.products, ro1_insert.supplierId);
            // await ro_dao.insertRO(ro2_insert.issueDate, ro2_insert.products, ro2_insert.supplierId);
            // await ro_dao.updateStateRO(2, "DELIVERY")
        } catch (e) {
            console.error(e);
        }
    })
    afterAll(() => {
        item_dao.deleteAll();
        skuItem_dao.deleteAll();
        ro_dao.deleteAll();
    });

    test("post ro", async () => {
        let res;
        res = await ro_dao.insertRO(ro1_insert.issueDate, ro1_insert.products, ro1_insert.supplierId);
        expect(res).toEqual(201);
        res = await ro_dao.insertRO(ro2_insert.issueDate, ro2_insert.products, ro2_insert.supplierId);
        expect(res).toEqual(201);

        res = await ro_dao.insertRO(ro3_insert.issueDate, ro3_insert.products, ro3_insert.supplierId);
        expect(res).toEqual(201);
    })

    test("delete ro", async () => {
        let res = await ro_dao.deleteRO(3);
        expect(res).toEqual(204);

        res = await ro_dao.deleteRO(2);
        expect(res).toEqual(204);
    })
})
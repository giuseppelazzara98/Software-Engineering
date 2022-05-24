const Io_service = require('../modules/services/InternalOrder_service');
const dao = require('../modules/dao/InternalOrder_mockdao');
const io_service = new Io_service(dao);

describe('get all internal orders', () => {
    beforeEach(() => {
        dao.getAllIO.mockReset();
        dao.getAllIO
            .mockResolvedValueOnce([
                {
                    "id": 1,
                    "issueDate": "2021/11/29 09:11",
                    "state": "ACCEPTED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 1
                },
                {
                    "id": 2,
                    "issueDate": "2021/11/30 19:11",
                    "state": "COMPLETED",
                    "products": [
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "RFID": "12345678901234567890123456789014"
                        },
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "RFID": "12345678901234567890123456789011"
                        }
                    ],
                    "customerID": 1
                },
                {
                    "id": 3,
                    "issueDate": "2022/02/11 12:02",
                    "state": "ISSUED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 3
                },
                {
                    "id": 4,
                    "issueDate": "2021/10/01 13:10",
                    "state": "REFUSED",
                    "products": [
                        {
                            "SKUId": 4,
                            "description": "sku sku",
                            "price": 19.99,
                            "qty": 12
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 2
                },
                {
                    "id": 5,
                    "issueDate": "2021/03/14 15:03",
                    "state": "CANCELED",
                    "products": [
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        },
                        {
                            "SKUId": 4,
                            "description": "sku sku",
                            "price": 19.99,
                            "qty": 12
                        }
                    ],
                    "customerID": 1
                }
            ])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([
                {
                    "id": 1,
                    "issueDate": "2021/11/29 09:11",
                    "state": "ACCEPTED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 1
                },
                {
                    "id": 2,
                    "issueDate": "2021/11/30 19:11",
                    "state": "COMPLETED",
                    "products": [
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "RFID": "12345678901234567890123456789014"
                        },
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "RFID": "12345678901234567890123456789011"
                        }
                    ],
                    "customerID": 1
                },
                {
                    "id": 3,
                    "issueDate": "2022/02/11 12:02",
                    "state": "ISSUED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 3
                },
                {
                    "id": 4,
                    "issueDate": "2021/10/01 13:10",
                    "state": "REFUSED",
                    "products": [
                        {
                            "SKUId": 4,
                            "description": "sku sku",
                            "price": 19.99,
                            "qty": 12
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 2
                },
                {
                    "id": 5,
                    "issueDate": "2021/03/14 15:03",
                    "state": "CANCELED",
                    "products": [
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        },
                        {
                            "SKUId": 4,
                            "description": "sku sku",
                            "price": 19.99,
                            "qty": 12
                        }
                    ],
                    "customerID": 1
                }
            ]);

        dao.getAllIOIssued.mockReset();
        dao.getAllIOIssued
            .mockResolvedValueOnce([
                {
                    "id": 3,
                    "issueDate": "2022/02/11 12:02",
                    "state": "ISSUED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 3
                }
            ])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([
                {
                    "id": 3,
                    "issueDate": "2022/02/11 12:02",
                    "state": "ISSUED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 3
                }
            ]);

        dao.getAllIOAccepted.mockReset();
        dao.getAllIOAccepted
            .mockResolvedValueOnce([
                {
                    "id": 1,
                    "issueDate": "2021/11/29 09:11",
                    "state": "ACCEPTED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 1
                }
            ])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([
                {
                    "id": 1,
                    "issueDate": "2021/11/29 09:11",
                    "state": "ACCEPTED",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "customerID": 1
                }
            ]);
    })

    test('get all internal orders', async () => {
        var res = await io_service.getAllIO();
        expect(res).toEqual([
            {
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 1
            },
            {
                "id": 2,
                "issueDate": "2021/11/30 19:11",
                "state": "COMPLETED",
                "products": [
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "RFID": "12345678901234567890123456789011"
                    }
                ],
                "customerID": 1
            },
            {
                "id": 3,
                "issueDate": "2022/02/11 12:02",
                "state": "ISSUED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 3
            },
            {
                "id": 4,
                "issueDate": "2021/10/01 13:10",
                "state": "REFUSED",
                "products": [
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 2
            },
            {
                "id": 5,
                "issueDate": "2021/03/14 15:03",
                "state": "CANCELED",
                "products": [
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "customerID": 1
            }
        ]);

        try {
            await io_service.getAllIO();
        } catch (e) {
            expect(e).toEqual(500);
        }
    })

    test('get issued internal orders', async () => {
        var res = await io_service.getAllIOIssued();
        expect(res).toEqual([
            {
                "id": 3,
                "issueDate": "2022/02/11 12:02",
                "state": "ISSUED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 3
            }
        ]);

        try {
            await io_service.getAllIOIssued();
        } catch (e) {
            expect(e).toEqual(500);
        }
    })

    test('get accepted internal orders', async () => {
        var res = await io_service.getAllIOAccepted();
        expect(res).toEqual([
            {
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 1
            }
        ]);

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
            .mockResolvedValueOnce({
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 1
            })
            .mockRejectedValueOnce(404)
            .mockResolvedValueOnce({
                "id": 2,
                "issueDate": "2021/11/30 19:11",
                "state": "COMPLETED",
                "products": [
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "RFID": "12345678901234567890123456789011"
                    }
                ],
                "customerID": 1
            })
            .mockResolvedValue({
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "customerID": 1
            })
    })

    test('getIO', async () => {
        let id = 1;
        var res = await io_service.getIO(id);
        expect(res).toEqual({
            "id": 1,
            "issueDate": "2021/11/29 09:11",
            "state": "ACCEPTED",
            "products": [
                {
                    "SKUId": 1,
                    "description": "a new sku",
                    "price": 10.99,
                    "qty": 50
                },
                {
                    "SKUId": 2,
                    "description": "another sku",
                    "price": 10.99,
                    "qty": 55
                },
                {
                    "SKUId": 3,
                    "description": "sku",
                    "price": 10.99,
                    "qty": 45
                }
            ],
            "customerID": 1
        })

        id = 9999;
        try {
            res = await io_service.getIO(id);
        } catch (e) {
            expect(e).toEqual(404);
        }

        id = 2;
        res = await io_service.getIO(id);
        expect(res).toEqual({
            "id": 2,
            "issueDate": "2021/11/30 19:11",
            "state": "COMPLETED",
            "products": [
                {
                    "SKUId": 2,
                    "description": "another sku",
                    "price": 10.99,
                    "RFID": "12345678901234567890123456789014"
                },
                {
                    "SKUId": 1,
                    "description": "a new sku",
                    "price": 10.99,
                    "RFID": "12345678901234567890123456789011"
                }
            ],
            "customerID": 1
        })

        id = 9999;
        try {
            res = await io_service.getIO(id);
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
            .mockRejectedValue(500)
    })
    test('insert IO', async () => {
        var body = {
            "issueDate": '2022/11/04 08:23',
            "products": [{ "SKUid": 1 }, { "SKUid": 4 }],
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
            "products": [{ "SKUid": 1 }, { "SKUid": 4 }],
            "customerId": 1
        }
        try {
            res = await io_service.addIO(body);
            expect(res).toEqual(201);
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
                "products": "1,2,3",
                "customerId": 1
            })
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue({
                "id": 1,
                "issueDate": "2021/11/29 09:11",
                "state": "ACCEPTED",
                "products": "1,2,3",
                "customerId": 1
            })
            

        dao.updateStateIO.mockReset()
            .mockResolvedValue(200)
    })

    test('update', async () => {
        jest.setTimeout(10000);
        var body = {
            newState: "COMPLETED",
            products: [{"SkuID": 1, RFID: "11222"}, {"SkuID": 2, RFID: "11222"}]
        }

        let id = 1;
        var res;

        try{
            res = await io_service.updateStateIO(id, body);
            expect(res).toEqual(200);
        } catch (e){
            expect(e).toEqual(500);
        }

        try{
            res = await io_service.updateStateIO(id, body);
            expect(res).toEqual(200);
        } catch (e){
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
const Ro_service = require('../modules/services/RestockOrder_service');
const dao = require('../modules/dao/RestockOrder_mockdao');
const ro_service = new Ro_service(dao);

describe('Get all restock orders', () => {
    beforeEach(() => {
        dao.getAllRO.mockReset();
        dao.getAllRO
            .mockResolvedValueOnce([
                {
                    "id": 1,
                    "issueDate": "2021/11/11 09:11",
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
                    "supplierId": 1,
                    "skuItems": []
                },
                {
                    "id": 2,
                    "issueDate": "2022/01/22 09:01",
                    "state": "DELIVERY",
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
                        }
                    ],
                    "supplierId": 2,
                    "transportNote": {
                        "transportDate": "2022/01/11"
                    },
                    "skuItems": []
                },
                {
                    "id": 3,
                    "issueDate": "2021/11/11 11:11",
                    "state": "DELIVERED",
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
                        },
                        {
                            "SKUId": 4,
                            "description": "sku sku",
                            "price": 19.99,
                            "qty": 12
                        }
                    ],
                    "supplierId": 3,
                    "transportNote": {
                        "transportDate": "2021/12/21"
                    },
                    "skuItems": [
                        {
                            "SKUId": 2,
                            "RFID": "12345678901234567890123456789014"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789015"
                        }
                    ]
                },
                {
                    "id": 4,
                    "issueDate": "2021/10/21 21:10",
                    "state": "TESTED",
                    "products": [
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
                    "supplierId": 2,
                    "transportNote": {
                        "transportDate": "2021/10/31"
                    },
                    "skuItems": [
                        {
                            "SKUId": 2,
                            "RFID": "12345678901234567890123456789014"
                        }
                    ]
                },
                {
                    "id": 5,
                    "issueDate": "2021/04/06 19:04",
                    "state": "COMPLETED",
                    "products": [
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
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        }
                    ],
                    "supplierId": 1,
                    "transportNote": {
                        "transportDate": "2021/09/11"
                    },
                    "skuItems": [
                        {
                            "SKUId": 3,
                            "RFID": "12345678901234567890123456789016"
                        },
                        {
                            "SKUId": 2,
                            "RFID": "12345678901234567890123456789014"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789017"
                        }
                    ]
                },
                {
                    "id": 6,
                    "issueDate": "2020/04/22 12:04",
                    "state": "COMPLETEDRETURN",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "supplierId": 1,
                    "transportNote": {
                        "transportDate": "2021/11/01"
                    },
                    "skuItems": [
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789015"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789015"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789012"
                        }
                    ]
                }
            ])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([
                {
                    "id": 1,
                    "issueDate": "2021/11/11 09:11",
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
                    "supplierId": 1,
                    "skuItems": []
                },
                {
                    "id": 2,
                    "issueDate": "2022/01/22 09:01",
                    "state": "DELIVERY",
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
                        }
                    ],
                    "supplierId": 2,
                    "transportNote": {
                        "transportDate": "2022/01/11"
                    },
                    "skuItems": []
                },
                {
                    "id": 3,
                    "issueDate": "2021/11/11 11:11",
                    "state": "DELIVERED",
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
                        },
                        {
                            "SKUId": 4,
                            "description": "sku sku",
                            "price": 19.99,
                            "qty": 12
                        }
                    ],
                    "supplierId": 3,
                    "transportNote": {
                        "transportDate": "2021/12/21"
                    },
                    "skuItems": [
                        {
                            "SKUId": 2,
                            "RFID": "12345678901234567890123456789014"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789015"
                        }
                    ]
                },
                {
                    "id": 4,
                    "issueDate": "2021/10/21 21:10",
                    "state": "TESTED",
                    "products": [
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
                    "supplierId": 2,
                    "transportNote": {
                        "transportDate": "2021/10/31"
                    },
                    "skuItems": [
                        {
                            "SKUId": 2,
                            "RFID": "12345678901234567890123456789014"
                        }
                    ]
                },
                {
                    "id": 5,
                    "issueDate": "2021/04/06 19:04",
                    "state": "COMPLETED",
                    "products": [
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
                        },
                        {
                            "SKUId": 2,
                            "description": "another sku",
                            "price": 10.99,
                            "qty": 55
                        }
                    ],
                    "supplierId": 1,
                    "transportNote": {
                        "transportDate": "2021/09/11"
                    },
                    "skuItems": [
                        {
                            "SKUId": 3,
                            "RFID": "12345678901234567890123456789016"
                        },
                        {
                            "SKUId": 2,
                            "RFID": "12345678901234567890123456789014"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789017"
                        }
                    ]
                },
                {
                    "id": 6,
                    "issueDate": "2020/04/22 12:04",
                    "state": "COMPLETEDRETURN",
                    "products": [
                        {
                            "SKUId": 1,
                            "description": "a new sku",
                            "price": 10.99,
                            "qty": 50
                        },
                        {
                            "SKUId": 3,
                            "description": "sku",
                            "price": 10.99,
                            "qty": 45
                        }
                    ],
                    "supplierId": 1,
                    "transportNote": {
                        "transportDate": "2021/11/01"
                    },
                    "skuItems": [
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789015"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789015"
                        },
                        {
                            "SKUId": 1,
                            "RFID": "12345678901234567890123456789012"
                        }
                    ]
                }
            ])

        dao.getAllROIssued.mockReset();
        dao.getAllROIssued
            .mockResolvedValueOnce([
                {
                    "id": 1,
                    "issueDate": "2021/11/11 09:11",
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
                    "supplierId": 1,
                    "skuItems": []
                }
            ])
            .mockRejectedValueOnce(500)
            .mockResolvedValue([
                {
                    "id": 1,
                    "issueDate": "2021/11/11 09:11",
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
                    "supplierId": 1,
                    "skuItems": []
                }
            ])
    })

    test('get all restock orders', async () => {
        var res = await ro_service.getAllRO();
        expect(res).toEqual([
            {
                "id": 1,
                "issueDate": "2021/11/11 09:11",
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
                "supplierId": 1,
                "skuItems": []
            },
            {
                "id": 2,
                "issueDate": "2022/01/22 09:01",
                "state": "DELIVERY",
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
                    }
                ],
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2022/01/11"
                },
                "skuItems": []
            },
            {
                "id": 3,
                "issueDate": "2021/11/11 11:11",
                "state": "DELIVERED",
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
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "supplierId": 3,
                "transportNote": {
                    "transportDate": "2021/12/21"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    }
                ]
            },
            {
                "id": 4,
                "issueDate": "2021/10/21 21:10",
                "state": "TESTED",
                "products": [
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
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2021/10/31"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    }
                ]
            },
            {
                "id": 5,
                "issueDate": "2021/04/06 19:04",
                "state": "COMPLETED",
                "products": [
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
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    }
                ],
                "supplierId": 1,
                "transportNote": {
                    "transportDate": "2021/09/11"
                },
                "skuItems": [
                    {
                        "SKUId": 3,
                        "RFID": "12345678901234567890123456789016"
                    },
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789017"
                    }
                ]
            },
            {
                "id": 6,
                "issueDate": "2020/04/22 12:04",
                "state": "COMPLETEDRETURN",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "supplierId": 1,
                "transportNote": {
                    "transportDate": "2021/11/01"
                },
                "skuItems": [
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789012"
                    }
                ]
            }
        ])

        try {
            res = await ro_service.getAllRO();

        } catch (e) {
            expect(e).toEqual(500)
        }

        res = await ro_service.getAllRO();
        expect(res).toEqual([
            {
                "id": 1,
                "issueDate": "2021/11/11 09:11",
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
                "supplierId": 1,
                "skuItems": []
            },
            {
                "id": 2,
                "issueDate": "2022/01/22 09:01",
                "state": "DELIVERY",
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
                    }
                ],
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2022/01/11"
                },
                "skuItems": []
            },
            {
                "id": 3,
                "issueDate": "2021/11/11 11:11",
                "state": "DELIVERED",
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
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "supplierId": 3,
                "transportNote": {
                    "transportDate": "2021/12/21"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    }
                ]
            },
            {
                "id": 4,
                "issueDate": "2021/10/21 21:10",
                "state": "TESTED",
                "products": [
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
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2021/10/31"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    }
                ]
            },
            {
                "id": 5,
                "issueDate": "2021/04/06 19:04",
                "state": "COMPLETED",
                "products": [
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
                    },
                    {
                        "SKUId": 2,
                        "description": "another sku",
                        "price": 10.99,
                        "qty": 55
                    }
                ],
                "supplierId": 1,
                "transportNote": {
                    "transportDate": "2021/09/11"
                },
                "skuItems": [
                    {
                        "SKUId": 3,
                        "RFID": "12345678901234567890123456789016"
                    },
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789017"
                    }
                ]
            },
            {
                "id": 6,
                "issueDate": "2020/04/22 12:04",
                "state": "COMPLETEDRETURN",
                "products": [
                    {
                        "SKUId": 1,
                        "description": "a new sku",
                        "price": 10.99,
                        "qty": 50
                    },
                    {
                        "SKUId": 3,
                        "description": "sku",
                        "price": 10.99,
                        "qty": 45
                    }
                ],
                "supplierId": 1,
                "transportNote": {
                    "transportDate": "2021/11/01"
                },
                "skuItems": [
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789012"
                    }
                ]
            }
        ])

    })

    test('get ro issued', async () => {
        var res = await ro_service.getAllROIssued();
        expect(res).toEqual([
            {
                "id": 1,
                "issueDate": "2021/11/11 09:11",
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
                "supplierId": 1,
                "skuItems": []
            }
        ])
        try {
            res = await ro_service.getAllROIssued();
        } catch (e) {
            expect(e).toEqual(500)
        }

        res = await ro_service.getAllROIssued();
        expect(res).toEqual([
            {
                "id": 1,
                "issueDate": "2021/11/11 09:11",
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
                "supplierId": 1,
                "skuItems": []
            }
        ])
    })

})

describe('get ro by ID', () => {
    beforeEach(() => {
        dao.getRO.mockReset();
        dao.getRO
            .mockResolvedValueOnce({
                "issueDate": "2021/11/11 11:11",
                "state": "DELIVERED",
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
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "supplierId": 3,
                "transportNote": {
                    "transportDate": "2021/12/21"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    }
                ]
            })
            .mockRejectedValueOnce(404)
            .mockResolvedValueOnce({
                "issueDate": "2022/01/22 09:01",
                "state": "DELIVERY",
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
                    }
                ],
                "supplierId": 2,
                "transportNote": {
                    "transportDate": "2022/01/11"
                },
                "skuItems": [
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789017"
                    },
                    {
                        "SKUId": 3,
                        "RFID": "12345678901234567890123456789016"
                    },
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    }
                ]
            })
            .mockResolvedValue({
                "issueDate": "2021/11/11 11:11",
                "state": "DELIVERED",
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
                    },
                    {
                        "SKUId": 4,
                        "description": "sku sku",
                        "price": 19.99,
                        "qty": 12
                    }
                ],
                "supplierId": 3,
                "transportNote": {
                    "transportDate": "2021/12/21"
                },
                "skuItems": [
                    {
                        "SKUId": 2,
                        "RFID": "12345678901234567890123456789014"
                    },
                    {
                        "SKUId": 1,
                        "RFID": "12345678901234567890123456789015"
                    }
                ]
            })
    })

    test('getRO', async () => {
        let id = 3;
        var res = await ro_service.getRO(id);
        expect(res).toEqual({
            "issueDate": "2021/11/11 11:11",
            "state": "DELIVERED",
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
                },
                {
                    "SKUId": 4,
                    "description": "sku sku",
                    "price": 19.99,
                    "qty": 12
                }
            ],
            "supplierId": 3,
            "transportNote": {
                "transportDate": "2021/12/21"
            },
            "skuItems": [
                {
                    "SKUId": 2,
                    "RFID": "12345678901234567890123456789014"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                }
            ]
        });

        id = 9999;
        try {
            res = await ro_service.getRO(id);
        } catch (e) {
            expect(e).toEqual(404);
        }

        id = 2;
        res = await ro_service.getRO(id);
        expect(res).toEqual({
            "issueDate": "2022/01/22 09:01",
            "state": "DELIVERY",
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
                }
            ],
            "supplierId": 2,
            "transportNote": {
                "transportDate": "2022/01/11"
            },
            "skuItems": [
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789017"
                },
                {
                    "SKUId": 3,
                    "RFID": "12345678901234567890123456789016"
                },
                {
                    "SKUId": 2,
                    "RFID": "12345678901234567890123456789014"
                }
            ]
        })
    })
})

describe('get return items by roID', () => {
    beforeEach(() => {
        dao.ROexists.mockReset();
        dao.ROexists
            .mockResolvedValueOnce({ "id": 1 })
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue({ "id": 1 })

        dao.getROReturnedItems.mockReset();
        dao.getROReturnedItems
            .mockResolvedValueOnce([
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789012"
                }
            ])
            .mockRejectedValueOnce(422)
            .mockResolvedValue([
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789012"
                }
            ])
    })

    test('get RO items', async () => {
        let id = 6;
        var res = await ro_service.getROReturnedItems();
        expect(res).toEqual([
            {
                "SKUId": 1,
                "RFID": "12345678901234567890123456789015"
            },
            {
                "SKUId": 1,
                "RFID": "12345678901234567890123456789015"
            },
            {
                "SKUId": 1,
                "RFID": "12345678901234567890123456789012"
            }
        ])

        id = 9999;
        try {
            res = await ro_service.getROReturnedItems();
        } catch (e) {
            expect(e).toEqual(404);
        }

        id = 9999;
        try {
            res = await ro_service.getROReturnedItems();
        } catch (e) {
            expect(e).toEqual(422);
        }

        id = 6;
        try {
            res = await ro_service.getROReturnedItems();
            expect(res).toEqual([
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 1,
                    "RFID": "12345678901234567890123456789012"
                }
            ])
        } catch (e) {
            expect(e).toEqual(404);
        }

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
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 30 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 20 }],
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
            skuItems: [{ "SKUId": 12, "rfid": "12345678901234567890123456789016" },
            { "SKUId": 12, "rfid": "12345678901234567890123456789017" }]
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
            .mockResolvedValueOnce({ "id": 1, 'state': 'DELIVERY', 'issueDate': '2022-03-02'})
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
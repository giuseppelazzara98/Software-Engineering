const Td_service = require('../modules/services/TestDescriptor_service');
const dao = require('../modules/dao/TestDescriptor_mockdao');
const td_service = new Td_service(dao);

describe('get test descriptors', () => {
    beforeEach(() => {
        dao.getAllTD.mockReset();
        dao.getAllTD
        .mockResolvedValueOnce([
            {
                "id":1,
                "name":"test descriptor 1",
                "procedureDescription": "This test is described by...",
                "idSKU" :1
    
            },
            {
                "id":2,
                "name":"test descriptor 2",
                "procedureDescription": "This test is described by...",
                "idSKU" :2
            }
        ])
        .mockRejectedValueOnce(500)
        .mockResolvedValue([
            {
                "id":1,
                "name":"test descriptor 1",
                "procedureDescription": "This test is described by...",
                "idSKU" :1
    
            },
            {
                "id":2,
                "name":"test descriptor 2",
                "procedureDescription": "This test is described by...",
                "idSKU" :2
            }
        ]);
    })

    test('get all test descriptors', async () => {
        var result = await td_service.getAllTD();
        expect(result).toEqual([
            {
                "id":1,
                "name":"test descriptor 1",
                "procedureDescription": "This test is described by...",
                "idSKU" :1
    
            },
            {
                "id":2,
                "name":"test descriptor 2",
                "procedureDescription": "This test is described by...",
                "idSKU" :2
            }
        ]);

        try {
            await td_service.getAllTD();
        } catch (e) {
            expect(e).toBe(500);
        }

    })
})

describe('get test descriptor', () => {
    beforeEach(() => {
        dao.getTD.mockReset();
        dao.getTD
            .mockResolvedValueOnce({
                id: 1,
                name: 'test 1',
                procedureDescription: 'test desc 1',
                idSKU: 1
            })
            .mockResolvedValueOnce({
                id: 2,
                name: 'test 2',
                procedureDescription: 'test desc 2',
                idSKU: 1
            })
            .mockResolvedValueOnce(undefined)
            .mockRejectedValueOnce(500)
            .mockResolvedValue({
                id: 2,
                name: 'test 2',
                procedureDescription: 'test desc 2',
                idSKU: 1
            })


    })

    test('get test descriptor', async () => {
        var id = 1;
        var result = await td_service.getTD(id);
        expect(result).toEqual({
            id: 1,
            name: 'test 1',
            procedureDescription: 'test desc 1',
            idSKU: 1
        });

        id = 2;
        result = await td_service.getTD(id);
        expect(result).toEqual({
            id: 2,
            name: 'test 2',
            procedureDescription: 'test desc 2',
            idSKU: 1
        })
        id = 99999;
        try {
            await td_service.getTD(id);
        } catch (e) {
            expect(e).toBe(404);
        }

        try {
            await td_service.getTD(id);
        } catch (e) {
            expect(e).toBe(500);
        }

        result = await td_service.getTD(id);
        expect(result).toEqual({
            id: 2,
            name: 'test 2',
            procedureDescription: 'test desc 2',
            idSKU: 1
        })

    })

})


describe('add TD', () => {
    beforeEach(() => {
        dao.getTD.mockReset();
        dao.getSKU.mockReset();
        dao.getSKU.mockResolvedValueOnce(
            {
                id: 1
            }
        )
            .mockResolvedValueOnce(undefined)
            .mockRejectedValueOnce(500)

        dao.insertTD.mockResolvedValueOnce(201);

    })

    test('add test descriptor', async () => {
        const body = {
            name: 'test 1',
            procedureDescription: 'new descr',
            idSKU: 1
        };
        var res = await td_service.addTD(body);
        expect(dao.insertTD.mock.calls[0][0]).toBe(body.name);
        expect(dao.insertTD.mock.calls[0][1]).toBe(body.procedureDescription);
        expect(dao.insertTD.mock.calls[0][2]).toBe(body.idSKU);
        expect(res).toEqual(201);
        try {
            await td_service.addTD(body);
        } catch (e) {
            expect(e).toEqual(404);
        }

        try {
            await td_service.addTD(body);
        } catch (e) {
            expect(e).toEqual(500);
        }

    })
})


describe('modify TD', () => {
    const id = 1;
    const body = {
        newName: 'new test 1',
        newProcedureDescription: 'new Desc',
        newIdSKU: 2
    }

    beforeEach(() => {
        dao.getTD.mockReset();
        dao.getSKU.mockReset();
        dao.updateTD.mockReset();
    });

    describe('testing getTD', () => {
        beforeEach(() => {
            dao.getTD
                .mockResolvedValueOnce({
                    id: 1,
                    name: 'test 1',
                    procedureDescription: 'test desc 1',
                    idSKU: 1
                })
                .mockResolvedValueOnce(undefined)
                .mockRejectedValueOnce(500)
                .mockResolvedValue({
                    id: 1,
                    name: 'test 1',
                    procedureDescription: 'test desc 1',
                    idSKU: 1
                })

            dao.getSKU.mockResolvedValue({ id: 1 });
            dao.updateTD.mockResolvedValue(200);
        })

        test('getTD cases', async () => {
            var res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

            try {
                await td_service.modifyTD(id, body);
            } catch (e) {
                expect(e).toEqual(404)
            }

            try {
                await td_service.modifyTD(id, body);
            } catch (e) {
                expect(e).toEqual(500)
            }

            res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

            res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

        })
    })

    describe('testing getSKU', () => {
        beforeEach(() => {
            dao.getTD.mockResolvedValue({
                id: 1,
                name: 'test 1',
                procedureDescription: 'test desc 1',
                idSKU: 1
            })

            dao.getSKU
                .mockResolvedValueOnce({ id: 1 })
                .mockResolvedValueOnce(undefined)
                .mockRejectedValueOnce(500)
                .mockResolvedValue({ id: 1 })

            dao.updateTD.mockResolvedValue(200);
        })

        test('getSKU cases', async () => {
            var res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

            try {
                await td_service.modifyTD(id, body);
            } catch (e) {
                expect(e).toEqual(404)
            }

            try {
                await td_service.modifyTD(id, body);
            } catch (e) {
                expect(e).toEqual(500)
            }

            res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

            res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);
        })
    })

    describe('testing updateTD', () => {
        beforeEach(() => {
            dao.getTD.mockResolvedValue({
                id: 1,
                name: 'test 1',
                procedureDescription: 'test desc 1',
                idSKU: 1
            })

            dao.getSKU.mockResolvedValue({ id: 1 });

            dao.updateTD
                .mockResolvedValueOnce(200)
                .mockRejectedValueOnce(503)
                .mockResolvedValue(200)
        })

        test('updateTD cases', async () => {
            var res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

            try {
                await td_service.modifyTD(id, body);
            } catch (e) {
                expect(e).toEqual(503)
            }

            res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);

            res = await td_service.modifyTD(id, body);
            expect(res).toEqual(200);
        })
    })

})

describe('delete TD', () => {
    const id = 1;

    beforeEach(() => {
        dao.getTD.mockReset();
        dao.getSKU.mockReset();
        dao.updateSKUTestDescriptors.mockReset();
        dao.deleteTD.mockReset();
    });

    describe('testing getTD', () => {
        beforeEach(() => {
            dao.getTD
                .mockResolvedValueOnce({
                    id: 1,
                    name: 'test 1',
                    procedureDescription: 'test desc 1',
                    idSKU: 1
                })
                .mockResolvedValueOnce(undefined)
                .mockRejectedValueOnce(500)
                .mockResolvedValue({
                    id: 1,
                    name: 'test 1',
                    procedureDescription: 'test desc 1',
                    idSKU: 1
                })
            dao.getSKU.mockResolvedValue({
                id: 1,
                description: 'a sku',
                weight: 100,
                volume: 50,
                notes: 'ok',
                position: 171717,
                availableQuantity: 40,
                price: 10.99,
                testDescriptors: '1,2,3'
            });
            dao.updateSKUTestDescriptors.mockResolvedValue(200);
            dao.deleteTD.mockResolvedValue(200);
        })

        test('getTD cases', async () => {
            var res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            try {
                await td_service.deleteTD(id);
            } catch (e) {
                expect(e).toEqual(404)
            }

            try {
                await td_service.deleteTD(id);
            } catch (e) {
                expect(e).toEqual(500)
            }

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

        })
    })

    describe('testing getSKU', () => {
        beforeEach(() => {
            dao.getTD.mockResolvedValue({
                id: 1,
                name: 'test 1',
                procedureDescription: 'test desc 1',
                idSKU: 1
            })

            dao.getSKU
                .mockResolvedValueOnce({
                    id: 1,
                    description: 'a sku',
                    weight: 100,
                    volume: 50,
                    notes: 'ok',
                    position: 171717,
                    availableQuantity: 40,
                    price: 10.99,
                    testDescriptors: '1,2,3'
                })
                .mockResolvedValueOnce(undefined)
                .mockRejectedValueOnce(500)
                .mockResolvedValue({
                    id: 1,
                    description: 'a sku',
                    weight: 100,
                    volume: 50,
                    notes: 'ok',
                    position: 171717,
                    availableQuantity: 40,
                    price: 10.99,
                    testDescriptors: '1,2,3'
                })
            dao.updateSKUTestDescriptors.mockResolvedValue(200);
            dao.deleteTD.mockResolvedValue(200);
        })

        test('getSKU cases', async () => {
            var res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            try {
                await td_service.deleteTD(id);
            } catch (e) {
                expect(e).toEqual(404)
            }

            try {
                await td_service.deleteTD(id);
            } catch (e) {
                expect(e).toEqual(500)
            }

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);
        })
    })

    describe('testing updateSKUTestDescriptors', () => {
        beforeEach(() => {
            dao.getTD.mockResolvedValue({
                id: 1,
                name: 'test 1',
                procedureDescription: 'test desc 1',
                idSKU: 1
            });
            dao.getSKU.mockResolvedValue({
                id: 1,
                description: 'a sku',
                weight: 100,
                volume: 50,
                notes: 'ok',
                position: 171717,
                availableQuantity: 40,
                price: 10.99,
                testDescriptors: '1,2,3'
            });
            dao.updateSKUTestDescriptors
                .mockResolvedValueOnce(200)
                .mockRejectedValueOnce(503)
                .mockResolvedValue(200);
            dao.deleteTD.mockResolvedValue(200);
        })

        test('updateSKUTestDescriptors cases', async () => {
            var res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            try {
                await td_service.deleteTD(id);
            } catch (e) {
                expect(e).toEqual(503)
            }

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);
        })

    })

    describe('testing deleteTD', () => {
        beforeEach(() => {
            dao.getTD.mockResolvedValue({
                id: 1,
                name: 'test 1',
                procedureDescription: 'test desc 1',
                idSKU: 1
            })

            dao.getSKU.mockResolvedValue({
                id: 1,
                description: 'a sku',
                weight: 100,
                volume: 50,
                notes: 'ok',
                position: 171717,
                availableQuantity: 40,
                price: 10.99,
                testDescriptors: '1,2,3'
            });
            dao.updateSKUTestDescriptors.mockResolvedValue(200);
            dao.deleteTD
                .mockResolvedValueOnce(200)
                .mockRejectedValueOnce(503)
                .mockResolvedValue(200)
        })

        test('deleteTD cases', async () => {
            var res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            try {
                await td_service.deleteTD(id);
            } catch (e) {
                expect(e).toEqual(503)
            }

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);

            res = await td_service.deleteTD(id);
            expect(res).toEqual(200);
        })
    })

})
const SKU_dao = require("../modules/dao/SKU_dao");
const sku_dao = new SKU_dao;


describe("getSKUID", () => {
  beforeEach(async () => {
    await sku_dao.postSku({
      "description": "a new sku",
      "weight": 100,
      "volume": 50,
      "notes": "first SKU",
      "price": 10.99,
      "availableQuantity": 50
    }
    );
  });
  afterEach(async () => {
    await sku_dao.deleteAll();
  })
  testSKU(1);

});

async function testSKU(id) {
  test("getSKUID", async () => {
    let res = await sku_dao.getSKUsID(id)
    if (res) {
      expect(res).toEqual({
        description: res.description,
        weight: res.weight,
        volume: res.volume,
        notes: res.notes,
        position: res.position,
        availableQuantity: res.availableQuantity,
        price: res.price,
        testDescriptors: res.testDescriptors
      });
    }
  });
}

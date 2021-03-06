const item_dao = require("../modules/dao/item_dao");
const dao = new item_dao();
const SKU_dao = require("../modules/dao/SKU_dao");
const sku_dao = new SKU_dao;


describe("getItemID", () => {
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

    await dao.postItem(
      {
        "id": 1,
        "description": "a new item",
        "price": 10.99,
        "SKUId": 1,
        "supplierId": 2
      }

    );
  });
  afterEach(async ()=> {
    await sku_dao.deleteAll();
    await dao.deleteAll()
  })
  testItem(1);

});

async function testItem(id) {
  test("getItemID", async () => {
    let res = await dao.getItemsById(id)
    if (res) {
      expect(res).toEqual({
        id: id,
        description: res.description,
        price: res.price,
        SKUId: res.SKUId,
        supplierId: res.supplierId
      });
    }
  });
}

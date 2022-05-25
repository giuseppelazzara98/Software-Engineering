const SKU_dao=require ("../modules/dao/SKU_dao");
const sku_dao= new SKU_dao;


describe("getSKUID", () => {
  beforeEach(async () => {
    await sku_dao.postSku(    {
      "description" : "a new sku",
      "weight" : 100,
      "volume" : 50,
      "notes" : "first SKU",
      "price" : 10.99,
      "availableQuantity" : 50
  }
);
  
    
  });
  testSKU(1);
  
});

async function testSKU(id) {
  test("getSKUID", async () => {
    let res = await sku_dao.getSKUsID(id)
    if (res) {
      expect(res[0]).toEqual({
        description: res[0].description,
        weight:res[0].weight,
        volume:res[0].volume,
        notes:res[0].notes,
        position:res[0].position,
        availableQuantity:res[0].availableQuantity,
        price: res[0].price,
        testDescriptors:res[0].testDescriptors
      });
    }
  });
}

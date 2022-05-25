const SKU_dao=require ("../modules/dao/SKU_dao");
const sku_dao= new SKU_dao;
const SKU_item_dao= require("../modules/dao/SKU_item_dao");
const skuit_dao=new SKU_item_dao;


describe("getSKU_itemID", () => {
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
    await skuit_dao.postSkuItem(    {
      "RFID":"12345678901234567890123456789015",
      "SKUId":1,
      "DateOfStock":"2021/11/29 12:30"
}
)
  
    
  });
  testSKU("12345678901234567890123456789015");
  
});

async function testSKU(rfid) {
  test("getSKU_itemID", async () => {
    let res = await skuit_dao.getSKUItemsRFID(rfid);
    if (res) {
      expect(res).toEqual({
        RFID:res.RFID,
        SKUId:res.SKUId,
        Available:res.Available,
        DateOfStock:res.DateOfStock
      });
    }
  });
}

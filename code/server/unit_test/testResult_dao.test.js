const testResult_dao = require("../modules/dao/testResult_dao");
const dao = new testResult_dao();
const TestDescriptor_dao = require("../modules/dao/TestDescriptor_dao");
const daoitd = new TestDescriptor_dao();
const SKU_item_dao = require("../modules/dao/SKU_item_dao");
const skui_dao = new SKU_item_dao();
const SKU_dao = require("../modules/dao/SKU_dao");
const sku_dao = new SKU_dao;


describe("getTestResultRFID_ID", () => {
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
    await skui_dao.postSkuItem({
      "RFID": "12345678901234567890123456789015",
      "SKUId": 1,
      "DateOfStock": "2021/11/29 12:30"
    }
    );
    await daoitd.insertTD({
      "name": "test descriptor 3",
      "procedureDescription": "This test is described by...",
      "idSKU": 1
    }
    )
    await dao.postTestResult(
      {
        "rfid": "12345678901234567890123456789015",
        "idTestDescriptor": 1,
        "Date": "2021/11/11",
        "Result": false
      }


    );
  });
  afterEach(async () => {
    await sku_dao.deleteAll();
    await skui_dao.deleteAll();
    await daoitd.deleteAll();
    await dao.deleteAll();
  })
  testTestResult("12345678901234567890123456789015", 1);

});

async function testTestResult(rfid, id) {
  test("getTestResultRFID_ID", async () => {
    let res = await dao.getTestResultsById(rfid, id);
    if (res) {
      expect(res).toEqual({
        id: id,
        idTestDescriptor: res.idTestDescriptor,
        Date: res.Date,
        Result: res.Result
      });
    }
  });
}

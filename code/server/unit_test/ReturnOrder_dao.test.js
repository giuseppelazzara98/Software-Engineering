
const ReturnOrder_dao = require("../modules/dao/ReturnOrders_dao");
const dao = new ReturnOrder_dao();

/** */
describe("getReturn", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.createNewReturnOrder(
      {
        "returnDate":"2021-11-29 09:11",
        "products": [{"SKUId":3,"description":"sku","price":10.99,
        "RFID":"12345678901234567890123456789016"}],
        "restockOrderId" : 6
    }

      
    );
  });
  testgetReturn(
    {
      returnDate:"2021-11-29 09:11",
      products: [{"SKUId":3,"description":"sku","price":10.99,"RFID":"12345678901234567890123456789016"}],
      restockOrderId:6
  }
    );

});

async function testgetReturn(returned) {
  test("getReturn", async () => {
    let res = await dao.getAllReturnOrders();

    if (res) {
 
      expect(returned).toEqual({
        // id: res[0].ReturnOrderID,
        returnDate: res[0].returnDate,
        products: res[0].products,
        restockOrderId: res[0].restockOrderId,

});
    }
  });
}
/****** */

describe("createReturnOrder", () => {
  beforeEach(async () => {
    await dao.deleteAll();
  });
  afterEach(async () => {
      await dao.deleteAll();
  });
  testCreateReturnOrder(
    {
      returnDate:"2021-11-29 09:11",
      products: [{"SKUId":3,"description":"sku","price":10.99,"RFID":"12345678901234567890123456789016"}],
      restockOrderId:6
  });
  });

async function testCreateReturnOrder(ReturnOrders) {
  test("createReturnOrder", async () => {
      let res = await dao.createNewReturnOrder(
        {
          "returnDate":ReturnOrders["returnDate"],
          "products": ReturnOrders["products"],
          "restockOrderId": ReturnOrders["restockOrderId"],
         
      }
        );
      
          res = await dao.getAllReturnOrders();
      // console.log(res)

      expect(ReturnOrders).toEqual({

        returnDate: res[0].returnDate,
        products: res[0].products,
        restockOrderId: res[0].restockOrderId,
  });
  });
}

// /******** */
describe("deleteReturnOrder", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.createNewReturnOrder(
      {
        "returnDate":"2021-11-29 09:11",
        "products": [{"SKUId":3,"description":"sku","price":10.99,
        "RFID":"12345678901234567890123456789016"}],
        "restockOrderId" : 6
    }
    );
  });
  testDeleteReturnOrder({
    returnDate:"2021-11-29 09:11",
    products: [{"SKUId":3,"description":"sku","price":10.99,"RFID":"12345678901234567890123456789016"}],
    restockOrderId:6
  });
});

async function testDeleteReturnOrder(ReturnOrder) {
  test("deleteReturnOrder", async () => {
    res = await dao.getAllReturnOrders()
    r_id = res[0].id
    res = await dao.deleteReturnOrderById(r_id);
    // console.log(r_id)
    res = await dao.getAllReturnOrders();
    expect(res).toEqual([]);
    // console.log(res)
    // expect(await dao.getReturnOrderById(r_id)).toEqual(404);
  });
}



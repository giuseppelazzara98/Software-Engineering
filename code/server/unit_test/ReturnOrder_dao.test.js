
const ReturnOrder_dao = require("../modules/dao/ReturnOrders_dao");
const dao = new ReturnOrder_dao();

const RestockOrder_dao = require("../modules/dao/RestockOrders_dao");
const rdao = new RestockOrder_dao();

const User_dao = require("../modules/dao/User_dao");
const udao = new User_dao();

const Item_dao = require("../modules/dao/item_dao");
const idao = new Item_dao();

const skuitem_dao = require("../modules/dao/SKU_item_dao");
const sidao = new skuitem_dao();


const sku_dao = require("../modules/dao/SKU_dao");
const sdao = new sku_dao();


/** */
describe("getReturn", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await rdao.deleteAll();
    await udao.deleteAll();
    await idao.deleteAll();
    await sidao.deleteAll();
    await sdao.deleteAll();

    
  });
  afterEach(async () => {
    await dao.deleteAll();
    await rdao.deleteAll();
    await udao.deleteAll();
    await idao.deleteAll();
    await sidao.deleteAll();
    await sdao.deleteAll();

    
  });

  testgetReturn({
    
      
    returnDate: '2023-09-05 09:09',
    products: [],
    restockOrderId: 1
      
    
  });
});

async function testgetReturn(returned) {
  test("getReturn", async () => {

    const user = await udao.addNewUser(
      {
        "username":"mj@ezwh.com",
        "name":"John",
        "surname" : "Smith",
        "password" : "testpassword",
        "type" : "supplier" } );
      
      const sku1 = await sdao.postSku({description: "Asus", weight: 100, volume: 20, price: 237, availableQuantity: 15});
  
      await idao.postItem(1, "official supply for acer aspire", 250, sku1.id, user.id);
  
      const order2 = await rdao.insertRO("2022/05/05 09:33", user.id, [{SKUId: sku1.id, description: "This is a good laptop", price: 250, qty: 10}]);
      await rdao.updateStateRO(1, "COMPLETEDRETURN");

      const skuItems = [{SKUId: sku1.id, rfid: "01234567890523456789012345678901"}, {SKUId: sku1.id, rfid: "98765432109876543210987654321098"}];
      await rdao.addSkuItems(1, skuItems);
      const retOrder1 = await dao.createNewReturnOrder(
      {
        "returnDate":"2023/09/05 09:33",
        "products": [{SKUId: sku1.id, description: "This is a good laptop", price: 250, RFID: skuItems[0].rfid}],
        "restockOrderId" : 1
    }

      );
      // const retOrder2 = await dao.createNewReturnOrder("2024/05/05", order2, [{SKUId: sku1.id, description: "This is a good laptop", price: 250, RFID: skuItems[1].rfid}]);
  
      const res = await dao.getAllReturnOrders();

  
 
    expect(returned).toEqual({
      // id: res[0].id,
      returnDate: res[0].returnDate,
      products: res[0].products,
      restockOrderId: res[0].restockOrderId,
});
    
  });
}


/*** */


describe("deleteReturn", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await rdao.deleteAll();
    await udao.deleteAll();
    await idao.deleteAll();
    await sidao.deleteAll();
    await sdao.deleteAll();

    
  });
  afterEach(async () => {
    await dao.deleteAll();
    await rdao.deleteAll();
    await udao.deleteAll();
    await idao.deleteAll();
    await sidao.deleteAll();
    await sdao.deleteAll();

    
  });

  delReturn({
    
      
    returnDate: '2023-09-05 09:09',
    products: [],
    restockOrderId: 1
      
    
  });
});

async function delReturn(returned) {
  test("deleteReturn", async () => {

    const user = await udao.addNewUser(
      {
        "username":"mj@ezwh.com",
        "name":"John",
        "surname" : "Smith",
        "password" : "testpassword",
        "type" : "supplier" } );
      
      const sku1 = await sdao.postSku({description: "Asus", weight: 100, volume: 20, price: 100, availableQuantity: 15});
  
      await idao.postItem(1, "official supply for acer aspire", 250, sku1.id, user.id);
  
      const order2 = await rdao.insertRO("2022/05/05 09:33", user.id, [{SKUId: sku1.id, description: "This is a good laptop", price: 250, qty: 10}]);
      await rdao.updateStateRO(1, "COMPLETEDRETURN");

      const skuItems = [{SKUId: sku1.id, rfid: "01234567890523456789012345678901"}, {SKUId: sku1.id, rfid: "98765432109876543210987654321098"}];
      await rdao.addSkuItems(1, skuItems);
      const retOrder1 = await dao.createNewReturnOrder(
      {
        "returnDate":"2023/09/05 09:33",
        "products": [{SKUId: sku1.id, description: "This is a good laptop", price: 250, RFID: skuItems[0].rfid}],
        "restockOrderId" : 1
    }

      );
      // const retOrder2 = await dao.createNewReturnOrder("2024/05/05", order2, [{SKUId: sku1.id, description: "This is a good laptop", price: 250, RFID: skuItems[1].rfid}]);
      res = await dao.getAllReturnOrders();
      await dao.deleteReturnOrderById(res[0].id);
      res = await dao.getAllReturnOrders();
      // console.log(res)
      expect(res).toEqual([]);

  
 
 
    
  });
}
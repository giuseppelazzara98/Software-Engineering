const Position_dao = require("../modules/dao/Position_dao");
const dao = new Position_dao();

describe("Test isolate functions", () => {
  test("test convertResultSetToDomainModelposition", () => {
    // todo
  });
  test("tes validatePositionID", () => {
    expect(dao.validatePositionID("123456789876", "1234", "5678", "9876")).toBe(
      true
    );
  });
  test("buildPositionID", () => {
    //todo
  });
});

describe("Test dao functions", () => {
  test("test getAllPositions", async () => {});
});





describe("getPosition", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.createNewPosition(
      {
        "positionID":"800234543412",
        "aisleID": "8002",
        "row": "3454",
        "col": "3412",
        "maxWeight": 1000,
        "maxVolume": 1000
    }

          

    );
  });
  afterEach(async () => {
      await dao.deleteAll();
  });
  testGetPosition(
      {
          ID:"800234543412",
          aisleID: "8002",
          row: "3454",
          col: "3412",
          maxWeight: 1000,
          maxVolume: 1000
      });
  });

async function testGetPosition(positions) {
  test("getPosition", async () => {
      let res = await dao.getAllPositions();
      expect(positions).toEqual({
          ID: res[0].positionID,
          aisleID: res[0].aisleID,
          row: res[0].row,
          col: res[0].col,
          maxWeight: res[0].maxWeight,
          maxVolume: res[0].maxVolume
  });
  });
}


/****** */

describe("createPosition", () => {
  beforeEach(async () => {
    await dao.deleteAll();
  });
  afterEach(async () => {
      await dao.deleteAll();
  });
  testCreatePosition(
      {
          ID:"800234543412",
          aisleID: "8002",
          row: "3454",
          col: "3412",
          maxWeight: 1000,
          maxVolume: 1000
      });
  });

async function testCreatePosition(positions) {
  test("createPosition", async () => {
      let res = await dao.createNewPosition(
        {
          "positionID":positions["ID"],
          "aisleID": positions["aisleID"],
          "row": positions["row"],
          "col": positions["col"],
          "maxWeight": positions["maxWeight"],
          "maxVolume": positions["maxVolume"]
      }
        );
      
          res = await dao.getAllPositions();
      console.log(res)

      expect(positions).toEqual({

          ID: res[0].positionID,
          aisleID: res[0].aisleID,
          row: res[0].row,
          col: res[0].col,
          maxWeight: res[0].maxWeight,
          maxVolume: res[0].maxVolume
  });
  });
}

/******** */
describe("updatePositionByPosId", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.createNewPosition(
      {
        "positionID":"800234543412",
        "aisleID": "8002",
        "row": "3454",
        "col": "3412",
        "maxWeight": 1000,
        "maxVolume": 1000
    }

); 
  });
  afterEach(async () => {
      await dao.deleteAll();
  });
  testUpdatePositionByPosId(
      {
          positionID:"800234543412",
          aisleID: "4002",
          row: "3500",
          col: "3500",
          maxWeight: 300,
          maxVolume: 400,
          occupiedWeight: 10,
          occupiedVolume: 8
      });
  });

async function testUpdatePositionByPosId(positions) {

  test("updatePositionByPosId", async () => {
      let res = await dao.updatePositionByPosId(
        
        
        
          positions["positionID"],

          {
          "newAisleID": positions["aisleID"],
          "newRow": positions["row"],
          "newCol": positions["col"],
          "newMaxWeight": positions["maxWeight"],
          "newMaxVolume": positions["maxVolume"],
          "newOccupiedWeight": positions["occupiedWeight"],
          "newOccupiedVolume":positions["occupiedVolume"]
}
      
      
                );
      res = await dao.getAllPositions();
      console.log(res[0].occupiedVolume);
      expect(res[0]).toEqual({

          positionID: res[0].positionID,
          aisleID: res[0].aisleID,
          row: res[0].row,
          col: res[0].col,
          maxWeight: res[0].maxWeight,
          maxVolume: res[0].maxVolume,
          occupiedWeight: res[0].occupiedWeight,
          occupiedVolume: res[0].occupiedVolume
  });
  });
}


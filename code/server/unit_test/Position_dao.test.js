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

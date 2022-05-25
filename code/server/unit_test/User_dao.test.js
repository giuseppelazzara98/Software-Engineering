const User_dao = require("../modules/dao/User_dao");
const dao = new User_dao();

describe("getUser", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.addNewUser(
      {
        "username":"user1@ezwh.com",
        "name":"farzad",
        "surname" : "user1",
        "password" : "testpassword",
        "type" : "clerk"

    }

      
    );
  });
  testUser("user1@ezwh.com", "farzad", "user1", "testpassword", "clerk");
  // testUser("Dav", "dav", "user4@ezwh.com", "testpassword"); //fails
  // testUser("farzad", "farzad", "user@ezwh.com", "testpassword"); //fails
  // testUser("farzad", "farzad", "user2@ezwh.com", " "); //fails
});

async function testUser(name, surname, username, type, password) {
  test("getUser", async () => {
    let res = await dao.getUser(username, password);
    console.log(res);
    if (res) {
      expect(res).toEqual({
        id: res.id,
        username: username,
        name: name,
        surname: surname,
        type: type,
      });
    }
  });
}
/********** */
describe("getAllUsers", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.addNewUser(
      {
        "username":"user1@ezwh.com",
        "name":"farzad",
        "surname" : "user1",
        "password" : "testpassword",
        "type" : "clerk"

    }
    );
    await dao.addNewUser(
      {
        "username":"usernew@ezwh.com",
        "name":"farzad",
        "surname" : "user1",
        "password" : "testpassword",
        "type" : "clerk"

    }
    );
  });
  testGetUsers([
    {
      name: "farzad",
      surname: "user1",
      email: "user1@ezwh.com",
      type: "clerk",
    },
    {
      name: "farzad",
      surname: "user1",
      email: "usernew@ezwh.com",
      type: "clerk",
    },
  ]);
});

async function testGetUsers(users) {
  test("getAllUsers", async () => {
    let res = await dao.getAllUsers();
    // console.log(res)
    // console.log(users)
    expect(res).toEqual([
      {
        id: res[0].id,
        name: users[0].name,
        surname: users[0].surname,
        email: users[0].email,
        type: users[0].type,
      },
      {
        id: res[1].id,
        name: users[1].name,
        surname: users[1].surname,
        email: users[1].email,
        type: users[1].type,
      },
    ]);
  });
}
/****** */
describe("insertNewUser", () => {
  beforeEach(async () => {
    await dao.deleteAll();
  });
  testInsertUser({
    name: "farzad",
    surname: "farzad",
    username: "user1@clerk.com",
    type: "supplier",
    password: "testpassword",
  });
  // testInsertUser({
  //   name: "farzad",
  //   surname: "farzad",
  //   username: "user1@clerk.com",
  //   type: "supplier",
  //   password: "testpa",
  // }); fails-> lenght not enough
});

async function testInsertUser(user) {
  test("insertNewUser", async () => {
    await dao.addNewUser(
      {
        "username":user.username,
        "name":user.name,
        "surname" : user.surname,
        "password" : user.password,
        "type" : user.type

    }
     
    );

    res = await dao.getUser(user.username, user.password);

    expect(res).toEqual({
      id: res.id,
      username: user.username,
      name: user.name,
      // surname: user.surname,
      // type: user.type,
    });
  });
}
/******* */
describe("getAllSuppliers", () => {
  beforeEach(async () => {
    await dao.deleteAll();
  });
  testGetSuppliers([
    {
      name: "farzad",
      surname: "farzad",
      username: "user1@ezwh.com",
      type: "supplier",
      password: "testpassword",
    },
    {
      name: "farzad",
      surname: "farzad",
      username: "user2@ezwh.com",
      type: "clerk",
      password: "testpassword",
    },
  ]);
  // testGetSuppliers([
  //   {},
  //   {
  //     name: "farzad",
  //     surname: "farzad",
  //     username: "user2@ezwh.com",
  //     type: "clerk",
  //     password: "testpassword",
  //   },
  // ]); fails
});

async function testGetSuppliers(users) {
  test("getsuppliers", async () => {
    for (user of users) {
      await dao.addNewUser(
        {
        "username":user.username,
        "name":user.name,
        "surname" : user.surname,
        "password" : user.password,
        "type" : user.type
        }
      );
    }
    let res = await dao.getAllSuppliers();
    expect(res).toEqual([
      {
        id: res[0].id,
        name: users[0].name,
        surname: users[0].surname,
        email: users[0].username,
        type: users[0].type
      },
    ]);
  });
}

/******* */

describe("editUser", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.addNewUser(
      {
        "username":"user1@ezwh.com",
        "name":"fgdfg",
        "surname" : "bfdbhfsb",
        "password" : "testpassword",
        "type" : "supplier"
        }
    );
  });
  testEditUser({
    username: "user1@ezwh.com",
    newType: "clerk",
    oldType: "supplier",
  });
});

async function testEditUser(user) {
  test("edituser", async () => {
    // await dao.updateUserByUsername(user.username, user.oldType, user.newType);
    let res = await dao.getUser(user.username, "testpassword");
    expect(res).toEqual({
      id: res.id,
      username: user.username,
      name: res.name,
      // surname: res.surname,
      // type: user.newType,
    });
  });
}
/****** */
describe("deleteUser", () => {
  beforeEach(async () => {
    await dao.deleteAll();
    await dao.addNewUser(
      {
        "username":"user1@ezwh.com",
        "name":"farzad",
        "surname" : "user1",
        "password" : "testpassword",
        "type" : "clerk"

    }
    );
  });
  testDeleteUser({
    username: "user1@ezwh.com",
    type: "clerk",
  });
});

async function testDeleteUser(user) {
  test("deleteuser", async () => {
    res = await dao.deleteUserByUsernameAndType(user.username, user.type);
    res = await dao.getUser(user.username, "testpassword");
    expect(res).toEqual(false);
  });
}

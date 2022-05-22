--
-- File generated with SQLiteStudio v3.3.3 on Thu May 12 16:36:14 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: internalOrders
DROP TABLE IF EXISTS internalOrders;
CREATE TABLE internalOrders (id INTEGER PRIMARY KEY AUTOINCREMENT, issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, customerID INTEGER NOT NULL);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (1, '2021-11-29 09:33', 'ACCEPTED', '1,2,3', 1);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (2, '2021-11-30 19:33', 'COMPLETED', '2,1,4', 1);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (3, '2022-02-11 12:22', 'ISSUED', '1,2,3', 3);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (4, '2021-10-01 13:33', 'REFUSED', '4,2,3', 2);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (5, '2021-03-14 15:34', 'CANCELED', '2,3,4', 1);

-- Table: items
DROP TABLE IF EXISTS items;
CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, price NUMERIC, SKUid INTEGER, supplierId INTEGER);

-- Table: restockOrders
DROP TABLE IF EXISTS restockOrders;
CREATE TABLE restockOrders (id INTEGER PRIMARY KEY AUTOINCREMENT, issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, supplierID INTEGER NOT NULL, transportNoteID INTEGER, skuItems TEXT);
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportNoteID, skuItems) VALUES (1, '2021-11-11 09:33', 'ISSUED', '1,2,3', 1, 2, '12345678901234567890123456789013,12345678901234567890123456789011,12345678901234567890123456789012,12345678901234567890123456789014');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportNoteID, skuItems) VALUES (2, '2022-01-22 09:33', 'DELIVERY', '1,2', 2, 1, '12345678901234567890123456789017,12345678901234567890123456789016,12345678901234567890123456789014');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportNoteID, skuItems) VALUES (3, '2021-11-11 11:11', 'DELIVERED', '1,2,3,4', 3, 3, '12345678901234567890123456789014,12345678901234567890123456789015');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportNoteID, skuItems) VALUES (4, '2021-10-21 21:13', 'TESTED', '3,4', 2, 4, '12345678901234567890123456789014');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportNoteID, skuItems) VALUES (5, '2021-04-06 19:32', 'COMPLETED', '3,4,2', 1, 5, '12345678901234567890123456789016,12345678901234567890123456789014,12345678901234567890123456789017');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportNoteID, skuItems) VALUES (6, '2020-04-22 12:22', 'COMPLETEDRETURN', '1,3', 1, 6, '12345678901234567890123456789015,12345678901234567890123456789015,12345678901234567890123456789012');

-- Table: SKUItems
DROP TABLE IF EXISTS SKUItems;
CREATE TABLE SKUItems (rowID INTEGER PRIMARY KEY AUTOINCREMENT, RFID TEXT, SKUId INTEGER, Available INTEGER, DateOfStock TEXT);
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789011', 1, 0, '2021-11-29 12:30');
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789012', 1, 0, '2021-10-29 12:30');
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789013', 3, 0, '2021-12-29 12:30');
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789014', 2, 0, '2021-11-12 10:30');
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789015', 1, NULL, '2021-11-29 12:30');
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789016', 3, 0, '2021-11-21 15:30');
INSERT INTO SKUItems (RFID, SKUId, Available, DateOfStock) VALUES ('12345678901234567890123456789017', 1, 0, '2021-12-12 12:30');


-- Table: SKUs
DROP TABLE IF EXISTS SKUs;
CREATE TABLE SKUs (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, weight NUMERIC, volume NUMERIC, notes TEXT, position INTEGER, availableQuantity INTEGER, price NUMERIC, testDescriptors TEXT);
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('a new sku', 100, 50, 'first sku', 800234523412, 50, 10.99, '1,2,3');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('another sku', 101, 60, 'second sku', 800234523412, 55, 10.99, '2,3,4');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('sku', 104, 60, 'third sku', 800234523412, 45, 10.99, '2,4');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('sku sku', 102, 60, 'fourth sku', 800234523412, 12, 19.99, '2,3,4');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('still sku', 107, 60, 'fifth sku', 800234523412, 54, 16.99, '1,3,4');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('ok sku', 190, 60, 'sixth sku', 800234523412, 23, 13.99, '2,1,4');

-- Table: test descriptors
DROP TABLE IF EXISTS testDescriptors;
CREATE TABLE testdescriptors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, procedureDescription TEXT, idSKU INTEGER);
INSERT INTO testdescriptors (name, procedureDescription, idSKU) VALUES ('test descriptor 1', 'this test is described by', 1);
INSERT INTO testdescriptors (name, procedureDescription, idSKU) VALUES ('test descriptor 2', 'this test is described by', 2);
INSERT INTO testdescriptors (name, procedureDescription, idSKU) VALUES ('test descriptor 3', 'this test is described by', 3);
INSERT INTO testdescriptors (name, procedureDescription, idSKU) VALUES ('test descriptor 4', 'this test is described by', 4);

-- Table: test Results
DROP TABLE IF EXISTS testResults;
CREATE TABLE testResults (id INTEGER PRIMARY KEY AUTOINCREMENT, idTestDescriptor INTEGER, Date TEXT, Result INTEGER);

-- Table: Users
DROP TABLE IF EXISTS user;
CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, name TEXT, surname TEXT, type TEXT);
INSERT INTO Users (id, username, password, name, surname, type) VALUES (1, 'f.i.s', 'test', 'farzad', 'ips', 'manager');

-- Table: returnOrder
DROP TABLE IF EXISTS returnOrder;
CREATE TABLE returnOrder (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    returnDate     TEXT,
    products       TEXT,
    restockOrderId INTEGER REFERENCES restockOrders (id) ON DELETE CASCADE
                                                         ON UPDATE CASCADE
);
-- Table: position
DROP TABLE IF EXISTS position;
CREATE TABLE position (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    positionID     TEXT,
    aisleID        TEXT,
    row            TEXT,
    col            TEXT,
    maxWeight      INTEGER,
    maxVolume      INTEGER,
    occupiedWeight INTEGER,
    occupiedVolume INTEGER
);

-- Table: transportNote
DROP TABLE IF EXISTS transportNote;
CREATE TABLE transportNote (id INTEGER PRIMARY KEY AUTOINCREMENT, deliveryDate TEXT);
INSERT INTO transportNote (deliveryDate) VALUES ('2022-01-11');
INSERT INTO transportNote (deliveryDate) VALUES ('2021-11-16');
INSERT INTO transportNote (deliveryDate) VALUES ('2021-12-21');
INSERT INTO transportNote (deliveryDate) VALUES ('2021-10-31');
INSERT INTO transportNote (deliveryDate) VALUES ('2021-09-11');
INSERT INTO transportNote (deliveryDate) VALUES ('2021-11-01');


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

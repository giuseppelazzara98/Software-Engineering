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
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (1, '2021-11-29 09:33', 'ACCEPTED', '12, 180', 1);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (2, '2021-11-30 19:33', 'COMPLETED', '12, 180', 1);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (3, '2022-02-11 12:22', 'ISSUED', '1,2,3', 3);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (4, '2021-10-01 13:33', 'REFUSED', '4,5,6,10', 2);
INSERT INTO internalOrders (id, issueDate, state, products, customerID) VALUES (5, '2021-03-14 15:34', 'CANCELED', '2,3,4', 1);

-- Table: items
DROP TABLE IF EXISTS items;
CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, price NUMERIC, SKUid INTEGER, supplierId INTEGER);

-- Table: restockOrders
DROP TABLE IF EXISTS restockOrders;
CREATE TABLE restockOrders (id INTEGER PRIMARY KEY AUTOINCREMENT, issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, supplierID INTEGER NOT NULL, transportDate TEXT, skuItems TEXT);
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportDate, skuItems) VALUES (1, '2021-11-11 09:33', 'ISSUED', '11,90,22', 1, NULL, '1,1,2,3');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportDate, skuItems) VALUES (2, '2022-01-22 09:33', 'DELIVERY', '11,22,33,34', 2, '2022-01-11', '11,11,12');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportDate, skuItems) VALUES (3, '2021-11-11 11:11', 'DELIVERED', '1,2,3,4', 3, NULL, '1,2,2,3,4,4');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportDate, skuItems) VALUES (4, '2021-10-21 21:13', 'TESTED', '1,2,3,4', 2, NULL, '1,1,2,3,4,4');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportDate, skuItems) VALUES (5, '2021-04-06 19:32', 'COMPLETED', '13,41,44,32', 1, NULL, '13,42,22');
INSERT INTO restockOrders (id, issueDate, state, products, supplierID, transportDate, skuItems) VALUES (6, '2020-04-22 12:22', 'COMPLETEDRETURN', '11,90', 1, NULL, '11,11,90,90');

-- Table: SKUItems
DROP TABLE IF EXISTS SKUItems;
CREATE TABLE SKUItems (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    RFID        TEXT    UNIQUE,
    SKUId       INTEGER,
    Available   INTEGER,
    DateOfStock TEXT
);

-- Table: SKUs
DROP TABLE IF EXISTS SKUs;
CREATE TABLE SKUs (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, weight NUMERIC, volume NUMERIC, notes TEXT, position INTEGER, availableQuantity INTEGER, price NUMERIC, testDescriptors TEXT);
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('desc', 11.1, 1.1, 'note', 1, 89, 12.3, '1,2,3');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('desc', 11.1, 1.1, 'note', 1, 89, 12.3, '1,2,3');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('desc', 11.1, 1.1, 'note', 1, 89, 12.3, '1,2,3');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('desc', 11.1, 1.1, 'note', 1, 89, 12.3, '1,2,3');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('desc', 11.1, 1.1, 'note', 1, 89, 12.3, '1,2,3');
INSERT INTO SKUs (description, weight, volume, notes, position, availableQuantity, price, testDescriptors) VALUES ('desc', 11.1, 1.1, 'note', 1, 89, 12.3, '1,2,3');

-- Table: test descriptors
DROP TABLE IF EXISTS testDescriptors;
CREATE TABLE testdescriptors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, procedureDescription TEXT, idSKU INTEGER);
INSERT INTO testdescriptors (id, name, procedureDescription, idSKU) VALUES (1, 'test descriptor 1', 'this test is described by', 1);

-- Table: test Results
DROP TABLE IF EXISTS testResults;
CREATE TABLE testResults (id INTEGER PRIMARY KEY AUTOINCREMENT, idTestDescriptor INTEGER, Date TEXT, Result INTEGER);

-- Table: Users
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, name TEXT, surname TEXT, type TEXT);
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


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

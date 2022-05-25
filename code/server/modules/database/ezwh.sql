--
-- File generated with SQLiteStudio v3.3.3 on Thu May 12 16:36:14 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: internalOrders
DROP TABLE IF EXISTS internalOrders;
CREATE TABLE internalOrders (id INTEGER PRIMARY KEY , issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, customerID INTEGER NOT NULL);

-- Table: items
DROP TABLE IF EXISTS items;
CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, price NUMERIC, SKUid INTEGER, supplierId INTEGER);

-- Table: restockOrders
DROP TABLE IF EXISTS restockOrders;
CREATE TABLE restockOrders (id INTEGER PRIMARY KEY , issueDate TEXT NOT NULL, state TEXT NOT NULL, products TEXT, supplierID INTEGER NOT NULL, transportNoteID INTEGER, skuItems TEXT);

-- Table: SKUItems
DROP TABLE IF EXISTS SKUItems;
CREATE TABLE SKUItems (rowID INTEGER PRIMARY KEY AUTOINCREMENT, RFID TEXT, SKUId INTEGER, Available INTEGER, DateOfStock TEXT);

-- Table: SKUs
DROP TABLE IF EXISTS SKUs;
CREATE TABLE SKUs (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, weight NUMERIC, volume NUMERIC, notes TEXT, position INTEGER, availableQuantity INTEGER, price NUMERIC, testDescriptors TEXT);

-- Table: test descriptors
DROP TABLE IF EXISTS testDescriptors;
CREATE TABLE testDescriptors (id INTEGER PRIMARY KEY, name TEXT, procedureDescription TEXT, idSKU INTEGER);

-- Table: test Results
DROP TABLE IF EXISTS testResults;
CREATE TABLE testResults (id INTEGER PRIMARY KEY AUTOINCREMENT, rfid TEXT, idTestDescriptor INTEGER, Date TEXT, Result INTEGER);

-- Table: Users
DROP TABLE IF EXISTS user;
CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, name TEXT, surname TEXT, type TEXT);

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
CREATE TABLE transportNote (id INTEGER PRIMARY KEY , deliveryDate TEXT);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

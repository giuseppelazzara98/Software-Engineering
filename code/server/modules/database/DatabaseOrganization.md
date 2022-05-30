# Database Organization
In this file there is the list of tables stored in the server. For each table, there are all the fields and a brief description if needed.

---

## Internal Order table
- id INTEGER PRIMARY KEY
- issueDate TEXT NOT NULL : DateTime is used in the format YYYY/MM/DD HH:MM:SS
- state TEXT NOT NULL
- products TEXT : it is a list of SKUIDs separated by the comma. Example: 1, 2, 3, 4, ..
- customerID INTEGER NOT NULL

## Restock Order table
- id INTEGER PRIMARY KEY
- issuedDate TEXT NOT NULL : DateTime is used in the format YYYY/MM/DD HH:MM:SS
- state TEXT NOT NULL
- products TEXT : it is a list of SKUIDs separated by the comma. Example: 1, 2, 3, 4, ..
- supplierID NOT NULL
- transportDate TEXT : DateTime is used in the format YYYY/MM/DD HH:MM:SS
- skuItems TEXT : : it is a list of SKUItemIDs separated by the comma. Example: 1, 2, 3, 4, ..

## user table
- id INTEGER PRIMARY KEY
- username UNIQUE TEXT
- password TEXT
- name TEXT 
- surname TEXT
- type TEXT


## SKU TABLE
- id INTEGER PRIMARY KEY
- description TEXT
- weight NUMERIC
- volume NUMERIC
- notes TEXT
- position INTEGER
- availableQuantity INTEGER
- price NUMERIC
- testDescriptors TEXT

## SKUITEM TABLE
- RFID INTEGER 
- SKUId INTEGER
- Available INTEGER
- DateOfStock DATETIME 

(RFID,SKUId) primary key couple

## TEST RESULT
- id INTEGER
- idTestDescriptor INTEGER
- Date DATETIME
- Result INTEGER (0 or 1)

(id,idTestDescriptor) primary key couple

## ITEM
- id INTEGER PRIMARY KEY 
- description TEXT
- price NUMERIC
- SKUid INTEGER
- supplierId INTEGER

## TEST DESCRIPTOR
- id INTEGER PRIMARY KEY
- name TEXT
- procedureDescription TEXT
- idSKU TEXT
# Database Organization
In this file there is the list of tables stored in the server. For each table, there are all the fields and a brief description if needed.

---

## Internal Order table
- id INTEGER PRIMARY KEY
- issueDate DATETIME NOT NULL : DateTime is used in the format YYYY/MM/DD HH:MM:SS
- state STRING NOT NULL
- products STRING : it is a list of SKUIDs separated by the comma. Example: 1, 2, 3, 4, ..
- customerID INTEGER NOT NULL

## Restock Order table
- id INTEGER PRIMARY KEY
- issuedDate DATETIME NOT NULL : DateTime is used in the format YYYY/MM/DD HH:MM:SS
- state STRING NOT NULL
- products STRING : it is a list of SKUIDs separated by the comma. Example: 1, 2, 3, 4, ..
- supplierID NOT NULL
- transportDate DATETIME : DateTime is used in the format YYYY/MM/DD HH:MM:SS
- skuItems STRING : : it is a list of SKUItemIDs separated by the comma. Example: 1, 2, 3, 4, ..
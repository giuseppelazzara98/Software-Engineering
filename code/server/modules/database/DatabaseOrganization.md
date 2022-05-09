# Database Organization
In this file there is the list of tables stored in the server. For each table, there are all the fields and a brief description if needed.

---

## Internal Order table
- id INTEGER PRIMARY KEY
- issueDate DATE NOT NULL
- state STRING NOT NULL
- products STRING : it is a list of SKUIDs separated by the comma. Example: 1, 2, 3, 4, ..
- customerID INTEGER NOT NULL
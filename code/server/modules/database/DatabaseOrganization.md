# Database Organization

## Internal Order table
- id INTEGER PRIMARY KEY
- issueDate DATE NOT NULL
- state STRING NOT NULL
- products STRING : it is a list of SKUIDs separated by the comma. Example: 1, 2, 3, 4, ..
- customerID INTEGER NOT NULL
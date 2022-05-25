# Unit Testing Report

Date:

Version:

# Contents

- [Black Box Unit Tests](#black-box-unit-tests)




- [White Box Unit Tests](#white-box-unit-tests)


# Black Box Unit Tests

    <Define here criteria, predicates and the combination of predicates for each function of each class.
    Define test cases to cover all equivalence classes and boundary conditions.
    In the table, report the description of the black box test case and (traceability) the correspondence with the Jest test case writing the 
    class and method name that contains the test case>
    <Jest tests  must be in code/server/unit_test  >

 ### **Class *class_name* - method *name***



**Criteria for method *name*:**
	

 - 
 - 





**Predicates for method *name*:**

| Criteria | Predicate |
| -------- | --------- |
|          |           |
|          |           |
|          |           |
|          |           |





**Boundaries**:

| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |
|          |                 |



**Combination of predicates**:


| Criteria 1 | Criteria 2 | ... | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|-------|
|||||||
|||||||
|||||||
|||||||
|||||||



### **Class Restock Order Service - method *getIO***
**Criteria for method *getRO*:**
 - id
  
**Predicates for method *getIO*:**
| Criteria | Predicate |
| :--------: | --------- |
| id    | internal order with id exists  |
|       | internal order with id does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id  | Valid / Invalid | Description of the test case | Jest test case |
|:--------------:|:-------:|:-------:|:-------:|
| internal order with id exists | Valid | id = 1 -> response.status(200) | InternalOrder_service_mockDao/getIO |
| internal order with id does not exist | Invalid | id = 999999 -> response.status(404)| InternalOrder_service_mockDao/getIO |


### **Class Internal Order Service - method *addIO***
**Criteria for method *addIO*:**
 - body
  
**Predicates for method *addIO*:**

| Criteria | Predicate |
| :--------: | --------- |
| body  | contains issueDate  |
|       | does not contain issueDate |

**Boundaries**:

| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| body  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :-------: | :-------: | :-------: |
| contains issueDate | Valid | body = {issueDate: 'YYYY/MM/DD HH:MM', products: [...], customerId: 1} -> response.status(201)| InternalOrder_service_mockDao/insertIO |
| does not contain issueDate | Invalid | body = {products: [...], customerId: 1}} -> response.status(422)| InternalOrder_service_mockDao/insertIO |


### **Class Internal Order Service - method *updateStateIO***
**Criteria for method *updateStateIO*:**
 - id
  
**Predicates for method *updateStateIO*:**
| Criteria | Predicate |
| :--------: | --------- |
| id    | internal order with id exists  |
|       | internal order with id does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :------: | :-------: | :-------: |
| internal order with id exists | Valid | id = 1 -> response.status(201) | InternalOrder_service_mockDao/updateIO |
| internal order with id does not exist | Invalid | id = 999999 -> response.status(404)| InternalOrder_service_mockDao/updateIO |



### **Class Restock Order Service - method *getRO***
**Criteria for method *getRO*:**
 - id
  
**Predicates for method *getRO*:**
| Criteria | Predicate |
| :--------: | --------- |
| id    | restock order with id exists  |
|       | restock order with id does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :------- :| :-------: | :-------: |
| restock order with id exists | Valid | id = 1 -> response.status(200) | RestockOrder_service_mockDao/getRO |
| restock order with id does not exist | Invalid | id = 999999 -> response.status(404)| RestockOrder_service_mockDao/getRO |


### **Class Restock Order Service - method *getROReturnedItems***
**Criteria for method *getROReturnedItems*:**
 - id
  
**Predicates for method *getROReturnedItems*:**
| Criteria | Predicate |
| :--------: | --------- |
| id    | restock order with id exists  |
|       | restock order with id does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :-------: | :-------: | :-------: |
| restock order with id exists | Valid | id = 1 -> response.status(200) | RestockOrder_service_mockDao/getROitems |
| restock order with id does not exist | Invalid | id = 999999 -> response.status(404)| RestockOrder_service_mockDao/getROitems |


### **Class Restock Order Service - method *addRO***
**Criteria for method *addRO*:**
 - body
  
**Predicates for method *addRO*:**

| Criteria | Predicate |
| :--------: | --------- |
| body  | contains issueDate  |
|       | does not contain issueDate |

**Boundaries**:

| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| body  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :-------: | :-------: | :-------: |
| contains issueDate | Valid | body = {issueDate: 'YYYY/MM/DD HH:MM', products: [...], supplierId: 1} -> response.status(201)| RestockOrder_service_mockDao/insertRO |
| does not contain issueDate | Invalid | body = {products: [...], supplierId: 1}} -> response.status(422)| RestockOrder_service_mockDao/insertRO |


### **Class Restock Order Service - method *updateStateRO***
**Criteria for method *updateStateRO*:**
 - id
  
**Predicates for method *updateStateRO*:**
| Criteria | Predicate |
| :--------: | --------- |
| id    | restock order with id exists  |
|       | restock order with id does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :-------: | :-------: | :-------: |
| restock order with id exists | Valid | id = 1 -> response.status(200) | RestockOrder_service_mockDao/updateROstate |
| restock order with id does not exist | Invalid | id = 999999 -> response.status(404)| RestockOrder_service_mockDao/updateROstate |


### **Class Restock Order Service - method *addSkuItems***
**Criteria for method *addSkuItems*:**
 - id
 - state
  
**Predicates for method *addSkuItems*:**
| Criteria | Predicate |
| :--------: | :--------- |
| id    | restock order with id exists  |
|       | restock order with id does not exist |
| state | == 'DELIVERED' |
|       | != 'DELIVERED' |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id | state | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :---: | :-------: | :-------: | :-------: |
| restock order with id exists | == 'DELIVERED' | Valid | id = 1 -> response.status(200) | RestockOrder_service_mockDao/updateROskuItems |
| restock order with id does not exist | == 'DELIVERED' |Invalid | id = 999999 -> response.status(404)| RestockOrder_service_mockDao/updateROskuItems |
| restock order with id exists | != 'DELIVERED' | Invalid | id = 1 -> response.status(422) | RestockOrder_service_mockDao/updateROskuItems |
| restock order with id does not exist | == 'DELIVERED' |Invalid | id = 999999 -> response.status(404)| RestockOrder_service_mockDao/updateROskuItems |


### **Class Restock Order Service - method *addTransportNote***
**Criteria for method *addTransportNote*:**
 - body
 - state
 - issueDate
  
**Predicates for method *addTransportNote*:**
| Criteria   | Predicate |
| :--------: | --------- |
| body       | body contains transportNote:{deliveryDate: 'YYYY/MM/DD'}  |
|            | body does not contain transportNote |
|            | body contains transportNote:{deliveryDate: 'not a date'} |
| id         | restock order with id exists  |
|            | restock order with id does not exist |
| state      | == 'DELIVERY' |
|            | != 'DELIVERY' |
| issueDate  | issueDate is before deliveryDate |
|            | issueDate is after deliveryDate |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| body | id | state | issueDate | Valid / Invalid | Description of the test case | Jest test case |
| :-----: | :---: | :---: | :----: | :-------: | :-------: | :-------: |
| body contains transportNote:{deliveryDate: 'YYYY/MM/DD'} | restock order with id exists | == 'DELIVERY' | issueDate is before deliveryDate | Valid | response.status(200) | RestockOrder_service_mockDao/updateROtransportNote |
| body does not contain transportNote | - | - | - | Invalid | response.status(422) | RestockOrder_service_mockDao/updateROtransportNote |
| body contains transportNote:{deliveryDate: 'not a date'} | - | - | - | Invalid | response.status(422) | RestockOrder_service_mockDao/updateROtransportNote |
| body contains transportNote:{deliveryDate: 'YYYY/MM/DD'} | restock order with id does not exist | - | - | Invalid | response.status(404) | RestockOrder_service_mockDao/updateROtransportNote |
| body contains transportNote:{deliveryDate: 'YYYY/MM/DD'} | restock order with id exists | != 'DELIVERY' | - | Invalid | response.status(422) | RestockOrder_service_mockDao/updateROtransportNote |
| body contains transportNote:{deliveryDate: 'YYYY/MM/DD'} | restock order with id exists | == 'DELIVERY' | issueDate is after deliveryDate | Invalid | response.status(422) | RestockOrder_service_mockDao/updateROtransportNote |



### **Class Test Descriptor Service - method *getTD***
**Criteria for method *getTD*:**
 - id
  
**Predicates for method *getTD*:**
| Criteria | Predicate |
| :--------: | --------- |
| id    | test descriptor with id exists  |
|       | test descriptor with id does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :------- :| :-------: | :-------: |
| test descriptor with id exists | Valid | id = 1 -> response.status(200) | TestDescriptor_service_mockDao/getTD |
| test descriptor with id does not exist | Invalid | id = 999999 -> response.status(404)| TestDescriptor_service_mockDao/getTD |


### **Class Test Descriptor Service - method *addTD***
**Criteria for method *addTD*:**
 - body
  
**Predicates for method *addTD*:**
| Criteria | Predicate |
| :--------: | --------- |
| body    | SKU with idSKU exists  |
|         | SKU with idSKU does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| body  | Valid / Invalid | Description of the test case | Jest test case |
| :--------------: | :------- :| :-------: | :-------: |
| SKU with idSKU exists | Valid | idSKU = 1 -> response.status(201) | TestDescriptor_service_mockDao/getTD |
| SKU with idSKU does not exist | Invalid | idSKU = 999999 -> response.status(404)| TestDescriptor_service_mockDao/getTD |


### **Class Test Descriptor Service - method *addTD***
**Criteria for method *addTD*:**
 - id
 - body
  
**Predicates for method *addTD*:**
| Criteria | Predicate |
| :--------: | --------- |
| id      | test descriptor with id exists |
|         | test descriptor with id does not exist |
| body    | SKU with idSKU exists  |
|         | SKU with idSKU does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id | body | Valid / Invalid | Description of the test case | Jest test case |
| :-----: | :---------: | :-------: | :-------: | :-------: |
| test descriptor with id exists | SKU with idSKU exists | Valid | id = 1, idSKU = 1 -> response.status(201) | TestDescriptor_service_mockDao/modifyTD |
| test descriptor with id does not exist | - | Invalid | id = 999999 -> response.status(404)| TestDescriptor_service_mockDao/modifyTD |
| test descriptor with id exists | SKU with idSKU does not exist | Invalid | id = 1, idSKU = 9999 -> response.status(201) | TestDescriptor_service_mockDao/modifyTD |


### **Class Test Descriptor Service - method *addTD***
**Criteria for method *addTD*:**
 - id
 - idSKU
  
**Predicates for method *addTD*:**
| Criteria | Predicate |
| :--------: | --------- |
| id      | test descriptor with id exists  |
|         | test descriptor with id does not exist |
| idSKU   | SKU with idSKU exists  |
|         | SKU with idSKU does not exist |

**Boundaries**:
| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |

**Combination of predicates**:
| id | idSKU |Valid / Invalid | Description of the test case | Jest test case |
| :------: | :--------: | :-------: | :-------: | :-------: |
| test descriptor with id exists | SKU with idSKU exists | Valid | id = 1, idSKU = 1 -> response.status(201) | TestDescriptor_service_mockDao/deleteTD |
| test descriptor with id does not exist | - | Invalid | id = 999999 -> response.status(422)| TestDescriptor_service_mockDao/deleteTD |
| test descriptor with id exists | SKU with idSKU exists | Invalid | id = 1, idSKU = 99999 -> response.status(422) | TestDescriptor_service_mockDao/deleteTD |


---
---
---
# White Box Unit Tests

### Test cases definition
    
    
    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>


| Unit name | Jest test case |
| :--- | :--- |
| TestDescriptor_service | TestDescriptor_service_mockdao |
| TestDescriptor_dao | TestDescriptor_daotest |
| RestockOrder_service | RestockOrder_service_mockdao |
| RestockOrder_dao | RestockOrder_daotest |
| InternalOrder_service | InternalOrder_service_mockdao |
| InternalOrder_dao | InternalOrder_daotest |
||||

### Code coverage report

    <Add here the screenshot report of the statement and branch coverage obtained using
    the coverage tool. >


### Loop coverage analysis

    <Identify significant loops in the units and reports the test cases
    developed to cover zero, one or multiple iterations >

|Unit name | Loop rows | Number of iterations | Jest test case |
|---|---|---|---|
|||||
|||||
||||||



# New Design Document
This file is only for listing the methods in services and daos.

## INDEX
[SKU](#sku)

[SKU Item](#sku-item)

[Position](#position)

[Test descriptor](#test-descriptor)

[Test result](#test-result)

[User](#user)

[Restock order](#restock-order)

[Return order](#return-order)

[Internal order](#internal-order)

[Item](#item)

---
## Internal Order
### Service
- getAllIO
- getAllIOIssued
- getAllIOAccepted
- getIO
- addIO
- updateStateIO
- deleteIO
### DAO
- getAllIO
- getProduct
- getAllIOIssued
- getAllIOAccepted
- getIO
- insertIO
- IOexists
- updateStateIO
- deleteIO

---
## Restock Order
### Service
- getAllRO
- getAllROIssued
- getRO
- getROReturnedItems
- addRO
- updateStateRO
- addSkuItems
- addTransportNote
- deleteRO
### DAO
- getAllRO
- getProduct
- getSKUItem
- getTransportNote
- getAllROIssued
- ROexists
- getRO
- getROReturnedItems
- insertRO
- updateStateRO
- addSkuItems
- insertTransportNote
- getTransportNoteID
- updateSKUNote
- deleteRO
---
## Test Descriptor
### Service
- getAllTD
- getTD
- addTD
- modifyTD
- deleteTD
### DAO
- getAllTD
- getTD
- insertTD
- getSKU
- updateTD
- updateSKUTestDescriptors
- deleteTD
#Requirements Document 

Date: 22 march 2022

Version: 0.0

 
| Version number | Change |
| ----------------- |:-----------|
| | | 


# Contents

- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
	+ [Context Diagram](#context-diagram)
	+ [Interfaces](#interfaces) 
	
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
	+ [Functional Requirements](#functional-requirements)
	+ [Non functional requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
	+ [Use case diagram](#use-case-diagram)
	+ [Use cases](#use-cases)
    	+ [Relevant scenarios](#relevant-scenarios)
- [Glossary](#glossary)
- [System design](#system-design)
- [Deployment diagram](#deployment-diagram)

# Informal description
Medium companies and retailers need a simple application to manage the relationship with suppliers and the inventory of physical items stocked in a physical warehouse. 
The warehouse is supervised by a manager, who supervises the availability of items. When a certain item is in short supply, the manager issues an order to a supplier. In general the same item can be purchased by many suppliers. The warehouse keeps a list of possible suppliers per item. 

After some time the items ordered to a supplier are received. The items must be quality checked and stored in specific positions in the warehouse. The quality check is performed by specific roles (quality office), who apply specific tests for item (different items are tested differently). Possibly the tests are not made at all, or made randomly on some of the items received. If an item does not pass a quality test it may be rejected and sent back to the supplier. 

Storage of items in the warehouse must take into account the availability of physical space in the warehouse. Further the position of items must be traced to guide later recollection of them.

The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via internal orders, received by the warehouse. Upon reception of an internal order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area. When the item is collected by the other OU the internal order is completed. 

EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.



# Stakeholders


| Stakeholder name  | Description | 
| ----------------- |:-----------|
| Supplier | Entity that provides items |
| Investors | Entities that finance the project|
| Government | Entity that make laws for privacy |
| Warehouse manager | Person responsible to check availability and issue new orders to suppliers|
| Shipment department | Entity that receives packages from suppliers, return defective items to suppliers and prepare items for the rest of the company |
| Inventory manager | Person who manages space in warehouse and records where items are stored |
| Administrator | Person who manages databases and network system |
| Quality office| Entity that checks if items received from suppliers are good enough |
| Cloud services | Entities where the software is deployed on for remote access |

# Context Diagram and interfaces

## Context Diagram
\<Define here Context diagram using UML use case diagram>

\<actors are a subset of stakeholders>

## Interfaces
\<describe here each interface in the context diagram>

\<GUIs will be described graphically in a separate document>

| Actor | Logical Interface | Physical Interface  |
| ------------- |:-------------:| -----:|
| Warehouse manager | GUI | Screen and keyboard or portable device, internet connection |
| Administrator | GUI | Screen and keyboard, internet connection |
| Inventory manager | GUI | Screen and keyboard, internet connection |
| Shipment department | GUI | Screen and keyboard, internet connection |
| Quality office | GUI | Screen and keyboard, internet connection |
| Cloud service | APIs | Internet connection |
| Supplier | email | Screen and keyboard, internet connection |

# Stories and personas
\<A Persona is a realistic impersonation of an actor. Define here a few personas and describe in plain text how a persona interacts with the system>

\<Persona is-an-instance-of actor>

\<stories will be formalized later as scenarios in use cases>

**Persona 1**: Stock manager,35 yo, female, first year of work as a manager.
<br>Story: The manager has to solve a problem with an order because she makes a mistake with a duplicated order issue for the same material

**Persona 2**: Responsible for the supplier of a company, male, 43.y.o. with 17 years of experience.
<br>Story: The responsible have an offer for the company and contact it to propose the offer and possibly sign a commercial agreement. 

**Persona 3**: New employee for the company, male 37y.o., 10 years of experience in another company.
<br>Story: The new employee just signed the contract and have to add his information on the app to became officially a new employee for the company.

**Persona 4**: Responsible for the orders, female 28 o.y. with 1 year of experience.
<br>Story: The company made a mistake for an order and the responsible have to modify the order with the add of new items. 

**Persona 5**: Shipping clerk, male 32y.o. with 2 year of experience.
<br>Story: The clerk have to signal that the shipment is on the pick-up area

**Persona 6**: Quality Office employee, male 35 y.o., 5 years of experience on this work.
<br>Story: The employee it's very skilled and recognize a very thin problem that can be compromise the possible use of the materials. He signal the problem and resend the order to the supplier.

# Functional and non functional requirements

## Functional Requirements

\<In the form DO SOMETHING, or VERB NOUN, describe high level capabilities of the system>

\<they match to high level use cases>

| ID        | Description  |
| ------------- |:-------------:| 
| FR1     | Check availability |
| FR1.1     | Issue order  |
| FR2  | Manage products |
| FR2.1 | Add product |
| FR2.2 | Delete product |
| FR2.3 | Search product |
| FR2.4 | Modify product description |
| FR2.5 | Add barcode |
| FR3 | Manage users |
| FR3.1 | Add user |
| FR3.2 | Modify user |
| FR3.3 | Delete user |
| FR4 | Manage inventory |
| FR4.1 | Modify quantity of product |
| FR4.2 | Modify position of product |
| FR4.3 | Check report of product |
| FR4.3 | List items |
| FR4.4 | List statuses of orders |
| FR5 | Manage orders |
| FR5.1 | COnfirm order |
| FR5.2 | Delete order |
| FR5.3 | Modify quantity of order |
| FR5.4 | Notify item is in pick-up area |
| FR5.5 | List orders |
| FR6 | Manage Shipments |
| FR6.1 | Add shipment |
| FR6.2 | Edit shipment |
| FR6.3 | Delete shipment |
| FR6.4 | List shipments |
| FR7 | Manage suppliers |
| FR7.1 | Add supplier |
| FR7.2 | Modify supplier information |
| FR7.3 | Delete supplier |
| FR7.4 | List suppliers |
| FR8 | Quality check |
| FR8.1 | Add report |
| FR8.2 | Modify report |
| FR8.3 | Delete report |
| FR8.4 | Add attachments |


## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID        | Type (efficiency, reliability, ..)           | Description  | Refers to |
| ------------- |:-------------:| :-----:| -----:|
|  NFR1     | Usability  | Any non-technical person should be able to use the system without training | All |
|  NFR2     | Performance | System should response quickly to actions: < 2 seconds | All |
|  NFR3     | Privacy | Management of data for employees, suppliers, products(orders and shipments) must be complient to state laws | All |
| NFR4 | Space | System can be employed on a server with at least 64 GB of RAM | All |
| NFR5 | Security | The system shoul not be hacked | All |
| NFR6 | Reliability | The system should have at least 99.9% uptime | All |
| NFR7 | Capacity | The system should be used by up to 150 simultaneous users | All |
| NFR8 | Space | The system database should have at least 2 TB of storage | All |
| NFR9 | Reliability | The system should check data integrity and do a backup every 30 minutes. System can recover from these backups in case of failures | All | 


# Use case diagram and use cases


## Use case diagram
\<define here UML Use case diagram UCD summarizing all use cases, and their relationships>


\<next describe here each use case in the UCD>
### Use case 1, UC1
| Actors Involved        |  |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after UC is finished> |
|  Nominal Scenario     | \<Textual description of actions executed by the UC> |
|  Variants     | \<other normal executions> |
|  Exceptions     | \<exceptions, errors > |

##### Scenario 1.1 

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1 | |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the scenario can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after scenario is finished> |
| Step#        | Description  |
|  1     |  |  
|  2     |  |
|  ...     |  |

##### Scenario 1.2

##### Scenario 1.x

### Use case 2, UC2
..

### Use case x, UCx
..



# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships> 

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

# System Design
\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram 

\<describe here deployment diagram >

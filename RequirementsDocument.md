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
|  FR1     |  |
|  FR2     |   |
| FRx..  | | 

## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID        | Type (efficiency, reliability, ..)           | Description  | Refers to |
| ------------- |:-------------:| :-----:| -----:|
|  NFR1     |   |  | |
|  NFR2     | |  | |
|  NFR3     | | | |
| NFRx .. | | | | 


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





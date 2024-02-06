# CarCar

The project is CarCar, an application for managing aspects of an automobile dealership — specifically its inventory, sales and service center.

Team:

- **John Lukich** - Sales and inventory microservice
- **Shaoda Liu** - Service microservice

## Getting Started

<ins>**Make sure you have Docker, Git, and Node.js 20.11 or above**</ins>

1. Fork this repository

2. Clone the forked repository onto your local computer.

3. Build and run the project using Docker with these commands:

```
docker volume create beta-data
docker-compose build
docker-compose up
```

- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/images/localhost.png)

## Design

CarCar is an application made up of 3 individual microservices serving differnet functionalities.

- **Inventory**
- **Sales**
- **Service**

![Img](/images/project-beta-diagram.png)

## Integration

Our Sales and Service domains work individually but they both rely on the APIs provided by the inventory domain to poll the necessary data and make their functionality possible.

## How this starts?

Inventory is the cornerstone. It keeps a automobile table in the database which holding records of vehicles on our lot.

Sales and Service microservices have a **poller** to keep track of the records of the automobile from the Inventory and make them always up-to-date.

# Inventory Microservice

## Sending the Requests to Access the Endpoints and View Data:

### Manufacturer Model:

| Action                         | Method | URL                                          | URL for Containers in Docker Network                            |
| ------------------------------ | ------ | -------------------------------------------- | --------------------------------------------------------------- |
| List manufacturers             | GET    | http://localhost:8100/api/manufacturers/     | http://project-beta-inventory-api-1:8100/api/manufacturers/     |
| Create a manufacturer          | POST   | http://localhost:8100/api/manufacturers/     | http://project-beta-inventory-api-1:8100/api/manufacturers/     |
| Get a specific manufacturer    | GET    | http://localhost:8100/api/manufacturers/:id/ | http://project-beta-inventory-api-1:8100/api/manufacturers/:id/ |
| Update a specific manufacturer | PUT    | http://localhost:8100/api/manufacturers/:id/ | http://project-beta-inventory-api-1:8100/api/manufacturers/:id/ |
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/ | http://project-beta-inventory-api-1:8100/api/manufacturers/:id/ |

**<ins>Creating and updating a manufacturer requires only the manufacturer's name.</ins>** <br />

```
{
  "name": "Chrysler"
}
```

**<ins>The return value of creating, getting, and updating a single manufacturer is its name, href, and id.</ins>** <br />

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

**<ins>The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.</ins>** <br />

```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

**<ins>The return value of deleting a single manufacturer is a null id, and its name only</ins>** <br />

```
{
  "id": null,
  "name": "Chrysler"
}
```

### Vehicle Model:

| Action                          | Method | URL                                   | URL for Containers in Docker Network                     |
| ------------------------------- | ------ | ------------------------------------- | -------------------------------------------------------- |
| List vehicle models             | GET    | http://localhost:8100/api/models/     | http://project-beta-inventory-api-1:8100/api/models/     |
| Create a vehicle model          | POST   | http://localhost:8100/api/models/     | http://project-beta-inventory-api-1:8100/api/models/     |
| Get a specific vehicle model    | GET    | http://localhost:8100/api/models/:id/ | http://project-beta-inventory-api-1:8100/api/models/:id/ |
| Update a specific vehicle model | PUT    | http://localhost:8100/api/models/:id/ | http://project-beta-inventory-api-1:8100/api/models/:id/ |
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/:id/ | http://project-beta-inventory-api-1:8100/api/models/:id/ |

**<ins>Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.</ins>** <br />

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

**<ins>Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.</ins>** <br />

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

**<ins>Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.</ins>** <br />

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

**<ins>Getting a list of vehicle models returns a list of the detail information with the key "models".</ins>** <br />

```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

**<ins>Deleting a single vehicle model returns the detail information with a null id** <br />

```
{
	"id": null,
	"name": "M3",
	"picture_url": "https://hips.hearstapps.com/hmg-prod/images/2024-bmw-m3-110-1674509061.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "BMW"
	}
}
```

### Automobile Model:

| Action                       | Method | URL                                         | URL for Containers in Docker Network                           |
| ---------------------------- | ------ | ------------------------------------------- | -------------------------------------------------------------- |
| List automobiles             | GET    | http://localhost:8100/api/automobiles/      | http://project-beta-inventory-api-1:8100/api/automobiles/      |
| Create an automobile         | POST   | http://localhost:8100/api/automobiles/      | http://project-beta-inventory-api-1:8100/api/automobiles/      |
| Get a specific automobile    | GET    | http://localhost:8100/api/automobiles/:vin/ | http://project-beta-inventory-api-1:8100/api/automobiles/:vin/ |
| Update a specific automobile | PUT    | http://localhost:8100/api/automobiles/:vin/ | http://project-beta-inventory-api-1:8100/api/automobiles/:vin/ |
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/:vin/ | http://project-beta-inventory-api-1:8100/api/automobiles/:vin/ |

**Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.**

**<ins>Creating an automobile with its color, year, VIN, and the id of the vehicle model.</ins>** <br />

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

**<ins>Updating an automobile with its color, year, and sold status.</ins>** <br />

```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```

**<ins>The return value of creating, getting, and updating a single automobile.</ins>** <br />

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```

**<ins>The list of automobiles is a dictionary with the key "autos" set to a list of automobiles.</ins>** <br />

```
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120174/",
			"id": 1,
			"color": "red",
			"year": 2012,
			"vin": "1C3CC5FB2AN120174",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "M3",
				"picture_url": "https://hips.hearstapps.com/hmg-prod/images/2024-bmw-m3-110-1674509061.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "BMW"
				}
			},
			"sold": false
		}
  ]
}
```

**<ins>Deleting a single automobile model returns the detail information with a null id.</ins>** <br />

```
{
	"href": "/api/automobiles/1C3CC5FB2AN120175/",
	"id": null,
	"color": "blue",
	"year": 2023,
	"vin": "1C3CC5FB2AN120175",
	"model": {
		"href": "/api/models/2/",
		"id": 2,
		"name": "M3",
		"picture_url": "https://hips.hearstapps.com/hmg-prod/images/2024-bmw-m3-110-1674509061.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "BMW"
		}
	},
	"sold": false
}
```

# Sales Microservice

This microservice allows users to see, create, and delete the Salespeople, Customers and Sales

On the backend, there are 4 models: AutomobileVO, Salesperson, Customer and Sale.

**Salesperson** is the model that stores the salepeople's first and last names with the employee ids.

**Customer** is the model that stores the customers' first and last names, addresses, and their phone numbers.

**Sale** is the model that stores the records of saleperson, customer, and automobile as foreign keys along with the price of sales.

**AutomobileVO** is a value object that stores the data about the vehicles. The poller automotically polls the Automobile database in Inventory service for data, so the Sales microservice is constantly getting the updated data of automobiles.

## Sending the Requests to Access the Endpoints and View Data:

### Salesperson Model:

| Action                               | Method | URL                                       |
| ------------------------------------ | ------ | ----------------------------------------- |
| Gets a list of all of the salepeople | GET    | http://localhost:8090/api/salespeople/    |
| Creates a salesperson                | POST   | http://localhost:8090/api/salespeople/    |
| Deletes a single salesperson         | DELETE | http://localhost:8090/api/salespeople/id/ |

**<ins>Creating a salesperson with its first name and last name.  The employee ID is automatically generated</ins>** <br />

```
{
  "first_name": "first",
  "last_name": "last",
}
```

**<ins>The return value of creating is its first, last name, employee id and id** <br />

```
{
	"first_name": "first",
	"last_name": "last",
	"employee_id": "flast",
	"id": 1
}
```

**<ins>The return value of listing salespeople.</ins>** <br />

```
[
	{
		"first_name": "first",
		"last_name": "last",
		"employee_id": "flast",
		"id": 1
	}
]
```

**<ins>The return value of deleting a single salesperson.</ins>** <br />

```
{
	"deleted": true
}
```

### Customer Model:

| Action                              | Method | URL                                     |
| ----------------------------------- | ------ | --------------------------------------- |
| Gets a list of all of the Customers | GET    | http://localhost:8090/api/customers/    |
| Creates a customer                  | POST   | http://localhost:8090/api/customers/    |
| Deletes a single customer           | DELETE | http://localhost:8090/api/customers/id/ |

**<ins>Creating a customer with its first, last name, address and phone number.</ins>** <br />

```
{
  "first_name": "first",
  "last_name": "last",
  "address": "addr",
  "phone_number": "1112223333"
}
```

**<ins>The return value of creating is its first, last name, address, phone number and id** <br />

```
{
	"first_name": "first",
	"last_name": "last",
	"address": "addr",
	"phone_number": "1112223333",
	"id": 1
}
```

**<ins>The return value of listing customers.</ins>** <br />

```
[
	{
		"first_name": "first",
		"last_name": "last",
		"address": "addr",
		"phone_number": "1112223333",
		"id": 1
	}
]
```

**<ins>The return value of deleting a single customer.</ins>** <br />

```
{
	"deleted": true
}
```

### Sale Model:

| Action                          | Method | URL                                 |
| ------------------------------- | ------ | ----------------------------------- |
| Gets a list of all of the sales | GET    | http://localhost:8090/api/sales/    |
| Creates a sale                  | POST   | http://localhost:8090/api/sales/    |
| Deletes a single sale           | DELETE | http://localhost:8090/api/sales/id/ |

**<ins>Creating a sales with the id of automobile, the id of salesperson, the id of customer, and price.</ins>** <br />

```
{
  "vin": "1C3CC5FB2AN120174",
  "salesperson_id": 1,
  "customer_id": 1,
  "price": 50000
}
```

**<ins>The return value of creating is its id, automobile object, saleperson object, customer object and the price.** <br />

```
{
	"automobile": {
		"vin": "1C3CC5FB2AN120175",
		"sold": false
	},
	"salesperson": {
		"first_name": "first",
		"last_name": "last",
		"employee_id": 1001,
		"id": 1
	},
	"customer": {
		"first_name": "first",
		"last_name": "last",
		"address": "addr",
		"phone_number": "1112223333",
		"id": 1
	},
	"price": 50000,
	"id": 1
}
```

**<ins>The return value of listing sales.</ins>** <br />

```
[
	{
    "automobile": {
        "vin": "1C3CC5FB2AN120175",
        "sold": false
    },
    "salesperson": {
        "first_name": "first",
        "last_name": "last",
        "employee_id": 1001,
        "id": 1
    },
    "customer": {
        "first_name": "first",
        "last_name": "last",
        "address": "addr",
        "phone_number": "1112223333",
        "id": 1
    },
    "price": 50000,
    "id": 1
    }
]
```

**<ins>The return value of deleting a single customer.</ins>** <br />

```
{
	"deleted": true
}
```

# Service microservice

This microservice allows users to see, create, and delete the Technician, and Appointment.

On the backend, there are 3 models: AutomobileVO, Technician, and Appointment.

**Technician** is the model that stores the technicians' first and last names with the employee ids.

**Appointment** is the model that stores the appointments' dateTime, reason, status, vin, customer name, and technician foreign key.

**AutomobileVO** is a value object that stores the data about the vehicles. The poller automotically polls the Automobile database in Inventory service for data, so the Sales microservice is constantly getting the updated data of automobiles.

## Sending the Requests to Access the Endpoints and View Data:

### Technician Model:

| Action                               | Method | URL                                       |
| ------------------------------------ | ------ | ----------------------------------------- |
| Gets a list of all of the technician | GET    | http://localhost:8090/api/technicians/    |
| Creates a technician                 | POST   | http://localhost:8090/api/technicians/    |
| Deletes a single technician          | DELETE | http://localhost:8090/api/technicians/id/ |

**<ins>Creating a technician with its first, last name and employee id.</ins>** <br />

```
{
	"first_name": "first",
	"last_name": "last",
	"employee_id": "1001"
}
```

**<ins>The return value of creating is its id, first, last name, employee id and full name** <br />

```
{
	"id": 1,
	"first_name": "first",
	"last_name": "last",
	"employee_id": "1001",
	"full_name": "first last"
}
```

**<ins>The return value of listing technicians.</ins>** <br />

```
[
	{
		"id": 1,
		"first_name": "first",
		"last_name": "last",
		"employee_id": "1001",
		"full_name": "first last"
	},
]
```

**<ins>The return value of deleting a single salesperson.</ins>** <br />

```
{
	"deleted": true
}
```

### Appointment Model:

| Action                                 | Method | URL                                       |
| -------------------------------------- | ------ | ----------------------------------------- |
| Gets a list of all of the appointments | GET    | http://localhost:8090/api/technicians/    |
| Creates an appointment                 | POST   | http://localhost:8090/api/technicians/    |
| Deletes a single appointment           | DELETE | http://localhost:8090/api/technicians/id/ |

**<ins>Creating a appointment with its date_time, reason, vin, customer, and technician id.</ins>** <br />
**Note: the status of an new appointment will be set to "secheduled" automatically.**

```
{
	"date_time": "2024-03-10T15:30",
	"reason": "Oil Change",
	"vin": "1C3CC5FB2AN120175"
	"customer": "customer name"
	"technician": 1
}
```

**<ins>The return value of creating is its id, date_time, reason, status, vin, customer, and the technician's details as below** <br />

```
{
	"id": 3,
	"date_time": "2024-03-10T15:35:00Z",
	"reason": "Oil Change",
	"status": "scheduled",
	"vin": "1C3CC5FB2AN120174",
	"customer": "customer name",
	"technician": {
		"id": 1,
		"first_name": "first",
		"last_name": "last",
		"employee_id": "10001",
		"full_name": "first last"
	}
}
```

**<ins>The return value of listing appointments.</ins>** <br />

```
[
	{
    "id": 3,
    "date_time": "2024-03-10T15:35:00Z",
    "reason": "Oil Change",
    "status": "scheduled",
    "vin": "1C3CC5FB2AN120174",
    "customer": "customer name",
    "technician": {
        "id": 1,
        "first_name": "first",
        "last_name": "last",
        "employee_id": "10001",
        "full_name": "first last"
    }
  }
]
```

**<ins>The return value of deleting a single appointment.</ins>** <br />

```
{
	"deleted": true
}
```

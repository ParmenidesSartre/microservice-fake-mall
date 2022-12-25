# Microservice Fake Mall
## Overview:
The fictional e-commerce application will be an online platform for customers to browse, purchase, and review products. The application will have a variety of microservices handling different functionality, including a product catalog, shopping cart, order management, and customer reviews. The application will also utilize an API gateway to handle requests and route them to the appropriate microservice.

## Components:

API Gateway: 
- The API gateway will be responsible for handling incoming requests from customers and routing them to the appropriate microservice. It will also handle authentication and authorization for the microservices. Technology Used: Node.js with Express for the microservice framework.

User Management Microservice: 
- The user service will handle all user management functionality, including creating new users, authenticating users, and managing user roles and permissions. Technology Used: Node.js with Express for the microservice framework and MongoDB as database.

Product Catalog Microservice:
- This microservice will be responsible for managing the product catalog and providing information about products to customers. It will handle tasks such as adding new products, updating existing products, and retrieving product information for customers. Technology Used: Node.js with Express for the microservice framework and MongoDB as database.

Shopping Cart Microservice: 
- This microservice will be responsible for managing customer shopping carts and allowing customers to add and remove items from their cart. It will also handle tasks such as calculating the total cost of items in the cart and applying any discounts or promotions. Technology Used: Node.js with Express for the microservice framework.

Order Management Microservice: 
- This microservice will be responsible for managing orders placed by customers. It will handle tasks such as creating new orders, updating the status of orders, and retrieving order information for customers. Technology Suggestion: Python with FastAPI for the microservice framework.

Customer Reviews Microservice: 
- This microservice will be responsible for managing customer reviews for products. It will handle tasks such as allowing customers to submit reviews, approving or rejecting reviews, and displaying approved reviews to other customers. Technology Suggestion: PHP with Laravel for the microservice framework.

## Architecture:

"The microservices in this system are designed with modularity, single responsibility, and resilience in mind," as emphasized in Sam Newman's book "Building Microservices." Each microservice is focused on a specific set of tasks and communicates with the other microservices through the message broker, allowing for asynchronous communication and improved performance and scalability, as discussed in Ben Stopford's book "Designing Event-Driven Systems." The use of a circuit breaker pattern in the API gateway helps to prevent cascading failures across the system, further contributing to the resilience of the system. The decoupled nature of the microservices, combined with the use of an API gateway, also enables continuous delivery and deployment, allowing for faster delivery of new features and improvements to customers while minimizing the risk of introducing bugs or breaking changes. Overall, the architecture of this system is designed to be scalable, resilient, and agile.


## Development Process:

The development process for this project followed an agile approach, with frequent iterations and feedback from stakeholders. One of the main challenges was implementing the communication between the microservices in a way that was efficient and reliable. To address this challenge, we utilized a message broker and implemented a publish-subscribe pattern for communication between the microservices. This allowed us to decouple the microservices and improve the overall performance and scalability of the system. Another challenge was managing the complexity of the system as it grew in size and functionality. To address this, we made use of design patterns such as the circuit breaker pattern and the command-query responsibility segregation (CQRS) pattern to break down the monolithic architecture and improve the modularity and maintainability of the system.

Relational databases are typically ACID compliant, which makes them well-suited for use in applications where data integrity and reliability are important, such as order management systems. In contrast, NoSQL databases like MongoDB often have weaker consistency guarantees and may not be fully ACID compliant. Given the requirements of the order management service, which involves processing transactions that make updates to the database, it is important that the database used is ACID compliant to ensure the reliability and integrity of the data. Using a relational database like MySQL, which is typically ACID compliant, can help to ensure that the order management service is able to process transactions reliably and maintain the integrity of the data it store
 
## List of Routes
### API Gateway Routes:
- GET /user: routes to the User Management Microservice to register, login, and logout users
- GET /products: routes to the Product Catalog Microservice to retrieve and display product information
- GET /cart: routes to the Shopping Cart Microservice to add or remove items from a customer's cart
- GET /orders: routes to the Order Management Microservice to place or view orders
- GET /reviews: routes to the Customer Reviews Microservice to submit or view product reviews

### User Management Microservice Routes:
- GET /: retrieves and displays a list of all users ( DONE )
- POST /register: allows a user to create a new account ( DONE )
- POST /login: allows a user to login to their account ( DONE )
- POST /logout: allows a user to logout of their account ( DONE )
- GET /profile: retrieves and displays a user's profile information ( DONE )
- PUT /profile: allows a user to update their profile information ( DONE )
- PUT /password: allows a user to reset their password ( DONE )

### Product Catalog Microservice Routes:
- GET /products: retrieves and displays a list of all products
- GET /products/{id}: retrieves and displays information for a specific product
- POST /products/create: creates a new product in the catalog
- PUT /products/update/{id}: updates an existing product in the catalog
- GET /products/search?query={query}: searches the product catalog for products matching the specified query, and returns a list of matching products
- GET /products/categories: retrieves a list of all available product categories
- GET /products/categories/{id}: retrieves and displays information for a specific product category
- POST /products/categories: creates a new product category

### Shopping Cart Microservice Routes:
- /cart: retrieves and displays the contents of a customer's cart
- /cart/add/{product_id}: adds an item to a customer's cart
- /cart/remove/{product_id}: removes an item from a customer's cart
- /cart/total: calculates the total cost of items in a customer's cart

### Order Management Microservice Routes:
- /orders: retrieves and displays a list of a customer's orders
- /orders/{id}: retrieves and displays information for a specific order
- /orders/create: creates a new order for a customer
- /orders/update/{id}: updates the status of an existing order

### Customer Reviews Microservice Routes:
- /reviews: retrieves and displays a list of all product reviews
- /reviews/product/{product_id}: retrieves and displays all reviews for a specific product
- /reviews/submit: allows a customer to submit a review for a product
- /reviews/approve/{review_id}: approves a review for display to other customers
- /reviews/reject/{review_id}: rejects a review and removes it from the list of displayed reviews

## List of schema

### User Schema
```
User {
  id: ObjectId,
  username: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  roles: [String]
}
```

### Product Schema
```
Product {
  id: ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String,
  categories: [String],
  quantity: Number
}
```

### Cart Schema
```
Cart {
  id: ObjectId,
  customer_id: ObjectId,
  items: [
    {
      product_id: ObjectId,
      quantity: Number
    }
  ]
}
```

### Order Schema

```
Order {
  id: ObjectId,
  customer_id: ObjectId,
  items: [
    {
      product_id: ObjectId,
      quantity: Number
    }
  ],
  total_cost: Number,
  status: String (pending, shipped, delivered, cancelled)
}
```

### Review Schema 
```
Review {
  id: ObjectId,
  customer_id: ObjectId,
  product_id: ObjectId,
  rating: Number,
  title: String,
  review: String,
  status: String (pending, approved, rejected)
}
```

## Interactions Between Microservices:

User Management Microservice:
- The user service will provide authentication tokens to the API gateway, which will be used to validate requests from users.
- The user service will retrieve and update user information from the database as needed.

Product Catalog Microservice and Shopping Cart Microservice: 
- The Shopping Cart Microservice will retrieve product information from the Product Catalog Microservice when a customer adds an item to their cart.

Shopping Cart Microservice and Order Management Microservice: 
- When a customer places an order, the Order Management Microservice will retrieve the items and their associated quantities from the Shopping Cart Microservice.

Order Management Microservice and Product Catalog Microservice: 
- The Order Management Microservice will retrieve product information from the Product Catalog Microservice when a customer places an order in order to confirm that the items are in stock and to calculate the total cost of the order.

Customer Reviews Microservice and Product Catalog Microservice: 
- The Customer Reviews Microservice will retrieve product information from the Product Catalog Microservice in order to associate reviews with the correct product.


API Gateway and all Microservices: 
- The API Gateway will handle all incoming requests from customers and route them to the appropriate microservice based on the request type. For example, a request to view a product would be routed to the Product Catalog Microservice, while a request to place an order would be routed to the Order Management Microservice.

## Additional Components:

Database: 
- The application will utilize a database to store data for the various microservices. Technology Suggestion: MongoDB for its flexible document-based structure and ability to scale horizontally.

Load Balancer: 
- In order to handle high traffic and ensure the availability of the application, a load balancer will be used to distribute incoming requests across multiple instances of each microservice. Technology Suggestion: HAProxy for its high performance and ability to handle a large number of requests.

Monitoring and Logging: 
- In order to track the performance of the application and identify any potential issues, monitoring and logging tools will be implemented. Technology Suggestion: Prometheus for monitoring and ELK stack (Elasticsearch, Logstash, Kibana) for logging.

Continuous Integration and Deployment: 
- In order to streamline the development process and ensure that changes are quickly deployed to production, the application will utilize a continuous integration and deployment tool. Technology Suggestion: Jenkins for its wide range of plugins and ability to integrate with a variety of tools.

Conclusion:
Overall, the fictional e-commerce application will utilize a variety of microservices and technologies in order to provide a seamless and efficient experience for customers. The use of an API gateway and load balancer will ensure high availability and performance, while monitoring and logging tools will allow for easy identification and resolution of any issues that may arise. With the use of continuous integration and deployment, the application will be able to quickly and consistently deploy updates and new features.







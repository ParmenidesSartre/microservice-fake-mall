# Microservice Fake Mall
## Overview:
The fictional e-commerce application will be an online platform for customers to browse, purchase, and review products. The application will have a variety of microservices handling different functionality, including a product catalog, shopping cart, order management, and customer reviews. The application will also utilize an API gateway to handle requests and route them to the appropriate microservice.

## Components:

API Gateway: 
- The API gateway will be responsible for handling incoming requests from customers and routing them to the appropriate microservice. It will also handle authentication and authorization for the microservices. Technology Suggestion: Kong (open source API gateway built on top of NGINX).

User Management Microservice: 
- The user service will handle all user management functionality, including creating new users, authenticating users, and managing user roles and permissions. Technology Suggestion: Java with Spring Boot for the microservice framework.

Product Catalog Microservice:
- This microservice will be responsible for managing the product catalog and providing information about products to customers. It will handle tasks such as adding new products, updating existing products, and retrieving product information for customers. Technology Suggestion: Java with Spring Boot for the microservice framework.

Shopping Cart Microservice: 
- This microservice will be responsible for managing customer shopping carts and allowing customers to add and remove items from their cart. It will also handle tasks such as calculating the total cost of items in the cart and applying any discounts or promotions. Technology Suggestion: Node.js with Express for the microservice framework.

Order Management Microservice: 
- This microservice will be responsible for managing orders placed by customers. It will handle tasks such as creating new orders, updating the status of orders, and retrieving order information for customers. Technology Suggestion: Python with Flask for the microservice framework.

Customer Reviews Microservice: 
- This microservice will be responsible for managing customer reviews for products. It will handle tasks such as allowing customers to submit reviews, approving or rejecting reviews, and displaying approved reviews to other customers. Technology Suggestion: Ruby with Sinatra for the microservice framework.

## List of Routes
### API Gateway Routes:
- /products: routes to the Product Catalog Microservice to retrieve and display product information
- /cart: routes to the Shopping Cart Microservice to add or remove items from a customer's cart
- /orders: routes to the Order Management Microservice to place or view orders
- /reviews: routes to the Customer Reviews Microservice to submit or view product reviews

### User Management Microservice Routes:
- /register: allows a user to create a new account
- /login: allows a user to login to their account
- /logout: allows a user to logout of their account
- /profile: retrieves and displays a user's profile information
- /profile: allows a user to update their profile information
- /password/reset: allows a user to reset their password
- /roles/{username}: retrieves and displays a user's roles and permissions

### Product Catalog Microservice Routes:
- /products: retrieves and displays a list of all products
- /products/{id}: retrieves and displays information for a specific product
- /products/create: creates a new product in the catalog
- /products/update/{id}: updates an existing product in the catalog

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
The "users" collection in the MongoDB database has the following fields and validation rules:
```
- **username** (required, unique, string): the username of the user. The value of this field is trimmed and lowercased before being stored in the database.
- **name** (string): the name of the user. The value of this field is lowercased before being stored in the database.
- **address** (string): the address of the user.
- **defaultAddress** (string): the default address of the user.
- **password** (required, string): the password of the user.

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







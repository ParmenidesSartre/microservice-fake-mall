const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const logger = require('./config/logger');
const CircuitBreaker = require('opossum');

const app = express();
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Circuit breaker options
const options = {
  timeout: 3000, // Timeout for request in ms
  errorThreshold: 50, // Number of failures before circuit is tripped
  resetTimeout: 30000, // Time in ms before circuit is closed and can be retried
};

// Use the '/user' route to proxy requests to the user service
app.use('/user', (req, res) => {
  // Configure the request to the user service
  const config = {
    method: `${req.method}`, // HTTP request method
    url: `http://localhost:3000${req.url}`, // URL for the request
    data: req.body, // Request body data
    headers: req.headers.authorization
      ? { authorization: req.headers.authorization }
      : {},
  };

  // Create a new circuit breaker for the request to the user service
  const breaker = new CircuitBreaker(
    // Make the request to the user service
    axios(config)
      .then((response) => {
        // Send the response from the user service
        res.status(response.status).send(response.data);
      })
      .catch((error) => {
        // Send an error message if the request to the user service fails
        res.status(error.response.status).send(error.response.data);
      }),
    options
  );

  // Fire the request to the user service through the circuit breaker
  breaker.fire().catch(() => {
    // Send an error message if the request to the user service fails
    res.status(500).send('User service fail to respond.');
  });
});


// Use the '/product' route to proxy requests to the user service
app.use('/product', (req, res) => {
  // Configure the request to the user service
  const config = {
    method: `${req.method}`, // HTTP request method
    url: `http://localhost:3001${req.url}`, // URL for the request
    data: req.body, // Request body data
    headers: req.headers.authorization
      ? { authorization: req.headers.authorization }
      : {},
  };

  // Create a new circuit breaker for the request to the user service
  const breaker = new CircuitBreaker(
    // Make the request to the user service
    axios(config)
      .then((response) => {
        // Send the response from the user service
        res.status(response.status).send(response.data);
      })
      .catch((error) => {
        // Send an error message if the request to the user service fails
        res.status(error.response.status).send(error.response.data);
      }),
    options
  );

  // Fire the request to the user service through the circuit breaker
  breaker.fire().catch(() => {
    // Send an error message if the request to the user service fails
    res.status(500).send('Product service fail to respond.');
  });
});
// Start the API gateway on port 3003
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`API gateway listening on port ${PORT}`);
});

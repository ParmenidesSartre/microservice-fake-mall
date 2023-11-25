const express = require('express');
const bodyParser = require('body-parser');
const cartRoutes = require('./route/cart.routes');
const connectDB = require('./config/mongoose');
const dotenv = require('dotenv');
const logger = require('./config/logger');

// Database
dotenv.config({ path: './src/config.env' });

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', cartRoutes);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connectDB(process.env.DATABASE_URI);
});
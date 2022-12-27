const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async (MONGO_URI) => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.info(err);
    process.exit(1);
  }
};
 
module.exports = connectDB;

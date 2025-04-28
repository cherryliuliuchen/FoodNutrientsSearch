const mongoose = require('mongoose');
const logger = require('../logs/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://cherryliuliuchen:chen12345678@foodcluster.hwhxn.mongodb.net/Foodcluster?retryWrites=true&w=majority');
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

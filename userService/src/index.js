const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./route/user.routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const connectDB = require("./config/mongoose");
const dotenv = require("dotenv");

// Database
dotenv.config({ path: "./src/config.env" });

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRoutes);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB(process.env.DATABASE_URI);
});
